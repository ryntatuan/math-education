// Stub tối thiểu cho môi trường Node — Node 20 không có `localStorage` lẫn `WebSocket`,
// mà `contentSource.js`/`supabaseClient.js` đọc chúng ngay khi module được nạp.
// Cố ý KHÔNG thêm jsdom (nặng, thừa cho hàm thuần).
if (typeof globalThis.localStorage === "undefined") {
  const store = new Map();
  globalThis.localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    clear: () => store.clear(),
  };
}

// `createClient` của Supabase đòi có WebSocket (realtime). Test chỉ kiểm hàm thuần nên
// một lớp rỗng là đủ — không hề mở kết nối nào.
if (typeof globalThis.WebSocket === "undefined") {
  globalThis.WebSocket = class WebSocketRong {
    constructor() {}
    close() {}
    send() {}
    addEventListener() {}
    removeEventListener() {}
  };
}
