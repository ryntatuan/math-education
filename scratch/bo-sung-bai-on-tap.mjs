/**
 * LƯỢT 3 — LẤP NỐT CÁC BÀI CÒN LẠI: chương ôn tập, bài toán có lời văn, bài không có ví dụ tính.
 *
 * VÌ SAO CẦN: hai lượt trước phủ được bài tính theo hàng (185 bài) và bài khái niệm/hình/đo (237 bài).
 * Còn lại là các bài KHÔNG có ví dụ số cụ thể — chủ yếu `Ôn tập học kì`, `Ôn tập cuối năm`,
 * `Tỉ số`, `bài toán có lời văn`. Đo được sau hai lượt: vẫn còn bài dưới khung.
 *
 * KHUÔN (kỹ năng học tập — thứ mà bài nào cũng cần và hiện CHƯA bài nào có):
 *   1. **BỐN BƯỚC LÀM MỘT BÀI TOÁN** — quy trình giải, đổi theo dạng bài nhận ra được từ chính chữ
 *      của bài (lời văn / so sánh / đo lường / hình học / bảng – phân số / tính toán chung).
 *   2. **BẢNG NHỚ NHANH** — ba điều phải nhớ của dạng bài đó (bảng, không phải đoạn văn).
 *   3. **CÂU HỎI QUY TRÌNH** — bước nào làm trước; đây là câu hỏi về CÁCH HỌC, không phải đáp số.
 *      Câu hỏi kiểu này bổ khuyết đúng chỗ thiếu của nhóm bài này: không có số để tính, mà trẻ vẫn
 *      cần biết thứ tự làm.
 *
 *   node scratch/bo-sung-bai-on-tap.mjs          # xem trước
 *   node scratch/bo-sung-bai-on-tap.mjs --ghi
 */
import { boSungChuong, layTatCaChuong } from "./lib-chen-slide.mjs";

const MUON_GHI = process.argv.includes("--ghi");
const iChuong = process.argv.indexOf("--chuong");
const chuongChon =
  iChuong >= 0
    ? process.argv.slice(iChuong + 1).filter((x) => !x.startsWith("--"))
    : [];

const gomChu = (v, ra = []) => {
  if (typeof v === "string") ra.push(v);
  else if (Array.isArray(v)) v.forEach((x) => gomChu(x, ra));
  else if (v && typeof v === "object")
    Object.values(v).forEach((x) => gomChu(x, ra));
  return ra;
};

/** Dấu “bài này đã được lượt 1/2/3 sinh rồi” — chạy lại không sinh trùng. */
const DAU_DA_SINH = [
  "Bé tự đặt tính",
  "So sánh và đọc số cho nhanh",
  "So sánh hai số bằng cách đếm",
  "So sánh hai số cho đúng",
  "Đặc điểm của ",
  "Bậc thang đơn vị đo",
  "Bảng cần nhớ về",
  "Cách thuộc ",
  "Cách đọc bảng số liệu",
  "Đọc và hiểu phân số",
  "Bé học Toán như thế nào?",
  "Bốn bước làm một bài toán",
];

/** Dạng bài → quy trình 4 bước + 3 điều nhớ nhanh + câu hỏi quy trình. */
const DANG_BAI = [
  {
    ten: "buổi học Toán đầu tiên",
    /**
     * 🔴 BÀI ĐỊNH HƯỚNG PHẢI CÓ KHUÔN RIÊNG. Người dùng báo (ảnh 1–3): bài “Tiết học đầu tiên”
     * bị gắn “mẹo so sánh số” và câu hỏi số liền sau trong khi bé CHƯA học số nào. Khuôn này chỉ
     * nói về cách học trong chính app: vị trí số trang, nhãn từng phần, nút loa, gợi ý của Rô-bốt.
     */
    tu: /tiết học đầu tiên|biểu tượng|làm quen|đồ dùng học toán/i,
    tieuDe: "Bé học Toán như thế nào?",
    buoc: [
      "Mỗi bài gồm nhiều trang: số trang hiện ở góc trên bên phải. Học xong một trang, bé bấm “Tiếp tục” để sang trang sau, muốn xem lại thì bấm “Trước”.",
      "Đọc nhãn nhỏ ở đầu trang để biết sắp làm gì: Khám Phá, Thực Hành, Luyện Tập hay Trò Chơi.",
      "Bấm nút loa 🔈 để nghe cô đọc, nếu chưa hiểu thì nghe lại.",
      "Làm sai thì đọc kỹ gợi ý của Rô-bốt hiện ra rồi thử lại — sai là chuyện bình thường.",
    ],
    nho: [
      ["Khám phá", "cô giảng bài mới"],
      ["Luyện tập", "bé tự làm bài"],
      ["Trò chơi", "vừa chơi vừa học"],
    ],
    hoi: "Nhãn “Trò chơi” 🎲 cho biết bé sắp làm gì?",
    dap: "Chơi trò chơi",
    nhieu: ["Đọc số", "Đo độ dài", "Tô màu"],
    viSao: "Xúc xắc là nhãn của phần Trò Chơi — bé vừa chơi vừa học.",
    moTa: "Buổi đầu tiên bé chưa học số nào: việc cần làm là biết cách học trong app và cách dùng các nút bên dưới.",
  },
  {
    ten: "bài toán có lời văn",
    tu: /lời văn|hỏi cả|hỏi còn lại|hỏi tất cả|bao nhiêu|bài toán/i,
    buoc: [
      "Đọc kỹ đề, gạch dưới các SỐ và từ khoá (thêm, bớt, gấp, chia đều).",
      "Tóm tắt đề bằng hình hoặc bằng câu ngắn: đã có gì, cần tìm gì.",
      "Chọn phép tính: “thêm, gộp, tất cả” → cộng; “bớt, cho đi, còn lại” → trừ; “gấp mấy lần” → nhân.",
      "Đặt tính rồi tính, rồi VIẾT ĐÁP SỐ kèm đơn vị và thử lại bằng phép ngược.",
    ],
    nho: [
      // ⚠️ KHÔNG dùng dấu “…” (hoặc “?”, “...”) trong Ô BẢNG: cổng `soat-o-trong` coi đó là Ô TRỐNG
      // cần điền ⇒ báo lỗi “slide cho bấm mà bảng tĩnh có ô trống” (đã mắc 61 ca).
      ["Đơn vị", "đáp số luôn kèm đơn vị như con, quả, kg, cm"],
      ["Kiểm tra", "cộng thì lấy kết quả trừ đi một số hạng"],
      ["Câu trả lời", "viết đủ câu, không chỉ ghi số"],
    ],
    hoi: "Giải một bài toán có lời văn, bé làm gì TRƯỚC TIÊN?",
    dap: "Đọc kỹ đề và gạch dưới các số đã cho",
    nhieu: ["Viết ngay đáp số", "Đoán kết quả", "Đặt tính trước khi đọc đề"],
    viSao:
      "Chưa đọc kỹ đề thì chưa biết đề cho gì, hỏi gì — mọi bước sau đều dễ sai.",
  },
  {
    ten: "so sánh số",
    tu: /so sánh|lớn nhất|bé nhất|liền trước|liền sau|sắp xếp/i,
    buoc: [
      "Đếm số CHỮ SỐ của từng số trước.",
      "Số nào nhiều chữ số hơn thì lớn hơn — xong, không cần so tiếp.",
      "Cùng số chữ số thì so từng hàng từ TRÁI sang phải, gặp hàng khác nhau thì dừng.",
      "Đọc lại kết quả và đặt đúng dấu (>, <, =).",
    ],
    nho: [
      ["Nhiều chữ số hơn", "thì số đó lớn hơn"],
      ["So từ trái", "hàng nghìn rồi mới tới trăm, chục, đơn vị"],
      ["Dấu lớn mở về phía", "số lớn hơn"],
    ],
    hoi: "Muốn so sánh hai số, bé bắt đầu bằng việc gì?",
    dap: "Đếm xem số nào có nhiều chữ số hơn",
    nhieu: [
      "So chữ số hàng đơn vị trước",
      "Cộng hai số lại",
      "Đọc từ phải sang trái",
    ],
    viSao:
      "Số nhiều chữ số hơn chắc chắn lớn hơn, nên chỉ cần so từng hàng khi hai số bằng số chữ số.",
  },
  {
    ten: "đo lường và đổi đơn vị",
    tu: /cm|dm|kg|gam|lít|ml|km|mét|gam|giờ|phút|đồng|m²|m³/i,
    buoc: [
      "Đọc đơn vị đang có và đơn vị cần đổi.",
      "Viết bậc thang đơn vị ra giấy để thấy phải đi mấy bậc.",
      "Đi xuống (ra đơn vị bé hơn) thì NHÂN; đi lên (ra đơn vị lớn hơn) thì CHIA.",
      "Viết kết quả kèm đơn vị và kiểm tra lại bằng phép ngược.",
    ],
    nho: [
      ["1 m", "= 100 cm"],
      ["1 kg", "= 1 000 g"],
      ["1 l", "= 1 000 ml"],
    ],
    hoi: "Đổi số đo từ đơn vị lớn sang đơn vị bé hơn thì bé làm phép gì?",
    dap: "Nhân",
    nhieu: ["Chia", "Cộng", "Trừ"],
    viSao:
      "Đơn vị bé hơn thì số đo phải nhiều hơn: 1 m đổi ra cm được 100 cm — đó là phép nhân.",
  },
  {
    ten: "hình học",
    tu: /hình|góc|cạnh|đỉnh|diện tích|chu vi|thể tích/i,
    buoc: [
      "Gọi đúng tên hình trước (hình gì, khối gì).",
      "Kể các đặc điểm: số cạnh, số đỉnh, số mặt, cạnh nào bằng nhau.",
      "Dùng ê-ke hoặc thước để KIỂM TRA đặc điểm vừa kể trên hình vẽ.",
      "Nếu đề hỏi chu vi / diện tích thì viết công thức ra, thay số rồi mới tính.",
    ],
    nho: [
      ["Chu vi", "cộng độ dài các cạnh bao quanh"],
      ["Diện tích hình chữ nhật", "dài × rộng (cùng đơn vị)"],
      ["Chu vi hình vuông", "cạnh × 4"],
    ],
    hoi: "Nhìn một hình, bé làm gì để biết đó là hình gì?",
    dap: "Đếm cạnh và đếm đỉnh rồi so với đặc điểm từng hình",
    nhieu: ["Đoán bằng mắt", "Đo diện tích", "Tính chu vi trước"],
    viSao:
      "Số cạnh và số đỉnh là đặc điểm phân biệt các hình — đoán bằng mắt thì dễ nhầm hình chữ nhật với hình vuông.",
  },
  {
    ten: "bảng nhân – bảng chia – phân số",
    tu: /bảng|cấp số|phân số|tử số|mẫu số|nhân|chia/i,
    buoc: [
      "Xác định đề hỏi nhân hay chia (chia luôn tra ngược bảng nhân).",
      "Tách số thành hàng chục và hàng đơn vị rồi tính từng phần.",
      "Cộng các phần lại, nhớ cộng số nhớ khi có.",
      "Thử lại bằng phép ngược (nhân ↔ chia) hoặc bằng tổng.",
    ],
    nho: [
      ["Nhân với 10", "thêm một chữ số 0"],
      ["Chia hết", "số dư bằng 0"],
      ["Phân số", "mẫu số chia đều thành mấy phần, tử số lấy mấy phần"],
    ],
    hoi: "Muốn tính 24 : 6, bé dựa vào đâu cho nhanh?",
    dap: "Tra ngược bảng nhân 6",
    nhieu: ["Đếm lùi 24 lần", "Cộng 6 vào 24", "Bấm máy tính"],
    viSao:
      "Vì 6 × 4 = 24 nên 24 : 6 = 4 — tra bảng nhân bao giờ cũng nhanh hơn đếm.",
  },
  {
    ten: "tính toán",
    tu: /.*/,
    buoc: [
      "Đọc đề và xác định phép tính cần làm.",
      "Đặt tính thẳng cột: hàng đơn vị dưới hàng đơn vị, hàng chục dưới hàng chục.",
      "Tính từ PHẢI sang TRÁI; nhớ ghi hoặc xoá số nhớ ngay khi làm xong một hàng.",
      "Thử lại bằng phép ngược hoặc bằng ước lượng xem kết quả có hợp lý không.",
    ],
    nho: [
      ["Cộng", "lấy kết quả trừ đi một số hạng để kiểm tra"],
      ["Trừ", "lấy hiệu cộng số trừ phải được số bị trừ"],
      ["Thứ tự", "luôn làm từ hàng đơn vị trước"],
    ],
    hoi: "Khi đặt tính rồi tính, bé bắt đầu từ hàng nào?",
    dap: "Hàng đơn vị (từ phải sang trái)",
    nhieu: [
      "Hàng cao nhất (trái sang phải)",
      "Hàng nào cũng được",
      "Hàng chục trước",
    ],
    viSao: "Tính từ phải sang trái thì số nhớ mới kịp cộng vào hàng bên trái.",
  },
];

const dangBaiCua = (bai) => {
  const chu = [bai.title, bai.description, ...gomChu(bai.slides ?? [])].join(
    " · ",
  );
  return DANG_BAI.find((d) => d.tu.test(chu)) ?? DANG_BAI[DANG_BAI.length - 1];
};

const tatCa = await layTatCaChuong();
const mucTieu = chuongChon.length
  ? tatCa.filter((c) => chuongChon.includes(c.id))
  : tatCa;

let bai = 0;
let slide = 0;
const boQua = [];

for (const chuong of mucTieu) {
  const kq = boSungChuong(
    chuong,
    (b) => {
      const dang = dangBaiCua(b);
      return [
        {
          type: "concept",
          content: {
            badge: "Cách Học",
            title: dang.tieuDe ?? "Bốn bước làm một bài toán",
            explanation:
              dang.moTa ??
              `Mọi bài ${dang.ten} đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.`,
            points: dang.buoc.map((b2, i) => `Bước ${i + 1} — ${b2}`),
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Điều cần nhớ", "Nội dung"],
              rows: dang.nho.map(([a, b2]) => [a, b2]),
            },
            text: [
              `Bảng nhớ nhanh — ${dang.ten}`,
              `Ba điều dưới đây bé đọc lại mỗi khi làm bài.`,
              `Trước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?`,
            ].join("\n"),
          },
        },
        {
          type: "quiz",
          content: {
            question: dang.hoi,
            options: [dang.dap, ...dang.nhieu],
            answer: dang.dap,
            mascotHint: dang.viSao,
          },
        },
      ];
    },
    {
      ghi: MUON_GHI,
      coiNhuDaCo: (b) =>
        DAU_DA_SINH.some((d) => JSON.stringify(b.slides ?? []).includes(d)),
    },
  );
  bai += kq.soBai;
  slide += kq.soSlide;
  boQua.push(...kq.boQua);
  if (kq.soBai)
    console.log(
      `${MUON_GHI ? "✍️" : "👀"} ${chuong.id} — ${kq.soBai} bài · ${kq.soSlide} slide`,
    );
}

console.log(
  `\n${MUON_GHI ? "ĐÃ GHI" : "XEM TRƯỚC"}: ${bai} bài · ${slide} slide · bỏ qua ${boQua.length} bài (đã có nội dung bổ sung)`,
);
if (!MUON_GHI) console.log("(thêm --ghi để ghi thật)");
