import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ======================================================
// 1. 請貼上你的 Firebase 專案設定 (Realtime Database)
// ======================================================
const firebaseConfig = {
  apiKey: "你的_API_KEY",
  authDomain: "你的專案.firebaseapp.com",
  databaseURL: "https://你的專案-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "你的專案_ID",
  storageBucket: "你的專案.appspot.com",
  messagingSenderId: "你的_SENDER_ID",
  appId: "你的_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const DATA_REF = ref(db, "teachingSiteData");

// ======================================================
// 2. 預設資料（首次載入若 Firebase 為空會自動使用這份）
// ======================================================
const DEFAULT_DATA = {
  hero: {
    kicker: "I dreamed, so they can dream further.",
    titleOutline: "Jace's",
    titleSolid: "Teaching Lab",
    subtitle: "我找到了我存在的意義，我也想去幫他們找到他們自己生命中的自己。",
    bgImage: "images/hero-bg.jpg"
  },
  about: {
    name: "Jason",
    role: "國中英語教師",
    desc: "一個大概從國中就開始有志想當英文老師的水瓶座怪胎。單純讓別人的生命能因為我而變得更好是一件很屌的事情。現在當上了英文老師了，依然覺得很屌。也樂於分享我在教學現場的親身經歷。雖然分享的東西不一定很厲害，但，我就是想分享。之類的。",
    tags: ["# 教學網頁設計", "# 外師協同教學", "# 實用英語活動", "# 創意跨領域課程"],
    avatar: "images/avatar.jpg",
    stats: [
      { num: "4", label: "核心主題區塊" },
      { num: "20+", label: "自製教材與表單" },
      { num: "10+", label: "互動式教學網頁" }
    ]
  },
  journeys: [
    {
      id: "j1",
      badge: "WINTER CAMP",
      theme: "pink",
      meta: "2026 // 跨領域冬假營隊",
      title: "甜點製作 X 英語",
      text: "利用學生喜歡動手做跟吃甜食的特性，把英語融入課程中。想等等去家政教室做甜點嗎？可以！但是食譜是全英語，而且老師等等不會跟你講如何製作，所以第一節課需要先把單字的意思記下來！！",
      image: "images/journey-1.jpg",
      link: "#"
    },
    {
      id: "j2",
      badge: "POP MUSIC",
      theme: "cyan",
      meta: "2026 // 假日班進階英文",
      title: "流行歌詞 X 英語",
      text: "讓學生在事先建立好的 Spotify 歌單中挑歌，先觀賞 MV 勾起動機，再以組為單位進行歌詞翻譯。過程中除了老師事先提供的生難字詞表，不得使用任何線上翻譯功能，最後用 Canva 做成中英歌詞簡報，旨為訓練學生文意理解及語文素養。",
      image: "images/journey-2.jpg",
      link: "#"
    },
    {
      id: "j3",
      badge: "CO-TEACHING",
      theme: "green",
      meta: "2026 // 中外師協同課程",
      title: "狼人殺 X 英語",
      text: "當紅遊戲狼人殺也可以拿來上課！想玩狼人殺？可以，但必須先學會 witch、wolf、guard、protect 等單字，因為這些單字不僅等等全英狼人殺會用到，也是會考 2000 單中的單字！",
      image: "images/journey-3.jpg",
      link: "#"
    }
  ],
  materials: [
    {
      id: "m1",
      category: "handout",
      catLabel: "文法 / 單字講義",
      badge: "BESTSELLER",
      theme: "cyan",
      wide: true,
      title: "國中主題分類單字與句型手冊",
      text: "依生活主題與詞性整理，搭配精選例句與隨堂練習。",
      image: "images/mat-1.jpg",
      link: "#"
    },
    {
      id: "m2",
      category: "form",
      catLabel: "Google 表單",
      badge: "NEW",
      theme: "pink",
      wide: false,
      title: "段考複習自動批改表單",
      text: "附即時回饋與錯題解析。",
      image: "images/mat-2.jpg",
      link: "#"
    },
    {
      id: "m3",
      category: "worksheet",
      catLabel: "學習單",
      badge: "POPULAR",
      theme: "green",
      wide: false,
      title: "節慶主題任務學習單",
      text: "適用國中各年級的圖文任務。",
      image: "images/mat-3.jpg",
      link: "#"
    }
  ],
  webapps: [
    {
      id: "w1",
      title: "馬纓丹Online - 學生端",
      tags: ["#2000單主題全分類", "#各式單字練習模式", "#文法星系", "#會考歷屆整理"],
      text: "主要是幫助國二下至國三的學生總複習時可以使用的練習平台。單字部分可以選擇個人適合的練習模式；文法也可透過歷屆整理練習，主頁甚至能看到自己的學習進度，量身訂做自己的學習步調。",
      url: "https://thegoddessofeclipse.github.io/LantanaEnglishLearningCenter/",
      images: ["images/app-1.jpg", "images/app-1-2.jpg", "images/app-1-3.jpg", "images/app-1-4.jpg"]
    },
    {
      id: "w2",
      title: "馬纓丹Online - 教師端",
      tags: ["#線上考試派發檢討", "#各模式控制", "#監考系統", "#通知系統", "#學習活動監督"],
      text: "給老師用的網站，算是馬纓丹Online的後台，可以派發不同種類的考試，並進行線上改題、檢討等。也可以開啟或關閉各個遊戲的進出，甚至強制發通知訊息至前端網頁，提醒學生該下線了等。",
      url: "https://thegoddessofeclipse.github.io/LantanaEnglishLearningCenterForTEACHER/",
      images: ["images/app-2.jpg", "images/app-2-2.jpg", "images/app-2-3.jpg", "images/app-2-4.jpg"]
    },
    {
      id: "w3",
      title: "The Goddesses of Eclipse",
      tags: ["#塔羅牌", "#AI構圖", "#獨創系統", "#全英語算命", "#互動式網頁"],
      text: "這是我用 Gemini 設計的全英線上算命網站，裡面 48 張牌每張都是與 AI 花上許多時間來回構建而成，融合了我喜歡的美漫元素。",
      url: "https://thegoddessofeclipse.github.io/goddesses-of-eclipse/",
      images: ["images/app-3.jpg", "images/app-3-2.jpg", "images/app-3-3.jpg", "images/app-3-4.jpg"]
    },
    {
      id: "w4",
      title: "Cyber Flash",
      tags: ["#客製化線上單字卡", "#AI查詢助手", "#系統化反覆練習", "#不會練到會"],
      text: "這是我準備教甄時製作的網站。當初狂刷題目，看到一大堆沒看過的地獄級英文單字，連我外國的捧油都直呼困難。我就做了這個類似 Quizlet，但是我個人覺得更客製化、更好用的線上單字卡系統。",
      url: "https://thegoddessofeclipse.github.io/cyber-flash/",
      images: ["images/app-4.jpg", "images/app-4-2.jpg", "images/app-4-3.jpg", "images/app-4-4.jpg"]
    },
    {
      id: "w5",
      title: "線上點名系統",
      tags: ["#前後端光速連線", "#線上請假", "#線上座位表", "#多重課程應變處理"],
      text: "每次點名時，要嘛請學生點，結果點得亂七八糟；要嘛我點，結果學生沒來其實是出現在其他處室的課程（像是校隊、代表隊、營隊什麼的），導致點名非常紊亂。加上假日班、晚自習跟段考出席回報整天在 LINE 總群傳個不停，覺得這些無意義又低效率的來回 NEED TO BE DEALT WITH，所以就有了現在這個網站。",
      url: "https://thegoddessofeclipse.github.io/school-attendance/",
      images: ["images/app-5.jpg", "images/app-5-2.jpg", "images/app-5-3.jpg", "images/app-5-4.jpg"]
    }
  ]
};

let siteData = structuredClone(DEFAULT_DATA);
let isEditMode = false;
let currentFilter = "all";

// ======================================================
// 3. 工具函式：Toast 提示 & 圖片自動壓縮轉 Base64
// ======================================================
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

// 將上傳圖片壓縮至最寬 960px、JPEG 0.78 品質，直接安全存入 Firebase RTDB
function compressImage(file, maxWidth = 960, quality = 0.78) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// 同步至 Firebase
async function saveToFirebase() {
  try {
    await set(DATA_REF, siteData);
    showToast("✓ 已儲存並同步至 Firebase！");
  } catch (err) {
    console.error("Firebase 寫入失敗：", err);
    showToast("⚠ 儲存失敗，請檢查 Firebase 設定或規則");
  }
}

// 載入 Firebase 資料
async function loadFromFirebase() {
  try {
    const snap = await get(DATA_REF);
    if (snap.exists()) {
      siteData = { ...structuredClone(DEFAULT_DATA), ...snap.val() };
    }
  } catch (err) {
    console.warn("尚未連線 Firebase 或規則未開，先使用本機預設資料：", err);
  }
  renderAll();
}

// ======================================================
// 4. 畫面渲染邏輯
// ======================================================
function renderAll() {
  renderHero();
  renderAbout();
  renderJourneys();
  renderMaterials();
  renderWebApps();
  attachImageFallback();
}

function renderHero() {
  const h = siteData.hero;
  document.querySelector(".hero-kicker").textContent = h.kicker;
  document.querySelector(".neon-outline").textContent = h.titleOutline;
  document.querySelector(".neon-solid").textContent = h.titleSolid;
  document.querySelector(".hero-subtitle").textContent = h.subtitle;
  const bgImg = document.querySelector(".hero-bg-slot img");
  if (bgImg && h.bgImage) {
    bgImg.src = h.bgImage;
    bgImg.classList.remove("img-hidden");
  }
}

function renderAbout() {
  const a = siteData.about;
  document.querySelector(".about-name").innerHTML = `${a.name} <span class="role-badge">${a.role}</span>`;
  document.querySelector(".about-desc").textContent = a.desc;
  document.querySelector(".skill-tags").innerHTML = (a.tags || [])
    .map((t) => `<span>${t}</span>`)
    .join("");
  const avatarImg = document.querySelector(".about-photo-frame img");
  if (avatarImg && a.avatar) {
    avatarImg.src = a.avatar;
    avatarImg.classList.remove("img-hidden");
  }
  if (a.stats && a.stats.length) {
    document.querySelector(".stats-row").innerHTML = a.stats
      .map((s) => `<div class="stat-box"><span class="stat-num">${s.num}</span><span class="stat-label">${s.label}</span></div>`)
      .join("");
  }
}

function renderJourneys() {
  const grid = document.getElementById("journeyGrid");
  if (!grid) return;
  const list = siteData.journeys || [];

  grid.innerHTML = list.map((item, idx) => `
    <a href="${item.link || '#'}" ${item.link && item.link !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''} class="cyber-card card-${item.theme || 'pink'}">
      <div class="card-admin-tools">
        <button type="button" class="card-tool-btn btn-edit-card" data-edit="journey" data-index="${idx}">✎ 編輯</button>
        <button type="button" class="card-tool-btn btn-del-card" data-del="journey" data-index="${idx}">🗑</button>
      </div>
      <div class="card-media img-slot ratio-16-9" data-label="點擊編輯上傳圖片">
        <img src="${item.image || ''}" alt="${item.title}" />
        ${item.badge ? `<span class="card-badge badge-${item.theme || 'pink'}">${item.badge}</span>` : ''}
      </div>
      <div class="card-body">
        <span class="card-meta">${item.meta || ''}</span>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-text">${item.text}</p>
        <span class="card-link">READ MORE →</span>
      </div>
    </a>
  `).join("");
}

function renderMaterials() {
  const grid = document.getElementById("materialsGrid");
  if (!grid) return;
  const list = siteData.materials || [];

  grid.innerHTML = list.map((item, idx) => {
    const hidden = currentFilter !== "all" && item.category !== currentFilter ? "hidden-card" : "";
    return `
      <a href="${item.link || '#'}" ${item.link && item.link !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''} class="bento-card ${item.wide ? 'span-2' : ''} card-${item.theme || 'cyan'} ${hidden}" data-category="${item.category}">
        <div class="card-admin-tools">
          <button type="button" class="card-tool-btn btn-edit-card" data-edit="material" data-index="${idx}">✎ 編輯</button>
          <button type="button" class="card-tool-btn btn-del-card" data-del="material" data-index="${idx}">🗑</button>
        </div>
        <div class="card-media img-slot" data-label="點擊編輯上傳圖片">
          <img src="${item.image || ''}" alt="${item.title}" />
          ${item.badge ? `<span class="card-badge badge-${item.theme || 'cyan'}">${item.badge}</span>` : ''}
        </div>
        <div class="bento-overlay">
          <span class="bento-cat">${item.catLabel || ''}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      </a>
    `;
  }).join("");
}

function renderWebApps() {
  const grid = document.getElementById("webappsGrid");
  if (!grid) return;
  const list = siteData.webapps || [];

  grid.innerHTML = list.map((item, idx) => {
    const imgs = (item.images || []).filter(Boolean);
    const slidesHtml = imgs.map((src, i) => `<img src="${src}" class="slide" alt="${item.title} ${i + 1}" />`).join("");
    // 複製一份接在後面做無縫跑馬燈
    const trackContent = imgs.length > 1 ? slidesHtml + slidesHtml : slidesHtml;

    return `
      <a href="${item.url || '#'}" target="_blank" rel="noopener noreferrer" class="app-card">
        <div class="card-admin-tools">
          <button type="button" class="card-tool-btn btn-edit-card" data-edit="webapp" data-index="${idx}">✎ 編輯</button>
          <button type="button" class="card-tool-btn btn-del-card" data-del="webapp" data-index="${idx}">🗑</button>
        </div>
        <div class="app-preview app-slider img-slot ratio-16-9" data-label="點擊編輯上傳截圖">
          <div class="slider-track" style="animation-delay: -${idx * 4.5}s; width: ${Math.max(1, imgs.length) * 200}%;">
            ${trackContent}
          </div>
          <div class="app-status"><span class="live-dot"></span> LIVE WEB APP</div>
        </div>
        <div class="app-info">
          <div class="app-tags">
            ${(item.tags || []).map((t) => `<span>${t}</span>`).join("")}
          </div>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
          <div class="app-footer">
            <span class="launch-btn">LAUNCH APP ↗</span>
          </div>
        </div>
      </a>
    `;
  }).join("");
}

// 圖片載入失敗自動嘗試 .png / .webp，若皆無則隱藏避免破圖
function attachImageFallback() {
  document.querySelectorAll(".img-slot img").forEach((img) => {
    const src = img.getAttribute("src") || "";
    if (!src) {
      img.classList.add("img-hidden");
      return;
    }
    if (src.startsWith("data:")) return; // Base64 圖片不需轉檔名

    img.onerror = () => {
      const exts = [".png", ".webp"];
      const step = Number(img.dataset.retryStep || 0);
      if (step < exts.length && /\.\w+$/.test(src)) {
        img.dataset.retryStep = step + 1;
        img.src = src.replace(/\.\w+$/, exts[step]);
      } else {
        img.classList.add("img-hidden");
      }
    };
  });
}

// ======================================================
// 5. 編輯模式：密碼解鎖與新增按鈕注入
// ======================================================
function injectAddButtons() {
  const sections = [
    { sel: "#journey .section-title", type: "journey", label: "+ 新增歷程" },
    { sel: "#materials .section-title", type: "material", label: "+ 新增教材" },
    { sel: "#webapps .section-title", type: "webapp", label: "+ 新增網頁" }
  ];

  sections.forEach(({ sel, type, label }) => {
    const titleEl = document.querySelector(sel);
    if (!titleEl || titleEl.querySelector(".admin-btn-add")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "admin-btn-add";
    btn.textContent = label;
    btn.addEventListener("click", () => openEditor(type, -1));
    titleEl.appendChild(btn);
  });
}

// 雙擊版權宣告開啟密碼視窗
const copyrightEl = document.getElementById("copyrightTrigger");
const passwordModal = document.getElementById("passwordModal");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("adminPasswordInput");
const passwordError = document.getElementById("passwordError");

if (copyrightEl) {
  copyrightEl.addEventListener("dblclick", () => {
    if (isEditMode) {
      showToast("目前已經在編輯模式中囉！");
      return;
    }
    passwordInput.value = "";
    passwordError.textContent = "";
    passwordModal.classList.add("open");
    setTimeout(() => passwordInput.focus(), 100);
  });
}

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (passwordInput.value === "Flyingrabbit") {
    isEditMode = true;
    document.body.classList.add("edit-mode");
    passwordModal.classList.remove("open");
    showToast("⚡ 已進入編輯模式！");
  } else {
    passwordError.textContent = "密碼錯誤，存取遭到拒絕。";
    passwordInput.select();
  }
});

document.getElementById("exitEditBtn").addEventListener("click", () => {
  isEditMode = false;
  document.body.classList.remove("edit-mode");
  showToast("已退出編輯模式");
});

// 關閉彈窗共用事件
document.querySelectorAll("[data-close-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    passwordModal.classList.remove("open");
    document.getElementById("editorModal").classList.remove("open");
  });
});

// ======================================================
// 6. 動態編輯表單 & 圖片上傳介面
// ======================================================
const editorModal = document.getElementById("editorModal");
const editorTitle = document.getElementById("editorModalTitle");
const editorFields = document.getElementById("editorFields");
const editorForm = document.getElementById("editorForm");
let currentEditTarget = { type: null, index: -1 };

// 建立單一圖片上傳欄位 HTML
function imageFieldHtml(name, label, value = "") {
  return `
    <div class="field-group">
      <label>${label}</label>
      <div class="img-upload-box">
        <img src="${value}" class="img-upload-preview" id="preview_${name}" onerror="this.style.opacity=0.2" />
        <div class="img-upload-controls">
          <label class="upload-file-label">
            ↑ 選擇圖片上傳（自動壓縮）
            <input type="file" accept="image/*" hidden data-upload-target="${name}" />
          </label>
          <input type="text" class="cyber-input" name="${name}" id="input_${name}" value="${value}" placeholder="或直接貼上圖片網址 / images/xxx.jpg" />
          <span class="upload-status" id="status_${name}"></span>
        </div>
      </div>
    </div>
  `;
}

function openEditor(type, index) {
  currentEditTarget = { type, index };
  let html = "";

  if (type === "hero") {
    editorTitle.textContent = "編輯首頁主視覺 (Hero)";
    const h = siteData.hero;
    html = `
      <div class="field-group"><label>頂部綠色標語</label><input class="cyber-input" name="kicker" value="${h.kicker}" /></div>
      <div class="field-group"><label>粉紅框主標</label><input class="cyber-input" name="titleOutline" value="${h.titleOutline}" /></div>
      <div class="field-group"><label>白底藍光主標</label><input class="cyber-input" name="titleSolid" value="${h.titleSolid}" /></div>
      <div class="field-group"><label>中文引言</label><textarea class="cyber-textarea" name="subtitle">${h.subtitle}</textarea></div>
      ${imageFieldHtml("bgImage", "首頁背景圖", h.bgImage)}
    `;
  } else if (type === "about") {
    editorTitle.textContent = "編輯自我介紹 (About Me)";
    const a = siteData.about;
    html = `
      <div class="field-group"><label>名稱</label><input class="cyber-input" name="name" value="${a.name}" /></div>
      <div class="field-group"><label>頭銜徽章</label><input class="cyber-input" name="role" value="${a.role}" /></div>
      <div class="field-group"><label>自我介紹文字</label><textarea class="cyber-textarea" name="desc">${a.desc}</textarea></div>
      <div class="field-group"><label>專長標籤（用逗號分隔）</label><input class="cyber-input" name="tags" value="${(a.tags || []).join(', ')}" /></div>
      ${imageFieldHtml("avatar", "個人形象照", a.avatar)}
    `;
  } else if (type === "journey") {
    const isNew = index === -1;
    editorTitle.textContent = isNew ? "新增教學歷程" : "編輯教學歷程";
    const item = isNew ? { badge: "HIGHLIGHT", theme: "pink", meta: "2026 // 主題課程", title: "", text: "", image: "", link: "#" } : siteData.journeys[index];
    html = `
      <div class="field-group"><label>標題</label><input class="cyber-input" name="title" value="${item.title}" required /></div>
      <div class="field-group"><label>日期與副標（例：2026 // 跨領域營隊）</label><input class="cyber-input" name="meta" value="${item.meta}" /></div>
      <div class="field-group"><label>左上角英文徽章</label><input class="cyber-input" name="badge" value="${item.badge}" /></div>
      <div class="field-group"><label>卡片霓虹色系</label>
        <select class="cyber-select" name="theme">
          <option value="pink" ${item.theme === "pink" ? "selected" : ""}>桃紅 (Pink)</option>
          <option value="cyan" ${item.theme === "cyan" ? "selected" : ""}>電光青 (Cyan)</option>
          <option value="green" ${item.theme === "green" ? "selected" : ""}>賽博綠 (Green)</option>
        </select>
      </div>
      <div class="field-group"><label>內容簡介</label><textarea class="cyber-textarea" name="text" required>${item.text}</textarea></div>
      <div class="field-group"><label>點進去後的連結（選填）</label><input class="cyber-input" name="link" value="${item.link || '#'}" /></div>
      ${imageFieldHtml("image", "封面圖片", item.image)}
    `;
  } else if (type === "material") {
    const isNew = index === -1;
    editorTitle.textContent = isNew ? "新增自製教材 / 表單" : "編輯自製教材 / 表單";
    const item = isNew ? { category: "worksheet", catLabel: "學習單", badge: "NEW", theme: "cyan", wide: false, title: "", text: "", image: "", link: "#" } : siteData.materials[index];
    html = `
      <div class="field-group"><label>教材標題</label><input class="cyber-input" name="title" value="${item.title}" required /></div>
      <div class="field-group"><label>分類</label>
        <select class="cyber-select" name="category">
          <option value="worksheet" ${item.category === "worksheet" ? "selected" : ""}>學習單</option>
          <option value="form" ${item.category === "form" ? "selected" : ""}>Google 表單</option>
          <option value="handout" ${item.category === "handout" ? "selected" : ""}>文法/單字講義</option>
        </select>
      </div>
      <div class="field-group"><label>左上角徽章（留空則不顯示）</label><input class="cyber-input" name="badge" value="${item.badge || ''}" /></div>
      <div class="field-group"><label>卡片寬度</label>
        <select class="cyber-select" name="wide">
          <option value="false" ${!item.wide ? "selected" : ""}>一般單格</option>
          <option value="true" ${item.wide ? "selected" : ""}>雙倍寬版大卡</option>
        </select>
      </div>
      <div class="field-group"><label>簡短說明</label><textarea class="cyber-textarea" name="text" required>${item.text}</textarea></div>
      <div class="field-group"><label>表單 / 雲端下載連結</label><input class="cyber-input" name="link" value="${item.link || '#'}" /></div>
      ${imageFieldHtml("image", "教材預覽圖", item.image)}
    `;
  } else if (type === "webapp") {
    const isNew = index === -1;
    editorTitle.textContent = isNew ? "新增自製教學網頁" : "編輯自製教學網頁";
    const item = isNew ? { title: "", tags: ["#互動網頁"], text: "", url: "https://", images: ["", "", "", ""] } : siteData.webapps[index];
    const imgs = item.images || ["", "", "", ""];
    html = `
      <div class="field-group"><label>網站名稱</label><input class="cyber-input" name="title" value="${item.title}" required /></div>
      <div class="field-group"><label>網站連結 (URL)</label><input class="cyber-input" name="url" value="${item.url}" required /></div>
      <div class="field-group"><label>特色標籤（用逗號分隔）</label><input class="cyber-input" name="tags" value="${(item.tags || []).join(', ')}" /></div>
      <div class="field-group"><label>網站介紹</label><textarea class="cyber-textarea" name="text" required>${item.text}</textarea></div>
      ${imageFieldHtml("img0", "輪播截圖 1", imgs[0] || "")}
      ${imageFieldHtml("img1", "輪播截圖 2", imgs[1] || "")}
      ${imageFieldHtml("img2", "輪播截圖 3", imgs[2] || "")}
      ${imageFieldHtml("img3", "輪播截圖 4", imgs[3] || "")}
    `;
  }

  editorFields.innerHTML = html;
  bindUploadInputs();
  editorModal.classList.add("open");
}

// 綁定彈窗內所有圖片上傳按鈕
function bindUploadInputs() {
  editorFields.querySelectorAll("[data-upload-target]").forEach((fileInput) => {
    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const target = fileInput.dataset.uploadTarget;
      const statusEl = document.getElementById(`status_${target}`);
      statusEl.textContent = "壓縮處理中...";

      try {
        const base64 = await compressImage(file);
        const kb = Math.round((base64.length * 3) / 4 / 1024);
        document.getElementById(`input_${target}`).value = base64;
        const preview = document.getElementById(`preview_${target}`);
        preview.src = base64;
        preview.style.opacity = 1;
        statusEl.textContent = `✓ 已壓縮完成 (${kb} KB)`;
      } catch (err) {
        statusEl.textContent = "⚠ 圖片讀取失敗";
      }
    });
  });
}

// 儲存表單並寫入 Firebase
editorForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(editorForm);
  const { type, index } = currentEditTarget;

  if (type === "hero") {
    siteData.hero = {
      kicker: fd.get("kicker"),
      titleOutline: fd.get("titleOutline"),
      titleSolid: fd.get("titleSolid"),
      subtitle: fd.get("subtitle"),
      bgImage: fd.get("bgImage")
    };
  } else if (type === "about") {
    siteData.about = {
      ...siteData.about,
      name: fd.get("name"),
      role: fd.get("role"),
      desc: fd.get("desc"),
      tags: fd.get("tags").split(",").map((s) => s.trim()).filter(Boolean),
      avatar: fd.get("avatar")
    };
  } else if (type === "journey") {
    const newItem = {
      id: index === -1 ? "j_" + Date.now() : siteData.journeys[index].id,
      title: fd.get("title"),
      meta: fd.get("meta"),
      badge: fd.get("badge"),
      theme: fd.get("theme"),
      text: fd.get("text"),
      link: fd.get("link") || "#",
      image: fd.get("image")
    };
    if (index === -1) siteData.journeys.push(newItem);
    else siteData.journeys[index] = newItem;
  } else if (type === "material") {
    const catMap = { worksheet: "學習單", form: "Google 表單", handout: "文法 / 單字講義" };
    const cat = fd.get("category");
    const newItem = {
      id: index === -1 ? "m_" + Date.now() : siteData.materials[index].id,
      title: fd.get("title"),
      category: cat,
      catLabel: catMap[cat],
      badge: fd.get("badge"),
      theme: cat === "form" ? "pink" : cat === "worksheet" ? "green" : "cyan",
      wide: fd.get("wide") === "true",
      text: fd.get("text"),
      link: fd.get("link") || "#",
      image: fd.get("image")
    };
    if (index === -1) siteData.materials.push(newItem);
    else siteData.materials[index] = newItem;
  } else if (type === "webapp") {
    const newItem = {
      id: index === -1 ? "w_" + Date.now() : siteData.webapps[index].id,
      title: fd.get("title"),
      url: fd.get("url"),
      tags: fd.get("tags").split(",").map((s) => s.trim()).filter(Boolean),
      text: fd.get("text"),
      images: [fd.get("img0"), fd.get("img1"), fd.get("img2"), fd.get("img3")].filter(Boolean)
    };
    if (index === -1) siteData.webapps.push(newItem);
    else siteData.webapps[index] = newItem;
  }

  editorModal.classList.remove("open");
  renderAll();
  await saveToFirebase();
});

// ======================================================
// 7. 全域點擊事件代理（編輯、刪除、教材篩選）
// ======================================================
document.getElementById("editHeroBtn").addEventListener("click", () => openEditor("hero", 0));
document.getElementById("editAboutBtn").addEventListener("click", () => openEditor("about", 0));

document.addEventListener("click", async (e) => {
  // 編輯卡片按鈕
  const editBtn = e.target.closest("[data-edit]");
  if (editBtn) {
    e.preventDefault();
    e.stopPropagation();
    openEditor(editBtn.dataset.edit, Number(editBtn.dataset.index));
    return;
  }

  // 刪除卡片按鈕
  const delBtn = e.target.closest("[data-del]");
  if (delBtn) {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("確定要刪除這張卡片嗎？刪除後會同步更新至 Firebase。")) return;
    const type = delBtn.dataset.del;
    const idx = Number(delBtn.dataset.index);
    if (type === "journey") siteData.journeys.splice(idx, 1);
    if (type === "material") siteData.materials.splice(idx, 1);
    if (type === "webapp") siteData.webapps.splice(idx, 1);
    renderAll();
    await saveToFirebase();
    return;
  }

  // 編輯模式下點擊卡片本體不跳轉，避免誤觸外連
  if (isEditMode && e.target.closest(".cyber-card, .bento-card, .app-card")) {
    e.preventDefault();
  }
});

// 重新綁定教材分類篩選（配合動態渲染）
document.querySelectorAll("#materialFilters .filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#materialFilters .filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderMaterials();
    attachImageFallback();
  });
});

// 啟動初始化
injectAddButtons();
loadFromFirebase();