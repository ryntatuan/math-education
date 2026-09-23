# Kế hoạch Triển khai Hệ thống Kinh tế & Tính năng Thú Cưng Mới (Bản Chốt Hoàn Chỉnh V5 - Sẵn sàng Code)

Bản kế hoạch này đã trải qua 5 vòng kiểm định, vá toàn bộ các lỗ hổng về logic toán học, rủi ro tương thích ngược, và làm sạch 100% bộ kịch bản test để đảm bảo không có kết quả giả.

## Các Quyết định Kiến trúc & Cân bằng Cuối cùng

1. **Quy luật Bùa Bức Tốc:**
   - Có 3 loại ngẫu nhiên: **X1.5 (20p)**, **X2 (15p)**, **X3 (10p)**.
   - **CHỈ NHÂN XP** (Bao gồm League XP), **KHÔNG nhân Xu** để chống lạm phát đồ chơi.
   - Bùa sẽ tự hết hạn. Hàm `addXp` luôn lọc bỏ bùa hết hạn. Nếu có >1 bùa hợp lệ, lấy **MAX** hệ số. Bùa không sync cloud.
2. **Kho lưu trữ Quà & Nhịp độ (Pacing):**
   - Hộp quà phát **mỗi 5 CẤP** bằng công thức chống lọt mốc: `số hộp thêm = Math.floor(newLevel/5) - Math.floor(oldLevel/5)`.
   - Bấm mở hộp khi đang có bùa -> **chặn mở** (số hộp giữ nguyên) + hiện lỗi nội bộ.
3. **Kinh Tế Tiêu Dùng (Thức ăn vs Đồ chơi):**
   - **Thức ăn (Tăng Độ No + EXP):** Táo (`apple`: 10 Xu, +20 No, **+10 XP**) | Bánh sừng bò (`croissant`: 20 Xu, +50 No, **+25 XP**). EXP của thức ăn = một nửa độ no. **Thức ăn KHÔNG tăng độ vui.**
   - **Đồ chơi (Tăng EXP + Độ vui):** Bóng len (`yarn`: 15 Xu, +30 Exp) | Ván trượt (`skateboard`: 30 Xu, +75 Exp) | Tàu vũ trụ (`spaceship`: 60 Xu, +180 Exp). Cả ba loại đồ chơi còn cho **+20 Độ vui**.
   - **Đồ chơi (Chỉ tăng EXP):** Bóng len (`yarn`: 15 Xu, +30 Exp) | Ván trượt (`skateboard`: 30 Xu, +75 Exp) | Tàu vũ trụ (`spaceship`: 60 Xu, +180 Exp).
   - Đồ chơi lưu chung cột `inventory` với thức ăn.
4. **Nới Lỏng Ngưỡng Cản & Nhiệm Vụ:**
   - Đói < 50% chặn Đồ chơi (không chặn bùa).
   - Nhiệm vụ ngày `quest_pet` là **"Cho thú cưng ăn hoặc chơi"**: cả `feedPet` và `playWithPet` đều tính tiến độ.
   - Táo miễn phí mỗi ngày reset lúc 7h sáng VN (chuẩn UTC), có gọi API ghi DB ngay lúc phát.
5. **Tiến Hóa Dài Hạn:** Cấp 10 (Vương Miện 👑), Cấp 20 (Hào Quang ✨), 30 (Gậy Phép 🪄), 40 (Đôi Cánh 🪽).

---

## Proposed Changes (Chi tiết Kỹ thuật)

### A. Database (Supabase Migration `0018_pet_economy.sql`)

```sql
ALTER TABLE public.child_pets
  ADD COLUMN unlocked_pets JSONB,
  ADD COLUMN last_fed_time TIMESTAMPTZ,
  ADD COLUMN unopened_gift_boxes INT DEFAULT 0,
  ADD COLUMN last_free_food_date DATE;

-- Cứu hộ thú cưng tránh chết đói 0% đồng loạt:
UPDATE public.child_pets SET last_fed_time = NOW() WHERE last_fed_time IS NULL;

-- Hợp nhất pet_type vào mảng (chỉ người có thú cưng)
UPDATE public.child_pets
SET unlocked_pets = CASE
    WHEN pet_type = 'owl' THEN '["owl"]'::jsonb
    ELSE jsonb_build_array(pet_type, 'owl')
END
WHERE has_pet = true AND unlocked_pets IS NULL;

-- Default
ALTER TABLE public.child_pets ALTER COLUMN unlocked_pets SET DEFAULT '["owl"]'::jsonb;
ALTER TABLE public.child_pets ALTER COLUMN pet_type SET DEFAULT 'owl';
ALTER TABLE public.child_pets ALTER COLUMN last_fed_time SET DEFAULT NOW();
```

### B. Quản lý Trạng thái & Đồng bộ Cloud (State Management)

#### [MODIFY] `client/src/store/usePetStore.js`

- Khởi tạo mặc định: `unlockedPets: ['owl']`, `unopenedGiftBoxes: 0`.
- Khai báo hằng số `DECAY_RATE = 2` (% mỗi giờ) + `HOUR_MS = 3600000`. **Chỉ tụt theo MỐC GIỜ TRÒN** — xem V5.3.
- `PET_TYPES` giữ nguyên cấu trúc mảng, chỉ thêm giá: `[{ id: 'owl', name: 'Cú Con Trí Tuệ', icon: '🦉', desc: '...', price: 0 }, { id: 'corgi', ..., price: 300 }]`.
- Selector:
  - `getExpForNextLevel = (lvl) => 100 + 20*(lvl-1)`.
  - `getHunger = (state) => decayByHour(state.hunger, state.lastFedTime)` và `getHappiness = (state) => decayByHour(state.happiness, state.lastHappinessTime)`, trong đó `decayByHour` trừ `DECAY_RATE` cho mỗi GIỜ TRÒN đã trôi qua (xem V5.3).
- **Hàm `adoptPet`:** Cực kỳ quan trọng: phải set `lastFedTime: Date.now()` lúc khởi tạo để tránh thú cưng bị đói 0% ngay khi vừa nhận nuôi.
- **Hàm `feedPet`:** `current = getHunger(state)`. Sau đó `hunger = min(100, current + food)`. Tính `progressQuest('quest_pet')`.
- **Hàm `playWithPet`:** Chặn nếu `getHunger(state)` < 50%. Tính `progressQuest('quest_pet')`. Cộng EXP. Thêm hộp quà dùng `Math.floor(newLevel/5) - Math.floor(oldLevel/5)`.
- **Hàm `openGiftBox()`:**
  - Lấy `activeBoosters` từ `useUserStore`. Lọc bùa hợp lệ `filter(b => b.expiresAt > Date.now())`. Nếu mảng còn -> Báo lỗi chặn, `return { error: 'Bạn đang có bùa...' }`.
  - Nếu ok -> Random bùa, gọi `addBooster`, `unopenedGiftBoxes -= 1`. `return { type, duration }`.
- **Hàm `switchPet(id)`:** Dùng Modal của App (thay vì `window.confirm`) để xác nhận reset tên.

#### [MODIFY] `client/src/store/useUserStore.js`

- Khai báo `activeBoosters: []`.
- Khai báo action `addBooster({ type: 'XP', multiplier, durationMinutes })`. Kèm logic dọn dẹp bùa hết hạn.
- Hàm `addXp`:
  ```js
  const alive = activeBoosters.filter(
    (b) => b.type === "XP" && b.expiresAt > Date.now(),
  );
  const mult = alive.length ? Math.max(...alive.map((b) => b.multiplier)) : 1;
  // Áp dụng mult vào kết quả trả về
  ```

#### [MODIFY] `client/src/services/syncService.js`

- Chiều Ghi (Lưu ý rất quan trọng): Vì `last_fed_time` trên DB là `TIMESTAMPTZ`, khi lưu lên cloud, bắt buộc phải parse ra ISO string: `last_fed_time: new Date(petState.lastFedTime).toISOString()`. Nếu lưu thẳng số, PostgREST sẽ báo lỗi 400 và nuốt log.
- Khi load app: Fallback dòng `has_pet = false` không có unlocked_pets: `pet.unlocked_pets || ["owl"]`.
- Parse chuẩn thời gian: `const fedTime = typeof pet.last_fed_time === 'string' ? Date.parse(pet.last_fed_time) : (Number(pet.last_fed_time) || Date.now());`. Không parse thẳng để tránh lỗi `NaN`.
- Khi load app: Phát 1 Táo nếu `last_free_food_date` != hôm nay (UTC), gọi `PATCH` ghi DB lập tức.
- Đảm bảo **4 CHỖ ĐỒNG BỘ** (`saveCurrentPetToCloud`, `autoMigrateGuestDataToCloud`, `loadChildDataToLocalStores`, `subscribe`) đọc/ghi đủ: `unlocked_pets`, `last_fed_time`, `unopened_gift_boxes`, `last_free_food_date`.

### C. Giao diện & Trải nghiệm (UI/UX)

#### [NEW] `client/src/components/layout/BoosterTimer.jsx`

- Tạo component đếm ngược.
- CSS: Đặt góc **DƯỚI-TRÁI**. `left: calc(var(--sidebar-width, 260px) + 10px)` (Mobile: `10px`), `bottom: calc(58px + var(--sab) + 10px); z-index: 101;`

#### [MODIFY] `client/src/components/pet/PetWidget.jsx` & Khác

- Admin Portal `ChildProfilePage.jsx`: **copy nguyên công thức `decayByHour` + `DECAY_PER_HOUR = 2`** (admin là project Vite riêng, không import được từ `client/src`). Sai lệch công thức là phụ huynh và bé thấy hai số khác nhau. Cũng dùng `pet:child_pets(*)` thay vì liệt kê tên cột, để DB chưa chạy migration mới cũng không vỡ trang.
- Cập nhật `admin_portal_test_cases.md`: Thêm 2 ca tĩnh (Bùa hết hạn hệ số về 1, Công thức getHunger trừ đúng thời gian trôi qua).
- PetWidget: Hiện icon `🎁 x[Số]` nếu có hộp. Bấm gọi `openGiftBox()`. Nếu lỗi, cập nhật State nội bộ hiện thông báo đỏ (như `ShopPage.purchaseMsg`).

#### [MODIFY] `client/src/pages/ShopPage.jsx`

- Tab "Thức ăn & Đồ chơi": Gọi `spendCoins`, `addFood` / `addToy`.
- Tab "Thú cưng": Gọi `PET_TYPES` hiển thị Corgi, Mèo, Rồng với giá và nút Đổi. Cú luôn mở.

## Verification Plan (Kịch bản Test Độc Lập)

1. **Test Nhân XP Lấy Max:**
   - Dùng mã: `(await import('/src/store/useUserStore.js')).default.setState({ activeBoosters: [{ type: 'XP', multiplier: 2, expiresAt: Date.now() + 600000 }, { type: 'XP', multiplier: 3, expiresAt: Date.now() + 600000 }] });`
   - Hoàn thành bài 5 câu. Mong đợi: Base 50 XP -> Nhận `+150 XP, +70 Xu`.
2. **Test Materialize Báo Đúng Số (%):**
   - Dùng mã: `(await import('/src/store/usePetStore.js')).default.setState({ hunger: 100, lastFedTime: Date.now() - 3*24*3600*1000, inventory: { spaceship: 20 } });`
   - Bấm Đồ Chơi -> Chặn (Vì báo đói).
   - Mua Bánh sừng bò (+50 No) -> Bấm Cho Ăn. Mong đợi: Widget hiện chuẩn xác 50% (Không phải 100%), Bấm chơi Đồ Chơi thành công.
3. **Test Cơ Chế Kho Quà & Chặn Mở Đè:**
   - Dùng mã: `(await import('/src/store/usePetStore.js')).default.setState({ inventory: { spaceship: 20 }, hunger: 100, lastFedTime: Date.now() });`
   - Bấm chơi tàu vũ trụ liên tục (khoảng 9 lần để từ cấp 4 lên cấp 11 - tức là vượt 2 mốc cấp 5 và 10). Xác nhận số hộp quà **tăng +2**.
   - Bấm Hộp quà (khi CHƯA CÓ BÙA) -> Mở thành công, hộp giảm 1.
   - Bấm hộp quà (khi ĐANG CÓ BÙA) -> Hiện lỗi (errorMsg local), số hộp **giữ nguyên là `x1`**.
4. **Test Bùa Hết Hạn Tự Động Hủy:**
   - Dùng mã: `(await import('/src/store/useUserStore.js')).default.setState({ activeBoosters: [{ type: 'XP', multiplier: 3, expiresAt: Date.now() - 1000 }] });`
   - Hoàn thành bài 5 câu. Mong đợi: `+50 XP, +70 Xu`. (BoosterTimer không hiển thị).
5. **Test 4 Chỗ Đồng Bộ Không Phụ Thuộc Phiên (Quan Trọng):**
   - Mua Corgi -> Chuyển sang Corgi.
   - Console: `localStorage.removeItem('toan-vui-pet'); localStorage.removeItem('toan-vui-user');`
   - F5 Reload. Mong đợi: Ứng dụng nạp lại thú Corgi (Vì Token vẫn còn, sync load từ DB xuống).
6. **Test Ghi DB Táo Miễn Phí:**
   - F12 Network tab. Chỉnh ngày `last_free_food_date` trên DB thành hôm qua. F5 Reload app -> Thấy kho đồ cộng 1 Táo, và có request `PATCH /rest/v1/child_pets` ghi date.

---

## Cập nhật V5.1 — Ngoại hình tự chọn (đã code & đo thật)

### 1. Ngoại hình (tiến hóa) do bé chọn, không gán cứng theo cấp

5 mốc ngoại hình: **`plain` Thú con (cấp 1)**, **`crown` Vương miện (10)**, **`aura` Hào quang (20)**, **`wand` Gậy phép (30)**, **`wings` Đôi cánh (40)**.

- Bé cấp 13 mà để chế độ "tự động" thì vẫn hiện Vương miện như cũ; ai muốn quay lại "Thú con" thì chọn được.
- **Không dùng id `baby`** (dù tên hiển thị là "Thú con"): app phiên bản cũ đã từng ghi `stage` = `baby`/`teen`/`master` vào DB, nếu id mới trùng `baby` thì dữ liệu cũ bị hiểu nhầm thành lựa chọn của bé (đã mắc thật khi test: `stage='baby'` làm bé cấp 13 hiện "Thú con" thay vì "Vương miện").
- Quy tắc: id mới **không được trùng** bất kỳ giá trị cũ nào của `stage`; mọi giá trị lạ đều rơi về `auto`.

### 2. Lưu trữ: tái dùng cột `stage` — KHÔNG cần migration mới

- Lúc review V5 đã chốt "ngừng dùng `stage`", giờ đổi thành **dùng lại `stage` để lưu lựa chọn ngoại hình** (`'auto'` hoặc id ngoại hình). Vì vậy **không phải dán thêm SQL nào**.
- Vẫn giữ nguyên quyết định cũ: **không DROP** cột `stage` (APK cũ còn `upsert` cột này, drop là `PGRST204` ngay).
- `usePetStore`: thêm `petEvolution: 'auto'`, action `setPetEvolution(id)` (chỉ nhận `'auto'` hoặc id **đã mở**, id chưa mở thì bỏ qua), 2 selector thuần:
  - `getUnlockedEvolution(level)` → mốc cao nhất mà `level` đã đạt.
  - `getActiveEvolution(level, chosen)` → dùng `chosen` nếu hợp lệ **và** đã mở, còn lại rơi về auto.
- `syncService`: ghi `stage: petEvolution` và đọc `petEvolution: pet.stage || 'auto'`; thêm so sánh `petEvolution` trong subscriber. Giá trị cũ `baby`/`teen`/`master` tự thành không hợp lệ -> auto.
- `resetPet` trả `petEvolution` về `'auto'`.

### 3. Giao diện

- Bấm vào **con thú** (`.pet-visual-area`) -> mở modal `pet-evo-modal`: 5 thẻ `pet-evo-card`, nhãn `Đang dùng` / `Đã mở` / `Mở ở cấp N`; thẻ chưa mở bị `disabled` + mờ. Bé chọn thẻ đã mở là đổi ngoại hình ngay.
- Vuốt ve thú chuyển vào **khung xem trước** trong modal (`pet-evo-preview`, gọi `petPet`).
- Dòng nhãn thanh EXP: `Ngoại hình: <tên>` thay cho tên bậc tiến hóa cũ.

### 4. Chữ hiển thị cho bé: bỏ "Bùa" và "x2/x3"

- Đồng hồ bùa (`BoosterTimer`): `Nhân {multiplier} XP` (trước là `XP x2`).
- Modal hộp quà: `Nhân N XP`; thông báo chặn mở khi đang có bùa: "Chà! Con đang có phần thưởng nhân XP rồi. Hãy học chăm chỉ cho đến khi hết giờ rồi mở tiếp nhé!"
- Thẻ nhiệm vụ: **bỏ huy hiệu chuỗi ngày** vì `Header` đã hiện `{currentStreak} ngày`; phụ đề đổi thành "Học 1 bài hoặc chơi 1 game bất kỳ để giữ chuỗi ngày học" (không còn nhắc lại số ngày).

### 5. Cân đối lại giao diện cột phụ (340px trên web)

- Thẻ nhiệm vụ: mỗi hàng nhiệm vụ trước đây cao **103–127px** (tên bài, số `0/2`, thưởng Xu/XP mỗi thứ một dòng) -> gộp tên bài 1 dòng và số lượng + thưởng xuống 1 dòng phụ. Tiêu đề rương rút ngắn.
- Thẻ thú cưng (chế độ `compact`): avatar bị căn giữa theo chiều dọc nên chữ bên phải bị dồn cột -> `Ngoại hình: Vương m…` bị cắt, hai chỉ số No/Vui phải xuống 2 dòng. Cách chữa: cho `.pet-details-area` và `.pet-name-row` thành `display: contents` để các khối con vào thẳng lưới của thẻ (avatar + tên ở hàng 1, thanh EXP và các chỉ số trải hết chiều ngang).
- Số đo sau khi sửa (cột phụ 340px, màn hình 1440×900): thẻ nhiệm vụ **732 -> 477px**, đầu thẻ **117 -> 46px**, mỗi hàng nhiệm vụ **103–127 -> 65px**, rương thưởng **109 -> 63px**; thẻ thú cưng 283 -> 306px nhưng hết cắt chữ và hai chỉ số nằm 1 hàng. **Cả cột 895px, vừa trong màn hình 900px** (trước đây tràn xuống 1127px).
- Vẫn phải giữ đường trả về 1 cột trong `@media (max-width: 540px)`: bố cục mới dùng lưới 2 cột nên ở màn hình hẹp phải trả `grid-column: 1 / -1` cho tất cả khối con, nếu không các khối sẽ chen vào lưới 2 cột và tràn ngang.

### 6. Kết quả đã đo (bằng trình duyệt thật, không phải test giả)

- 8 test store + 6 test trong Verification Plan đều PASS (nhân XP lấy MAX, bùa hết hạn tự huỷ, đồng bộ cloud sau khi xoá localStorage, táo miễn phí 1 lần/ngày và PATCH được ghi DB, đếm ngược hiện đúng).
- Modal ngoại hình: màn hình 900px -> 460×503, giữa màn hình; màn hình 375px -> 343×625, 2 cột 143.5px/card, không tràn ngang, không phải cuộn.
- Chọn "Thú con" ở cấp 13 -> nhãn đổi ngay, vương miện trên avatar mất, DB `stage = 'plain'`.

---

## Cập nhật V5.2 — Độ no, độ vui & XP khi cho ăn

### 1. Vì sao cho ăn mà độ no không lên 100%

Độ no là giá trị **suy giảm liên tục** theo thời gian: `getHunger() = hunger - (giờ trôi qua × 1.5)`, và lúc cho ăn chỉ được đặt tối đa 100 rồi ghi lại `lastFedTime`. Nên **ngay giây sau khi cho ăn**, giá trị thật đã là 99.999x — mà màn hình lại dùng `Math.floor` nên hiện **99%**. Lỗi nằm ở chỗ làm tròn, không phải ở logic cho ăn.

> Mục này chỉ còn là lịch sử. Cách suy giảm liên tục đã được thay bằng **mốc giờ tròn ở V5.3** — từ đó giá trị luôn là số nguyên 2% mỗi nấc nên chuyện 99.999x không còn xảy ra.

- Sửa: hiển thị dùng `Math.round` (cả `PetWidget` và `ChildProfilePage` bên admin) -> cho ăn xong là thấy **100%**.
- Đổi luôn điều kiện chặn cho khớp với số bé nhìn thấy: chặn khi `Math.round(getHunger()) >= 100` (trước đây so với số gốc 99.99 nên có lúc hiện 100% mà vẫn cho ăn được).
- Số đo thật: độ no đang ở 99.92% -> màn hình hiện **100%** (bản cũ hiện 99%).

### 2. Cho ăn giờ cũng tăng XP

- `FOOD_TYPES` thêm trường `expGain`: Táo **+10 XP**, Bánh sừng bò **+25 XP** (bằng nửa độ no).
- Tách hàm dùng chung `applyPetExp(state, expGain, getExpForNextLevel)` trong `usePetStore` (trước đây phần lên cấp + tính hộp quà bị viết riêng trong `playWithPet`) -> cả ăn và chơi đều đi qua một chỗ, hộp quà theo mốc 5 cấp vẫn đúng.
- `feedPet` trả thêm `expGained` / `levelUp` / `boxesGained`; `PetWidget` hiện thông báo `Ngon quá! +10 XP cho thú cưng` hoặc `Lên cấp 14! +10 XP` (đồ chơi cũng báo tương tự).
- Cho ăn tăng **XP của thú** (thanh XP trên thẻ), không phải XP tài khoản — giống hệt đồ chơi.
- Số đo thật: độ no 94%, XP 70/340, kho Táo x7 -> cho ăn -> độ no **100%**, XP **80/340**, Táo x6, thông báo `Ngon quá! +10 XP cho thú cưng`.

### 3. Độ vui vẻ (`happiness`) đang tính thế nào

Đây là con số 0-100 **chỉ tăng, không tự giảm theo thời gian** và bị chặn trần 100:

| Hành động                | Thay đổi  |
| ------------------------ | --------- |
| Nhận nuôi thú            | đặt = 100 |
| Chơi đồ chơi             | +20       |
| Vuốt ve thú              | +10       |
| Giá trị khởi tạo / reset | 90        |

> ⚠️ **Đã bỏ dòng "Cho ăn +15" ở V5.6**: cho ăn chỉ tăng độ no + XP, không đụng độ vui.

Vì đã chạm 100 thì bị chặn trần, mọi hành động sau đó đều **không thấy đổi gì** — đó là lý do bé cho ăn mà độ vui vẫn 100% (không phải lỗi). Đây là điểm cần bạn quyết: có muốn cho độ vui **tự giảm theo ngày** (giống độ no) để bé phải chăm thú không, hay giữ nguyên cho nhẹ nhàng, không tạo áp lực cho bé?

### 4. Tên nhiệm vụ

- `DEFAULT_DAILY_QUESTS`: `quest_pet` đổi thành **"Cho thú cưng ăn hoặc chơi"** (tên ngắn để vừa 1 dòng trong cột 340px); đổi luôn mô tả ở `ChallengePage` và dòng xem trước của khách.
- `initOrResetDailyQuests` chỉ dựng lại danh sách khi **sang ngày mới**, nên đổi chữ sẽ không tới tay bé ngay trong ngày. Đã thêm bước **đồng bộ lại tên/icon** khi vẫn còn cùng ngày (không đụng tiến độ đã làm) -> mở app là thấy tên mới ngay.

---

## Cập nhật V5.3 — Suy giảm theo MỐC GIỜ, màu sắc & biểu cảm

### 1. Đổi từ "trừ dần từng giây" sang "trừ theo mốc giờ tròn"

- Trước: `getHunger() = hunger - (số giờ lẻ × 1.5)` — con số nhích xuống liên tục nên bé vừa cho ăn đã thấy chỉ số tụt, dễ lo. App học tập thì không cần áp lực kiểu đó.
- Nay: `DECAY_RATE = 2` (% mỗi giờ) và chỉ trừ cho **từng GIỜ TRÒN** đã trôi qua:
  ```js
  const hours = Math.max(0, Math.floor((Date.now() - since) / HOUR_MS));
  return Math.max(0, Math.min(100, value - hours * DECAY_RATE));
  ```
- Kết quả: cho ăn xong bé được **nguyên 1 tiếng thấy 100%**, hết 1 tiếng mới tụt đúng 1 nấc 2%. Từ 100% xuống 0% mất 50 giờ (~2 ngày).
- Hàm dùng chung `decayByHour(value, since)`; `getHunger` dùng mốc `lastFedTime`, `getHappiness` dùng mốc mới `lastHappinessTime`. Luôn kẹp `Math.max(0, …)` cho số giờ nên đổi giờ máy (mốc ở tương lai) cũng **không cộng ngược** chỉ số.

### 2. Độ vui suy giảm 2%/giờ — cần migration `0019_pet_happiness_decay.sql`

- Thêm cột `last_happy_time TIMESTAMPTZ` theo đúng thứ tự của 0018: `ADD` (không DEFAULT) -> backfill `NOW()` -> `SET DEFAULT`. Không có `IF NOT EXISTS` nên dán lại lần 2 sẽ báo `42701`.
- Vì sao cần mốc riêng: cho ăn chỉ được làm mới đồng hồ **độ no**. Dùng chung `last_fed_time` thì bé cho ăn là độ vui bị "reset" oan.
- Mọi hành động làm tăng độ vui (`playWithPet` +20, `petPet` +10) đều **lấy giá trị ĐÃ suy giảm làm gốc** rồi mới cộng, và ghi lại `lastHappinessTime`. Không làm vậy sẽ bị trừ hai lần (giá trị mới vẫn tính theo mốc cũ). **Cho ăn không nằm trong nhóm này** (xem V5.6).
- **Chống lỗi khi DB chưa chạy SQL:** `upsertPetRow()` gửi kèm `last_happy_time`; nếu PostgREST trả `PGRST204` / "column … does not exist" thì **gửi lại lần 2 không kèm cột đó**. Thiếu bước này thì mọi lượt lưu thú đều hỏng im lặng (lỗi bị `try/catch` nuốt) — đúng loại bẫy đã gặp với `last_fed_time`.
- Đồng bộ 4 chỗ như cũ: `autoMigrateGuestDataToCloud`, `loadChildDataToLocalStores`, `saveCurrentPetToCloud`, và subscriber `usePetStore.subscribe`.

### 3. Màu sắc theo mức chăm sóc (`CARE_TIERS` trong `usePetStore`)

Dùng chung cho cả độ no và độ vui, 5 mốc — chia thêm 2 mốc so với đề xuất ban đầu (chỉ 3 mốc) để bé thấy rõ "sắp cần chăm" trước khi tới mức nguy hiểm:

| Mốc   | Nhãn        | Màu           | Nền / viền            |
| ----- | ----------- | ------------- | --------------------- |
| 100   | Tuyệt vời   | xanh đậm      | `#ebfbee` / `#8ce99a` |
| 80–99 | Tốt         | xanh          | `#f4fce3` / `#c0eb75` |
| 50–79 | Bình thường | vàng (như cũ) | `#fffbeb` / `#fef3c7` |
| 20–49 | Thấp        | cam           | `#fff4e6` / `#ffc078` |
| 0–19  | Nguy hiểm   | đỏ            | `#fff5f5` / `#ffa8a8` |

- Mức "Thấp" thêm viền sáng, mức "Nguy hiểm" nhấp nháy nhẹ cho bé chú ý.
- Nhãn mức chỉ đặt ở `title` (di chuột) và `aria-label`, không nhồi chữ vào thẻ cho rối mắt.

### 4. Biểu cảm của thú theo độ vui

| Độ vui | Biểu cảm      | Mã emoji | Avatar                             |
| ------ | ------------- | -------- | ---------------------------------- |
| 100    | mặt ngôi sao  | `\1F929` | viền xanh đậm                      |
| 80–99  | mặt cười tươi | `\1F604` | nhún nhẹ, viền xanh                |
| 50–79  | mặt cười nhẹ  | `\1F642` | như cũ                             |
| 20–49  | mặt buồn      | `\1F622` | bớt màu (`saturate .82`), viền cam |
| 0–19   | mặt khóc      | `\1F62D` | xỉn hơn (`.6`), viền đỏ, lắc nhẹ   |

- Emoji vẽ bằng **CSS escape** (`content: "\1F929"`) chứ không dán ký tự emoji vào file: đã từng gặp lỗi ghi file làm mất emoji và **không sửa lại được**.
- Avatar chỉ đổi `filter` + `box-shadow`, **không** dùng `transform`, vì framer-motion đang điều khiển transform của chính phần tử đó (`whileHover`/`whileTap`) nên animation transform sẽ bị đè.
- Có tôn trọng `prefers-reduced-motion`: tắt hết nhún nhảy/nhấp nháy.

### 5. Số đo thật (đo trên app đang chạy với dữ liệu thật của bé)

- Công thức: 0 phút → 100 · 30 phút → 100 · 59 phút → 100 · 61 phút → **98** · 3 giờ → 94 · 3 giờ 30 → 94 · 50 giờ → 0 · 100 giờ → 0. Độ vui: `happiness 100`, mốc 5 giờ trước → 90.
- Quét giao diện 4 mốc (đọc màu thật + emoji thật từ trình duyệt):

| Mốc  | Độ no | Mức    | Màu nền đo được    | Biểu cảm (độ vui)     |
| ---- | ----- | ------ | ------------------ | --------------------- |
| 1h20 | 98%   | good   | `rgb(244,252,227)` | `\1F929` (độ vui 100) |
| 14h  | 72%   | normal | `rgb(255,251,235)` | `\1F642` (độ vui 60)  |
| 30h  | 40%   | low    | `rgb(255,244,230)` | `\1F622` (độ vui 30)  |
| 45h  | 10%   | danger | `rgb(255,245,245)` | `\1F62D` (độ vui 10)  |

- Sau khi đo, dòng `child_pets` đã trả về đúng như cũ: `hunger 100 · happiness 100 · exp 70 · level 13 · hộp quà 2 · last_fed_time 2026-09-23T07:48:50.869Z · inventory {yarn 1, apple 7, croissant 5}`.

---

## Cập nhật V5.4 — Mặt thú vẽ bằng SVG (thay cho emoji cảm xúc)

### 1. Quy tắc kết hợp hai chỉ số thành nét mặt

**Nét mặt = mức THẤP HƠN trong hai chỉ số**: `moodTier = getCareTier(Math.min(độ no, độ vui))`.

- Lý do: thú buồn nếu **hoặc** đói **hoặc** chán ⇒ bé chỉ cần nhìn mặt là biết cần chăm, không phải so hai con số.
- Hai viên chỉ số vẫn tô màu **riêng** theo từng chỉ số ⇒ bé biết cần cho ăn hay cho chơi.
- Đã đo: `độ no 40% + độ vui 12%` → mood `danger`; `100% + 100%` → `great`.

### 2. `PetAvatar.jsx` — mặt thú vẽ bằng SVG nội tuyến

Một component duy nhất: `<PetAvatar petId="owl|cat|corgi|dragon" moodId="great|good|normal|low|danger" />`.

- **Không dùng emoji, không cần file ảnh** ⇒ không phải quản 20 file, không có rủi ro hỏng ký tự khi ghi file, mà CSS vẫn tô được màu.
- Cấu trúc: 4 bộ thân/màu riêng (cú nâu + mỏ vàng · mèo cam + mũi hồng · corgi + mõm trắng + tai cụp · rồng xanh + sừng vàng) × **mắt và miệng dùng CHUNG cho cả 4 con** ⇒ bé thấy "cùng một cảm xúc" ở mọi thú.
- 5 kiểu mắt: lấp lánh (great) · cong `^ ^` (good) · tròn (normal) · tròn + lông mày xuôi (low) · lông mày xuôi + giọt nước mắt (danger). 5 kiểu miệng: cười há + lưỡi hồng (great) · cười (good) · cong nhẹ (normal) · mếu (low) · mếu + giọt lệ (danger). Thêm má hồng cho good/great.
- Dùng ở 3 chỗ cho đồng bộ: thẻ thú cưng · khung xem trước trong modal ngoại hình · thẻ thú ở Cửa Hàng và modal nhận nuôi (hai chỗ đó luôn dùng mặt `great`).
- Avatar vẫn đổi `filter` + `box-shadow` theo mức và **không** dùng `transform`, vì framer-motion đang điều khiển transform của chính phần tử đó.
- Đã bỏ hẳn CSS emoji cảm xúc (`pet-mood*`) và lớp `pet-stage-emoji`.

### 2b. Cho phép thay bằng ảnh tự vẽ — `client/public/pets/`

- `PetAvatar` **ưu tiên ảnh ngoài**: thử `/pets/<thú>-<cảm xúc>.svg` rồi `.png`; không có file nào thì quay về SVG nội tuyến ở trên ⇒ thả 1 file là đổi đúng 1 hình, các hình còn lại giữ nguyên, giao diện không bao giờ vỡ.
- Tên file: `owl|cat|corgi|dragon` + `great|good|normal|low|danger` ⇒ 20 tên (bảng đầy đủ nằm ở `client/public/pets/README.md`).
- Kỹ thuật: danh sách ảnh **không tồn tại** được nhớ trong một `Set` ở phạm vi module + `useState` chỉ để ép render lại, nhờ vậy không xin lại ảnh 404 mỗi lần render và cũng không nhấp nháy.
- Đã đo: thả thử `cat-great.svg` ⇒ thẻ thú cưng và thẻ Mèo ở Cửa Hàng chuyển sang `<img src="/pets/cat-great.svg">`, còn Cú/Corgi/Rồng vẫn là `<svg>` nội tuyến; xoá file đi thì tự quay về SVG.
- Đã sinh sẵn **20 file template** (`scratch/generate-pet-templates.mjs`, chạy 1 lần là ghi đủ 4 thú × 5 cảm xúc) để người dùng vẽ đè lên: mỗi file chia nhóm `#tai #dau #mat #mui #mieng`, khung `viewBox="0 0 512 512"`. Vì `public/pets/` là ảnh sống của app nên **cố ý không nhét lớp canh lề** vào 20 file đó — canh lề để riêng ở `_huong-dan-canh-le.svg` (tiền tố `_` nên app không nạp). Sau khi người dùng đã vẽ thì **không chạy lại script** (sẽ ghi đè).

### 3. Số đo thật

> ⚠️ **V5.6 (sau đó): cho ăn KHÔNG còn tăng độ vui** — bảng trên chỉ còn đúng với
> nhận nuôi (đặt = 100) và khởi tạo/reset (= 90); độ vui giờ chỉ tăng khi chơi đồ chơi (+20)
> hoặc vuốt ve (+10).

- Migration `0019` đã chạy: cột `last_happy_time` có giá trị `2026-09-23T08:16:50.738Z` và app ghi được (không còn lỗi `PGRST204`).
- Thẻ thú cưng: `aria-label="Thú cưng đang rất hạnh phúc"`, SVG 54×54 trong lòng tròn 72px (chế độ gọn), 62×62 khi đầy đủ.
- Cửa Hàng hiện đủ 4 mặt thú (đo màu lông: cú `#c88c5c` · mèo `#f2a34b` · corgi `#e9a25c` · rồng `#f0c36b`), mỗi thẻ có `img "Thú cưng đang rất hạnh phúc"`.
- Mức `danger` (độ no 40 / độ vui 12): SVG gồm 12 hình, mặt có 2 lông mày xuôi + giọt nước mắt + miệng mếu.
- Sau khi đo, dòng `child_pets` trả về đúng như cũ: `hunger 100 · happiness 100 · exp 70 · level 13 · hộp quà 2 · last_fed_time 2026-09-23T07:48:50.869Z · last_happy_time 2026-09-23T08:16:50.738Z · inventory {yarn 1, apple 7, croissant 5}`.

---

## Cập nhật V5.5 — tiếng kêu theo loài, cỡ & nền avatar, và bù khung vẽ ảnh

### 1. Tiếng kêu đúng theo loài (bỏ "Gâu gâu" cho mọi con)

- `PET_TYPES` thêm `sound`: cú `Cú cú!` · mèo `Meo meo!` · corgi `Gâu gâu!` · rồng `Grừ grừ!`; helper `getPetSound(petType)`.
- `adoptPet`, `playWithPet`, `petPet` ghép tiếng kêu của **đúng loại đang nuôi** vào câu thoại. Trước đây thoại bị viết cứng "Gâu gâu!" nên nuôi mèo mà thú vẫn sủa.
- Đo thật: `getPetSound` trả đúng 4 tiếng kêu; bấm vuốt ve ra thoại `Hi hi, nhột quá đi!...` (không còn "Gâu gâu").

### 2. Cỡ và nền lòng tròn avatar

- Ảnh thú do người dùng vẽ bị nhỏ vì `.pet-avatar-svg` chỉ 62px (bản gọn 54px). Nay: **74px** (gọn **66px**), Cửa Hàng **88px**, khung xem trước modal **58px**, thẻ nhận nuôi **58px**.
- Nền lòng tròn đổi **theo từng con** (nền vàng cũ trùng màu lông mèo nên con thú bị chìm):
  cú = xanh da trời · mèo = xanh mint · corgi = tím lavender · rồng = cam đào.
  Chỉ đổi `background`; viền + đổ bóng vẫn theo mức cảm xúc.

### 3. Bù khung vẽ của ảnh (quan trọng)

Bộ ảnh người dùng vẽ **không đều**: cú chiếm 55% khung, mèo 88%, và tất cả **lệch lên trên**
17–46 đơn vị. Bù bằng `ART_BOX` + `artFit()` trong `PetAvatar.jsx`: đưa **chiều cao** về 400/512 khung rồi dịch tâm về giữa, viết dưới dạng `transform: translate(%,%) scale(x)`
(đơn vị `%` nên không phải biết kích thước hiển thị). **Đã đo**: bốn con ra cùng cỡ ~69px.

🔴 **Phải căn theo CHIỀU CAO, không phải cạnh dài nhất.** Bản đầu tôi lấy `max(w,h) / 400`;
vì Mèo rộng 452 (râu + má) còn Cú chỉ 280 nên Mèo bị thu nhỏ 0.885 lần (chỉ cao 47px) còn Cú
được phóng 1.365 lần (cao 69px) ⇒ người dùng thấy "trong file 4 con bằng nhau mà vào app Mèo nhỏ hơn".
Đổi sang chiều cao: cả bốn con cao 69px. Đánh đổi: khung Mèo vượt 601 > 512 nên **râu bị cắt ~44 đơn vị mỗi bên** (≈7px khi hiện ở 88px, gần như không thấy).
✅ **Người dùng đã chốt (2026-09-23): giữ cách này, chấp nhận mất râu** để bốn con đều nhau — không đổi về `max(w,h)` nữa.
⚠️ Nếu người dùng vẽ lại với khung khác thì phải đo lại `getBBox()` và cập nhật 4 dòng `ART_BOX`.
