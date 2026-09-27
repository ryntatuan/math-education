// Đo chiều dài đồ vật trong ảnh scan SGK.
// Tỉ lệ px/cm đã HIỆU CHỈNH bằng 6 số của người dùng ở tr.38 (khớp trong sai số 0,7%):
//   tàu 11 · xe trộn xi măng 5 · xe lu 4 · xe khách 7 · ô tô con 4 · xe cẩu 5  =>  129,7 px/cm
// Dùng: node scratch/do-dai-vat-anh.mjs <ảnh.png> [--pxcm 129.7] [--top 0] [--bot 3200] [--min 0.0002]
import fs from "node:fs";
import zlib from "node:zlib";

function decodePng(path) {
  const buf = fs.readFileSync(path);
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("Không phải PNG");
  let pos = 8,
    w = 0,
    h = 0,
    bitDepth = 0,
    colorType = 0,
    interlace = 0;
  const idat = [];
  let palette = null;
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      w = data.readUInt32BE(0);
      h = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === "IDAT") idat.push(data);
    else if (type === "PLTE") palette = data;
    else if (type === "IEND") break;
    pos += 12 + len;
  }
  if (bitDepth !== 8 || interlace !== 0)
    throw new Error("Chỉ hỗ trợ PNG 8-bit không interlace");
  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colorType];
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = channels,
    stride = w * bpp;
  const out = Buffer.alloc(h * stride);
  let rp = 0;
  for (let y = 0; y < h; y++) {
    const filter = raw[rp++];
    const line = raw.subarray(rp, rp + stride);
    rp += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= bpp ? prev[x - bpp] : 0;
      let v = line[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c,
          pa = Math.abs(p - a),
          pb = Math.abs(p - b),
          pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[x] = v & 0xff;
    }
  }
  const rgb = new Uint8Array(w * h * 3);
  if (colorType === 2) rgb.set(out.subarray(0, w * h * 3));
  else if (colorType === 6)
    for (let i = 0, j = 0; i < w * h; i++, j += 4) {
      rgb[i * 3] = out[j];
      rgb[i * 3 + 1] = out[j + 1];
      rgb[i * 3 + 2] = out[j + 2];
    }
  else if (colorType === 0)
    for (let i = 0; i < w * h; i++) {
      rgb[i * 3] = rgb[i * 3 + 1] = rgb[i * 3 + 2] = out[i];
    }
  else if (colorType === 4)
    for (let i = 0, j = 0; i < w * h; i++, j += 2) {
      rgb[i * 3] = rgb[i * 3 + 1] = rgb[i * 3 + 2] = out[j];
    }
  else if (colorType === 3)
    for (let i = 0; i < w * h; i++) {
      const p = out[i] * 3;
      rgb[i * 3] = palette[p];
      rgb[i * 3 + 1] = palette[p + 1];
      rgb[i * 3 + 2] = palette[p + 2];
    }
  return { w, h, rgb, colorType };
}

function makeMask(img, satMin = 55, lumaMax = 165) {
  const { w, h, rgb } = img;
  const m = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const r = rgb[i * 3],
      g = rgb[i * 3 + 1],
      b = rgb[i * 3 + 2];
    const mx = Math.max(r, g, b),
      mn = Math.min(r, g, b);
    const luma = (r * 299 + g * 587 + b * 114) / 1000;
    if (mx - mn > satMin || luma < lumaMax) m[i] = 1;
  }
  return m;
}

function findComps(img, mask, top, bot, minArea, edgePad = 12) {
  const { w, h } = img;
  const seen = new Uint8Array(w * h);
  const stack = new Int32Array(w * h);
  const comps = [];
  for (let y = top; y < Math.min(bot, h); y++) {
    for (let x = edgePad; x < w - edgePad; x++) {
      const i = y * w + x;
      if (!mask[i] || seen[i]) continue;
      let sp = 0;
      stack[sp++] = i;
      seen[i] = 1;
      let minX = x,
        maxX = x,
        minY = y,
        maxY = y,
        area = 0;
      while (sp > 0) {
        const p = stack[--sp];
        const py = (p / w) | 0,
          px = p - py * w;
        area++;
        if (px < minX) minX = px;
        if (px > maxX) maxX = px;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
        if (px > 0 && mask[p - 1] && !seen[p - 1]) {
          seen[p - 1] = 1;
          stack[sp++] = p - 1;
        }
        if (px < w - 1 && mask[p + 1] && !seen[p + 1]) {
          seen[p + 1] = 1;
          stack[sp++] = p + 1;
        }
        if (py > 0 && mask[p - w] && !seen[p - w]) {
          seen[p - w] = 1;
          stack[sp++] = p - w;
        }
        if (py < h - 1 && mask[p + w] && !seen[p + w]) {
          seen[p + w] = 1;
          stack[sp++] = p + w;
        }
      }
      comps.push({
        minX,
        maxX,
        minY,
        maxY,
        area,
        bw: maxX - minX + 1,
        bh: maxY - minY + 1,
        cx: (minX + maxX) / 2,
        cy: (minY + maxY) / 2,
      });
    }
  }
  return comps.filter(
    (c) => c.area >= minArea && c.bw < img.w * 0.9 && c.bh < img.h * 0.9,
  );
}

const args = process.argv.slice(2);
const file = args[0];
const o = { pxcm: 129.7, top: 0, bot: 1e9, min: 0.0002 };
for (let i = 1; i < args.length; i++) {
  if (args[i] === "--pxcm") o.pxcm = Number(args[++i]);
  else if (args[i] === "--top") o.top = Number(args[++i]);
  else if (args[i] === "--bot") o.bot = Number(args[++i]);
  else if (args[i] === "--min") o.min = Number(args[++i]);
}
if (!file) {
  console.error("Thiếu đường dẫn ảnh");
  process.exit(2);
}

const img = decodePng(file);
const mask = makeMask(img);
const comps = findComps(img, mask, o.top, o.bot, o.min * img.w * img.h);
const cm = (px) => Math.round((px / o.pxcm) * 10) / 10;

// gom thành HÀNG theo tâm y (cách nhau < 90 px thì cùng hàng)
comps.sort((a, b) => a.cy - b.cy || a.cx - b.cx);
const rows = [];
for (const c of comps) {
  const r = rows.find((r) => Math.abs(r.cy - c.cy) < 90);
  if (r) {
    r.items.push(c);
    r.cy = (r.cy * (r.items.length - 1) + c.cy) / r.items.length;
  } else rows.push({ cy: c.cy, items: [c] });
}
rows.sort((a, b) => a.cy - b.cy);

console.log(
  `### ${file.split("\\").pop()} · ${img.w}x${img.h} · tỉ lệ ${o.pxcm} px/cm`,
);
console.log(
  `số vật tìm được: ${comps.length} · gom thành ${rows.length} hàng\n`,
);
rows.forEach((r, ri) => {
  r.items.sort((a, b) => a.cx - b.cx);
  console.log(`HÀNG ${ri + 1} (y≈${Math.round(r.cy)}): ${r.items.length} vật`);
  r.items.forEach((c, ci) => {
    console.log(
      `   ${ci + 1}) x ${c.minX}-${c.maxX} · y ${c.minY}-${c.maxY} · RỘNG ${c.bw}px = ${cm(c.bw)} cm · cao ${cm(c.bh)} cm · dt ${c.area}`,
    );
  });
  console.log("");
});
