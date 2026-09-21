import { SLIDE_TYPES } from "../lib/contentSchema";
import { NHAN_KHOA } from "../lib/soanBai";
import {
  LESSON_TYPES,
  MASCOT_MOODS,
  MEASURED_ON,
  SLIDE_TYPE_INFO,
  SLIDE_TYPE_LABELS,
  TRICKY_KEYS,
} from "../lib/referenceData";

/**
 * THAM KHẢO — chỉ để ĐỌC.
 *
 * Trang này trả lời câu hỏi: "ô Kiểu bài / Kiểu slide / Biểu cảm linh vật trong
 * trình sửa bài thì chọn cái nào, và chọn xong thì app của bé hiện ra sao?"
 *
 * 🔴 KHÔNG truy vấn DB, KHÔNG ghi gì. Hai lý do:
 *   1. Nạp cả 362 payload để đếm là ~800 KB cho một trang tra cứu — không đáng.
 *      Số lượng slide ở đây là **ảnh chụp** ngày `MEASURED_ON`, ghi rõ trên màn hình.
 *   2. Trang tra cứu mà ghi được thì sớm muộn cũng có người ghi nhầm vào đó.
 *      Cổng `S-26` giữ đúng điều này, kèm phép kiểm "bảng biểu cảm có khớp với
 *      app thật hay không".
 */
export default function ReferencePage() {
  const kieuSlide = Object.keys(SLIDE_TYPES);

  return (
    <div className="p-4 sm:p-6 lg:p-8 2xl:p-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          📖 Tham khảo khi sửa bài
        </h1>
        <p className="mt-2 max-w-[70ch] text-sm text-slate-600">
          Trang này chỉ để đọc. Nó giải thích các ô chọn trong trình sửa bài (mở
          từ <b>Nội dung bài học</b> → chọn bài → <b>Sửa bài này</b>) và cho
          biết chọn xong thì app của bé hiện ra thế nào.
        </p>
        <p className="mt-2 max-w-[70ch] text-xs text-slate-400">
          Số lượng slide là số ĐO ĐƯỢC ngày {MEASURED_ON}, không phải số sống —
          đổi nội dung thì con số này không tự đổi theo.
        </p>
      </header>

      {/* ── A. Kiểu bài ─────────────────────────────────────────────── */}
      <Section
        title="A. Kiểu bài"
        hint="Ô “Kiểu bài” trong trình sửa. Đây là nhãn phân loại trong dữ liệu."
      >
        <p className="mb-3 max-w-[70ch] text-sm text-slate-600">
          🔴 Hiện app của bé <b>không xử lý khác nhau</b> giữa ba giá trị này —
          đổi qua lại không làm gì thay đổi trên màn hình của bé. Cả 362 bài
          đang để <code>learn</code>, nên cứ giữ nguyên như vậy.
        </p>
        <Bang
          dau={["Mã", "Nhãn trong trình sửa", "Số bài đang dùng", "Ghi chú"]}
          dong={LESSON_TYPES.map((o) => [
            <Ma>{o.value}</Ma>,
            o.label,
            o.count,
            <span className="text-slate-600">{o.note}</span>,
          ])}
        />
      </Section>

      {/* ── B. Kiểu slide — bảng tổng ────────────────────────────────── */}
      <Section
        title="B. Kiểu slide"
        hint="6 kiểu, đây là danh sách ĐÓNG: kiểu lạ thì app không biết vẽ (màn hình trắng)."
      >
        <p className="mb-3 max-w-[70ch] text-sm text-slate-600">
          Khoá bắt buộc / tuỳ chọn lấy thẳng từ bộ kiểm tra nội dung (
          <code>contentSchema.js</code>) — cùng nguồn với trình sửa bài, nên
          bảng này không thể lệch với cái trình sửa đang đòi.
        </p>
        <Bang
          dau={[
            "Mã",
            "Nhãn",
            "Số slide thật",
            "Khoá BẮT BUỘC",
            "Khoá tuỳ chọn",
          ]}
          dong={kieuSlide.map((t) => {
            const k = SLIDE_TYPES[t];
            return [
              <Ma>{t}</Ma>,
              SLIDE_TYPE_LABELS[t] ?? "⚠️ thiếu nhãn",
              SLIDE_TYPE_INFO[t]?.count ?? "—",
              <Khoa ds={Object.keys(k.batBuoc)} batBuoc />,
              <Khoa ds={Object.keys(k.tuyChon ?? {})} />,
            ];
          })}
        />
      </Section>

      {/* ── C. Chi tiết từng kiểu ────────────────────────────────────── */}
      <Section title="C. Từng kiểu slide: dùng khi nào, bé thấy gì">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          {kieuSlide.map((t) => (
            <TheKieu key={t} type={t} />
          ))}
        </div>
      </Section>

      {/* ── D. Biểu cảm linh vật ─────────────────────────────────────── */}
      <Section
        title="D. Biểu cảm linh vật"
        hint="Ô “Biểu cảm linh vật” — giá trị của khoá mascotMood."
      >
        <div className="mb-4 max-w-[70ch] rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          ⚠️ <b>Ba điều phải biết trước khi gõ ô này:</b>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>
              Chỉ slide <b>Kể chuyện</b> mới hiện ra mặt linh vật. Ở kiểu khác,
              gõ gì cũng không thấy gì.
            </li>
            <li>
              Ở slide <b>Ghi nhớ</b>, ô này là <b>tuỳ chọn</b> (từ 2026-09-20)
              và app <b>không hiện</b> nó ra — cứ để <code>happy</code> hoặc bỏ
              trống.
            </li>
            <li>
              Mọi giá trị ở bảng dưới đây đều có mặt riêng. Giá trị <b>lạ</b>{" "}
              (không có trong bảng) thì hiện mặt mặc định 😊.
            </li>
          </ol>
        </div>
        <Bang
          dau={["Giá trị gõ vào", "Bé thấy", "Số slide đang dùng", "Ghi chú"]}
          dong={MASCOT_MOODS.map((m) => [
            <Ma>{m.value}</Ma>,
            <span className="text-2xl">{m.face}</span>,
            m.count,
            <span className="text-slate-600">{m.note || "—"}</span>,
          ])}
        />
      </Section>

      {/* ── E. Khoá dễ nhầm ──────────────────────────────────────────── */}
      <Section
        title="E. Các khoá dễ gõ nhầm"
        hint="Khoá = tên trường trong dữ liệu bài học; trình sửa hiện nó thành ô nhập có nhãn tiếng Việt."
      >
        <Bang
          dau={["Khoá", "Dùng ở kiểu", "Nhãn trong trình sửa", "Cần biết"]}
          dong={TRICKY_KEYS.map((k) => [
            <Ma>{k.key}</Ma>,
            k.types,
            NHAN_KHOA[k.key.split(" ")[0]] ?? "—",
            <span className="text-slate-600">{k.note}</span>,
          ])}
        />
      </Section>
    </div>
  );
}

/* ── Các mảnh nhỏ dùng lại ─────────────────────────────────────────── */

function Section({ title, hint, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {hint && (
        <p className="mt-1 mb-3 max-w-[70ch] text-xs text-slate-400">{hint}</p>
      )}
      {children}
    </section>
  );
}

const Ma = ({ children }) => (
  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700">
    {children}
  </code>
);

const Khoa = ({ ds, batBuoc = false }) =>
  ds.length === 0 ? (
    <span className="text-slate-400">—</span>
  ) : (
    <span className="flex flex-wrap gap-1">
      {ds.map((k) => (
        <span
          key={k}
          className={
            "rounded px-1.5 py-0.5 text-xs " +
            (batBuoc
              ? "bg-rose-50 text-rose-700"
              : "bg-slate-100 text-slate-600")
          }
        >
          {k}
        </span>
      ))}
    </span>
  );

/**
 * Bảng dùng chung. `min-w` để hẹp thì cuộn ngang trong hộp, KHÔNG bóp cột —
 * cùng luật với các bảng khác của admin (xem `TC-M.3`/`TC-M.7`).
 */
function Bang({ dau, dong }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
          <tr>
            {dau.map((c) => (
              <th key={c} className="px-3 py-2 text-left font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {dong.map((hang, i) => (
            <tr key={i} className="align-top">
              {hang.map((o, j) => (
                <td key={j} className="px-3 py-2">
                  {o}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TheKieu({ type }) {
  const schema = SLIDE_TYPES[type];
  const info = SLIDE_TYPE_INFO[type] ?? {};
  const batBuoc = Object.entries(schema.batBuoc ?? {});
  const tuyChon = Object.entries(schema.tuyChon ?? {});
  const cap = schema.cap ?? [];

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-semibold text-slate-900">
          {SLIDE_TYPE_LABELS[type] ?? type}
        </h3>
        <Ma>{type}</Ma>
      </div>
      <p className="mt-1 text-xs text-slate-400">
        {info.count ?? "—"} slide thật
      </p>

      {info.when && (
        <p className="mt-2 max-w-[70ch] text-sm text-slate-700">{info.when}</p>
      )}
      {info.onKidApp && (
        <p className="mt-2 max-w-[70ch] rounded-md bg-slate-50 p-2 text-xs text-slate-600">
          👶 <b>Bé thấy:</b> {info.onKidApp}
        </p>
      )}

      <dl className="mt-3 space-y-2 text-xs">
        <div>
          <dt className="font-semibold text-rose-700">Bắt buộc phải có</dt>
          <dd className="mt-1 space-y-0.5">
            {batBuoc.map(([k, kieu]) => (
              <div key={k} className="text-slate-600">
                <Ma>{k}</Ma> · {NHAN_KHOA[k] ?? k}{" "}
                <span className="text-slate-400">({kieu})</span>
              </div>
            ))}
          </dd>
        </div>

        {tuyChon.length > 0 && (
          <div>
            <dt className="font-semibold text-slate-700">Tuỳ chọn</dt>
            <dd className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-slate-600">
              {tuyChon.map(([k, kieu]) => (
                <span key={k}>
                  <Ma>{k}</Ma> <span className="text-slate-400">({kieu})</span>
                </span>
              ))}
            </dd>
          </div>
        )}

        {cap.length > 0 && (
          <div>
            <dt className="font-semibold text-amber-700">Phải đi thành CẶP</dt>
            <dd className="mt-1 text-slate-600">
              {cap.map(([a, b]) => (
                <div key={a}>
                  <Ma>{a}</Ma> ↔ <Ma>{b}</Ma>
                </div>
              ))}
            </dd>
          </div>
        )}

        {schema.dapAnTrongOptions && (
          <div>
            <dt className="font-semibold text-amber-700">Luật đáp án</dt>
            <dd className="mt-1 text-slate-600">
              <Ma>{schema.dapAnTrongOptions}</Ma> BẮT BUỘC nằm trong{" "}
              <Ma>options</Ma>. Không có luật này thì app vẫn chạy nhưng{" "}
              <b>không bao giờ chấm đúng</b> câu đó.
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}
