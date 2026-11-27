import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ======================================================
// 1. Firebase 專案設定與初始化
// ======================================================
const firebaseConfig = {
  apiKey: "AIzaSyAp9o7K0rBQgwSMg58e4C1FXy2UZjfCSv4",
  authDomain: "jace-s-teaching-lab.firebaseapp.com",
  databaseURL: "https://jace-s-teaching-lab-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jace-s-teaching-lab",
  storageBucket: "jace-s-teaching-lab.firebasestorage.app",
  messagingSenderId: "222352360644",
  appId: "1:222352360644:web:693d06971123e5afbcf591"
};

let db = null;
let DATA_REF = null;
try {
  const app = initializeApp(firebaseConfig);
  db = getDatabase(app);
  DATA_REF = ref(db, "teachingSiteData");
} catch (err) {
  console.warn("Firebase 初始化失敗，暫以本機預設資料運作。");
}

// ======================================================
// 2. 12 色 Cyberpunk 霓虹色盤、預設資料與全域狀態
// ======================================================
const CYBER_PALETTE = [
  { name: "賽博桃紅", hex: "#ff007f" },
  { name: "電光青藍", hex: "#00f0ff" },
  { name: "矩陣翠綠", hex: "#00ff88" },
  { name: "霓虹秘紫", hex: "#9d4edd" },
  { name: "義體電黃", hex: "#ffe600" },
  { name: "雷射猩紅", hex: "#ff2a2a" },
  { name: "反應爐橘", hex: "#ff6b00" },
  { name: "深網湛藍", hex: "#0066ff" },
  { name: "全息洋紅", hex: "#ff00ff" },
  { name: "酸液萊姆", hex: "#b8ff00" },
  { name: "冰晶薄荷", hex: "#00ffcc" },
  { name: "蒸氣粉櫻", hex: "#ff85c0" }
];

const DEFAULT_APP_COLORS = ["#ff6b00", "#00f0ff", "#9d4edd", "#ff007f", "#00ff88"];
const THEME_TO_HEX = { pink: "#ff007f", cyan: "#00f0ff", green: "#00ff88" };

const DEFAULT_DATA = {
  elementColors: {
    heroOutline: "#ff007f",
    avatarBorder: "#ff007f",
    roleBadge: "#00f0ff",
    statNum: "#00ff88"
  },
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
    avatar: "images/avatar.jpg"
  },
  materialCategories: [
    { id: "worksheet", label: "學習單", theme: "green" },
    { id: "form", label: "Google 表單", theme: "pink" },
    { id: "handout", label: "文法 / 單字講義", theme: "cyan" }
  ],
  journeys: [
    {
      id: "j1",
      badge: "WINTER CAMP",
      theme: "pink",
      customColor: "#ff007f",
      meta: "2026 // 跨領域冬假營隊",
      title: "甜點製作 X 英語",
      text: "利用學生喜歡動手做跟吃甜食的特性，把英語融入課程中。想等等去家政教室做甜點嗎？可以！但是食譜是全英語，而且老師等等不會跟你講如何製作，所以第一節課需要先把單字的意思記下來！！",
      image: "images/journey-1.jpg",
      flow: [
        { name: "暖身與食譜關鍵單字攻略", duration: 25, desc: "發下全英文食譜，學生分組查出動詞（mix, bake, fold）與食材名稱。" },
        { name: "單字通關小測驗", duration: 20, desc: "通過測驗的小組才能領取家政教室入場券與食材。" },
        { name: "家政教室全英實作", duration: 60, desc: "老師不口頭翻譯步驟，學生必須依食譜指示完成甜點。" },
        { name: "成果品嘗與英文分享", duration: 15, desc: "各組用簡單英文形容成品味道並互評。" }
      ],
      reflection: "為了吃到自己做的甜點，平時不太背單字的學生竟然超認真在查食譜動詞，動機拉滿的效果非常驚人！",
      notes: "1. 需事先確認學生是否有堅果、蛋奶等食物過敏。\n2. 烤箱預熱與善後清潔時間要預留充裕。"
    },
    {
      id: "j2",
      badge: "POP MUSIC",
      theme: "cyan",
      customColor: "#00f0ff",
      meta: "2026 // 假日班進階英文",
      title: "流行歌詞 X 英語",
      text: "讓學生在事先建立好的 Spotify 歌單中挑歌，先觀賞 MV 勾起動機，再以組為單位進行歌詞翻譯。過程中除了老師事先提供的生難字詞表，不得使用任何線上翻譯功能，最後用 Canva 做成中英歌詞簡報，旨為訓練學生文意理解及語文素養。",
      image: "images/journey-2.jpg",
      flow: [
        { name: "Spotify 歌單挑歌 & MV 欣賞", duration: 15, desc: "各組從指定歌單挑選一首英文歌並觀看 MV。" },
        { name: "無網路歌詞共譯挑戰", duration: 40, desc: "僅能使用老師提供的生難字詞表，小組討論推敲歌詞意境。" },
        { name: "Canva 中英歌詞簡報製作", duration: 35, desc: "排版設計並標註小組最喜歡的一句金句。" }
      ],
      reflection: "拿掉翻譯軟體後，學生反而開始討論「這句翻成中文怎麼講才順」，真正練到語感與文意理解。",
      notes: "事先過濾歌單歌詞，避開過多不雅字眼；生難字詞表建議附帶詞性與例句。"
    },
    {
      id: "j3",
      badge: "CO-TEACHING",
      theme: "green",
      customColor: "#00ff88",
      meta: "2026 // 中外師協同課程",
      title: "狼人殺 X 英語",
      text: "當紅遊戲狼人殺也可以拿來上課！想玩狼人殺？可以，但必須先學會 witch、wolf、guard、protect 等單字，因為這些單字不僅等等全英狼人殺會用到，也是會考 2000 單中的單字！",
      image: "images/journey-3.jpg",
      flow: [
        { name: "角色單字與句型教學", duration: 15, desc: "教導 witch, wolf, guard, protect 及指控/辯護常用句型。" },
        { name: "外師示範與規則演練", duration: 10, desc: "由外師擔任主持人示範一輪天黑請閉眼指令。" },
        { name: "全英語狼人殺實戰", duration: 20, desc: "學生全程使用英語進行討論與投票。" }
      ],
      reflection: "遊戲張力讓學生自然開口說英文，連平常害羞的同學在被懷疑時都會急著用英文替自己辯護。",
      notes: "建議將討論句型（I think... / I am not...）直接投影在黑板上當鷹架，降低開口門檻。"
    }
  ],
  materials: [
    {
      id: "m1",
      category: "handout",
      badge: "BESTSELLER",
      customColor: "#00f0ff",
      wide: true,
      title: "國中主題分類單字與句型手冊",
      text: "依生活主題與詞性整理，搭配精選例句與隨堂練習。",
      image: "images/mat-1.jpg",
      link: "#"
    },
    {
      id: "m2",
      category: "form",
      badge: "NEW",
      customColor: "#ff007f",
      wide: false,
      title: "段考複習自動批改表單",
      text: "附即時回饋與錯題解析。",
      image: "images/mat-2.jpg",
      link: "#"
    },
    {
      id: "m3",
      category: "worksheet",
      badge: "POPULAR",
      customColor: "#00ff88",
      wide: false,
      title: "節慶主題任務學習單",
      text: "適用國中各年級的圖文任務。",
      image: "images/mat-3.jpg",
      link: "#"
    },
    {
      id: "m4",
      category: "worksheet",
      badge: "",
      customColor: "#ff007f",
      wide: false,
      title: "主題式克漏字與閱讀測驗",
      text: "針對課文重點設計的進階題組。",
      image: "images/mat-4.jpg",
      link: "#"
    },
    {
      id: "m5",
      category: "form",
      badge: "",
      customColor: "#00f0ff",
      wide: false,
      title: "課堂小組互評與回饋表單",
      text: "一鍵彙整全班表現數據。",
      image: "images/mat-5.jpg",
      link: "#"
    }
  ],
  webapps: [
    {
      id: "w1",
      customColor: "#ff6b00",
      title: "馬纓丹Online - 學生端",
      tags: ["#2000單主題全分類", "#各式單字練習模式", "#文法星系", "#會考歷屆整理"],
      text: "主要是幫助國二下至國三的學生總複習時可以使用的練習平台。單字部分可以選擇個人適合的練習模式；文法也可透過歷屆整理練習，主頁甚至能看到自己的學習進度，量身訂做自己的學習步調。",
      url: "https://thegoddessofeclipse.github.io/LantanaEnglishLearningCenter/",
      images: ["images/app-1.jpg", "images/app-1-2.jpg", "images/app-1-3.jpg", "images/app-1-4.jpg"]
    },
    {
      id: "w2",
      customColor: "#00f0ff",
      title: "馬纓丹Online - 教師端",
      tags: ["#線上考試派發檢討", "#各模式控制", "#監考系統", "#通知系統", "#學習活動監督"],
      text: "給老師用的網站，算是馬纓丹Online的後台，可以派發不同種類的考試，並進行線上改題、檢討等。也可以開啟或關閉各個遊戲的進出，甚至強制發通知訊息至前端網頁，提醒學生該下線了等。",
      url: "https://thegoddessofeclipse.github.io/LantanaEnglishLearningCenterForTEACHER/",
      images: ["images/app-2.jpg", "images/app-2-2.jpg", "images/app-2-3.jpg", "images/app-2-4.jpg"]
    },
    {
      id: "w3",
      customColor: "#9d4edd",
      title: "The Goddesses of Eclipse",
      tags: ["#塔羅牌", "#AI構圖", "#獨創系統", "#全英語算命", "#互動式網頁"],
      text: "這是我用 Gemini 設計的全英線上算命網站，裡面 48 張牌每張都是與 AI 花上許多時間來回構建而成，融合了我喜歡的美漫元素。",
      url: "https://thegoddessofeclipse.github.io/goddesses-of-eclipse/",
      images: ["images/app-3.jpg", "images/app-3-2.jpg", "images/app-3-3.jpg", "images/app-3-4.jpg"]
    },
    {
      id: "w4",
      customColor: "#ff007f",
      title: "Cyber Flash",
      tags: ["#客製化線上單字卡", "#AI查詢助手", "#系統化反覆練習", "#不會練到會"],
      text: "這是我準備教甄時製作的網站。當初狂刷題目，看到一大堆沒看過的地獄級英文單字，連我外國的捧油都直呼困難。我就做了這個類似 Quizlet，但是我個人覺得更客製化、更好用的線上單字卡系統。",
      url: "https://thegoddessofeclipse.github.io/cyber-flash/",
      images: ["images/app-4.jpg", "images/app-4-2.jpg", "images/app-4-3.jpg", "images/app-4-4.jpg"]
    },
    {
      id: "w5",
      customColor: "#00ff88",
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
let toastTimer = null;

// ======================================================
// 3. 工具函式：時長、色彩計算、Toast、圖片壓縮、Firebase 同步
// ======================================================
function formatDuration(totalMins) {
  const mins = Number(totalMins) || 0;
  if (mins <= 0) return "尚未設定";
  if (mins < 60) return `${mins} 分鐘`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${mins} 分鐘（${h} 小時）` : `${mins} 分鐘（${h} 小時 ${m} 分）`;
}

function calcFlowTotal(flowList = []) {
  return (flowList || []).reduce((sum, step) => sum + (Number(step.duration) || 0), 0);
}

function hexToRgb(hex) {
  const clean = (hex || "#00f0ff").replace("#", "");
  const num = parseInt(clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function hexToRgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hexToDarkTint(hex, factor, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${Math.round(r * factor + 8)}, ${Math.round(g * factor + 6)}, ${Math.round(b * factor + 14)}, ${alpha})`;
}

function buildWebAppColorStyle(hex) {
  return `
    --card-accent: ${hex};
    --card-border: ${hexToRgba(hex, 0.5)};
    --card-glow: ${hexToRgba(hex, 0.36)};
    --card-tag-bg: ${hexToRgba(hex, 0.14)};
    --card-bg-top: ${hexToDarkTint(hex, 0.22, 0.94)};
    --card-bg-bottom: ${hexToDarkTint(hex, 0.08, 0.98)};
  `;
}

function buildCardColorStyle(hex) {
  return `
    --item-color: ${hex};
    --item-border: ${hexToRgba(hex, 0.45)};
    --item-glow: ${hexToRgba(hex, 0.35)};
  `;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

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
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function saveToFirebase() {
  if (!DATA_REF) {
    showToast("⚠ 尚未設定 Firebase，目前僅在本機畫面更新");
    return;
  }
  try {
    await set(DATA_REF, siteData);
    showToast("✓ 已儲存並同步至 Firebase！");
  } catch (err) {
    console.error("Firebase 寫入失敗：", err);
    showToast("⚠ 儲存失敗，請檢查 Firebase 規則或設定");
  }
}

async function loadFromFirebase() {
  if (DATA_REF) {
    try {
      const snap = await get(DATA_REF);
      if (snap.exists()) {
        const val = snap.val();
        siteData = {
          ...structuredClone(DEFAULT_DATA),
          ...val,
          elementColors: { ...DEFAULT_DATA.elementColors, ...(val.elementColors || {}) },
          materialCategories: val.materialCategories || structuredClone(DEFAULT_DATA.materialCategories)
        };
      }
    } catch (err) {
      console.warn("讀取 Firebase 失敗，使用預設資料：", err);
    }
  }
  renderAll();
}

// ======================================================
// 4. 畫面渲染與詳情頁彈窗
// ======================================================
function renderAll() {
  applyElementColors();
  renderHero();
  renderAbout();
  renderJourneys();
  renderMaterialFilters();
  renderMaterials();
  renderWebApps();
  attachImageFallback();
}

function applyElementColors(colors = siteData.elementColors) {
  const c = { ...DEFAULT_DATA.elementColors, ...(colors || {}) };
  const root = document.documentElement.style;
  root.setProperty("--el-hero-outline", c.heroOutline);
  root.setProperty("--el-avatar-border", c.avatarBorder);
  root.setProperty("--el-role-badge", c.roleBadge);
  root.setProperty("--el-role-badge-bg", hexToRgba(c.roleBadge, 0.14));
  root.setProperty("--el-stat-num", c.statNum);
  root.setProperty("--el-stat-num-glow", hexToRgba(c.statNum, 0.5));
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
  document.querySelector(".skill-tags").innerHTML = (a.tags || []).map((t) => `<span>${t}</span>`).join("");
  const avatarImg = document.querySelector(".about-photo-frame img");
  if (avatarImg && a.avatar) {
    avatarImg.src = a.avatar;
    avatarImg.classList.remove("img-hidden");
  }

  const liveStats = [
    { num: (siteData.journeys || []).length, label: "教學歷程分享" },
    { num: (siteData.materials || []).length, label: "自製教材與表單" },
    { num: (siteData.webapps || []).length, label: "互動式教學網頁" }
  ];

  document.querySelector(".stats-row").innerHTML = liveStats
    .map((s) => `<div class="stat-box"><span class="stat-num">${s.num}</span><span class="stat-label">${s.label}</span></div>`)
    .join("");
}

function renderJourneys() {
  const grid = document.getElementById("journeyGrid");
  if (!grid) return;
  const list = siteData.journeys || [];

  grid.innerHTML = list.map((item, idx) => {
    const hex = item.customColor || THEME_TO_HEX[item.theme] || "#ff007f";
    const totalMins = calcFlowTotal(item.flow);
    return `
      <a href="#journey" class="cyber-card has-custom-color" data-journey-idx="${idx}" data-open-journey="${idx}" style="${buildCardColorStyle(hex)}">
        <div class="card-admin-tools">
          <button type="button" class="card-tool-btn btn-edit-card" data-edit="journey" data-index="${idx}">✎ 編輯</button>
          <button type="button" class="card-tool-btn btn-del-card" data-del="journey" data-index="${idx}">🗑</button>
        </div>
        <div class="card-media img-slot ratio-16-9" data-label="images/journey-${idx + 1}.jpg">
          <img src="${item.image || ''}" alt="${item.title}" />
          ${item.badge ? `<span class="card-badge">${item.badge}</span>` : ''}
        </div>
        <div class="card-body">
          <span class="card-meta">${item.meta || ''}${totalMins > 0 ? ` · ⏱ ${totalMins} 分鐘` : ''}</span>
          <h3 class="card-title">${item.title}</h3>
          <p class="card-text">${item.text}</p>
          <span class="card-link">VIEW DETAILS →</span>
        </div>
      </a>
    `;
  }).join("");
}

// 教學歷程詳情頁彈窗
const journeyDetailModal = document.getElementById("journeyDetailModal");
let activeDetailJourneyIdx = -1;

function openJourneyDetail(idx) {
  const item = (siteData.journeys || [])[idx];
  if (!item) return;
  activeDetailJourneyIdx = idx;

  const hex = item.customColor || THEME_TO_HEX[item.theme] || "#00f0ff";
  const box = journeyDetailModal.querySelector(".journey-detail-box");
  box.style.setProperty("--jd-color", hex);
  box.style.setProperty("--jd-glow", hexToRgba(hex, 0.35));

  document.getElementById("jdMeta").textContent = item.meta || "";
  document.getElementById("jdTitle").textContent = item.title || "";

  const badgeEl = document.getElementById("jdBadge");
  badgeEl.textContent = item.badge || "";
  badgeEl.style.display = item.badge ? "inline-block" : "none";

  const totalMins = calcFlowTotal(item.flow);
  document.getElementById("jdTotalDuration").textContent = formatDuration(totalMins);

  const photoWrap = document.getElementById("jdPhotoWrap");
  const photoEl = document.getElementById("jdPhoto");
  if (item.image) {
    photoEl.src = item.image;
    photoWrap.style.display = "block";
    photoEl.onerror = () => { photoWrap.style.display = "none"; };
  } else {
    photoWrap.style.display = "none";
  }

  const timelineEl = document.getElementById("jdTimeline");
  const flow = item.flow || [];
  if (flow.length) {
    timelineEl.innerHTML = flow.map((step, i) => `
      <div class="flow-step">
        <div class="flow-step-head">
          <span class="flow-step-name">STEP ${i + 1} · ${step.name}</span>
          <span class="flow-step-time">⏱ ${step.duration || 0} 分鐘</span>
        </div>
        ${step.desc ? `<p class="flow-step-desc">${step.desc}</p>` : ""}
      </div>
    `).join("");
  } else {
    timelineEl.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem;">尚未填寫教學流程（請進入編輯模式新增）。</p>`;
  }

  document.getElementById("jdConcept").textContent = item.concept || item.text || "尚未填寫設計理念。";
  document.getElementById("jdReflection").textContent = item.reflection || "尚未填寫教學心得。";
  document.getElementById("jdNotes").textContent = item.notes || "無特別注意事項。";
  const gallerySection = document.getElementById("jdGallerySection");
  const galleryEl = document.getElementById("jdGallery");
  const gallery = (item.gallery || []).filter(Boolean);
  if (gallery.length) {
    galleryEl.innerHTML = gallery
      .map((src, i) => `
        <a href="${src}" target="_blank" rel="noopener noreferrer" class="jd-gallery-item">
          <img src="${src}" alt="${item.title} 活動花絮 ${i + 1}" />
        </a>
      `)
      .join("");
    gallerySection.style.display = "block";
  } else {
    galleryEl.innerHTML = "";
    gallerySection.style.display = "none";
  }
  const quickEditBtn = document.getElementById("jdQuickEditBtn");
  quickEditBtn.style.display = isEditMode ? "inline-block" : "none";

  journeyDetailModal.classList.add("open");
}

document.getElementById("jdQuickEditBtn")?.addEventListener("click", () => {
  journeyDetailModal.classList.remove("open");
  if (activeDetailJourneyIdx >= 0) openEditor("journey", activeDetailJourneyIdx);
});

function renderMaterialFilters() {
  const bar = document.getElementById("materialFilters");
  if (!bar) return;
  const cats = siteData.materialCategories || [];

  if (currentFilter !== "all" && !cats.some((c) => c.id === currentFilter)) {
    currentFilter = "all";
  }

  bar.innerHTML = `
    <button class="filter-btn ${currentFilter === "all" ? "active" : ""}" data-filter="all">ALL 全部</button>
    ${cats.map((c) => `
      <button class="filter-btn ${currentFilter === c.id ? "active" : ""}" data-filter="${c.id}">${c.label}</button>
    `).join("")}
  `;

  bar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      renderMaterialFilters();
      renderMaterials();
      attachImageFallback();
    });
  });
}

function renderMaterials() {
  const grid = document.getElementById("materialsGrid");
  if (!grid) return;
  const list = siteData.materials || [];
  const cats = siteData.materialCategories || [];

  grid.innerHTML = list.map((item, idx) => {
    const catObj = cats.find((c) => c.id === item.category);
    const catLabel = catObj ? catObj.label : (item.catLabel || "未分類");
    const hex = item.customColor || (catObj ? THEME_TO_HEX[catObj.theme] : "#00f0ff") || "#00f0ff";
    const hidden = currentFilter !== "all" && item.category !== currentFilter ? "hidden-card" : "";

    return `
      <a href="${item.link || '#'}" ${item.link && item.link !== '#' ? 'target="_blank" rel="noopener noreferrer"' : 'data-placeholder-link'}
         class="bento-card has-custom-color ${item.wide ? 'span-2' : ''} ${hidden}" data-category="${item.category}" data-material-idx="${idx}" style="${buildCardColorStyle(hex)}">
        <div class="card-admin-tools">
          <button type="button" class="card-tool-btn btn-edit-card" data-edit="material" data-index="${idx}">✎ 編輯</button>
          <button type="button" class="card-tool-btn btn-del-card" data-del="material" data-index="${idx}">🗑</button>
        </div>
        <div class="card-media img-slot" data-label="images/mat-${idx + 1}.jpg">
          <img src="${item.image || ''}" alt="${item.title}" />
          ${item.badge ? `<span class="card-badge">${item.badge}</span>` : ''}
        </div>
        <div class="bento-overlay">
          <span class="bento-cat">${catLabel}</span>
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
    const isMulti = imgs.length > 1;
    const slideWidth = isMulti ? 100 / (imgs.length * 2) : 100;
    const trackWidth = isMulti ? imgs.length * 200 : 100;
    const duration = Math.max(12, imgs.length * 6);
    const hex = item.customColor || DEFAULT_APP_COLORS[idx % DEFAULT_APP_COLORS.length];

    const slidesHtml = imgs
      .map((src, i) => `<img src="${src}" class="slide" style="width: ${slideWidth}%" alt="${item.title} ${i + 1}" />`)
      .join("");
    const trackContent = isMulti ? slidesHtml + slidesHtml : slidesHtml;

    return `
      <a href="${item.url || '#'}" target="_blank" rel="noopener noreferrer"
         class="app-card" data-webapp-idx="${idx}" style="${buildWebAppColorStyle(hex)}">
        <div class="card-admin-tools">
          <button type="button" class="card-tool-btn btn-edit-card" data-edit="webapp" data-index="${idx}">✎ 編輯</button>
          <button type="button" class="card-tool-btn btn-del-card" data-del="webapp" data-index="${idx}">🗑</button>
        </div>
        <div class="app-preview app-slider img-slot ratio-16-9" data-label="images/app-${idx + 1}.jpg">
          <div class="slider-track ${isMulti ? '' : 'static-track'}" style="animation-delay: -${idx * 4.5}s; animation-duration: ${duration}s; width: ${trackWidth}%;">
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

function attachImageFallback() {
  document.querySelectorAll(".img-slot img").forEach((img) => {
    const src = img.getAttribute("src") || "";
    if (!src) {
      img.classList.add("img-hidden");
      return;
    }
    if (src.startsWith("data:")) return;

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
// 5. 編輯模式：密碼解鎖、流程編輯器、分類與色彩編輯
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

    if (type === "material") {
      const catBtn = document.createElement("button");
      catBtn.type = "button";
      catBtn.className = "admin-btn-cat";
      catBtn.textContent = "⚙ 管理分類";
      catBtn.addEventListener("click", () => openEditor("categories", 0));
      titleEl.appendChild(catBtn);
    }
  });
}

const passwordModal = document.getElementById("passwordModal");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("adminPasswordInput");
const passwordError = document.getElementById("passwordError");
const editorModal = document.getElementById("editorModal");
const editorTitle = document.getElementById("editorModalTitle");
const editorFields = document.getElementById("editorFields");
const editorForm = document.getElementById("editorForm");
let currentEditTarget = { type: null, index: -1 };
let dynamicImgCounter = 0;

document.getElementById("copyrightTrigger").addEventListener("dblclick", () => {
  if (isEditMode) {
    showToast("目前已經在編輯模式中囉！");
    return;
  }
  passwordInput.value = "";
  passwordError.textContent = "";
  passwordModal.classList.add("open");
  setTimeout(() => passwordInput.focus(), 100);
});

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

document.querySelectorAll("[data-close-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    passwordModal.classList.remove("open");
    editorModal.classList.remove("open");
    journeyDetailModal.classList.remove("open");
    renderAll();
  });
});

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
          <input type="text" class="cyber-input" name="${name}" id="input_${name}" value="${value}" placeholder="或貼上圖片網址 / images/xxx.jpg" />
          <span class="upload-status" id="status_${name}"></span>
        </div>
      </div>
    </div>
  `;
}

function colorPickerRowHtml(fieldName, label, currentHex, previewTarget = "") {
  const matched = CYBER_PALETTE.find((p) => p.hex.toLowerCase() === (currentHex || "").toLowerCase());
  const swatches = CYBER_PALETTE.map((p) => `
    <button type="button"
      class="color-swatch ${p.hex.toLowerCase() === (currentHex || "").toLowerCase() ? "selected" : ""}"
      style="background:${p.hex}; --swatch-hex:${p.hex};"
      title="${p.name} (${p.hex})"
      data-field="${fieldName}"
      data-hex="${p.hex}"
      data-name="${p.name}"
      data-preview="${previewTarget}">
    </button>
  `).join("");

  return `
    <div class="field-group">
      <div class="color-group-header">
        <label>${label}</label>
        <span class="color-current-name" id="cname_${fieldName}">${matched ? matched.name : currentHex}</span>
      </div>
      <input type="hidden" name="${fieldName}" id="cinput_${fieldName}" value="${currentHex}" />
      <div class="color-swatch-grid">${swatches}</div>
    </div>
  `;
}

function updateFlowTotalPreview() {
  const previewEl = document.getElementById("flowTotalPreviewVal");
  if (!previewEl) return;
  const inputs = document.querySelectorAll("#journeyFlowList .flow-time-input");
  const total = Array.from(inputs).reduce((sum, el) => sum + (Number(el.value) || 0), 0);
  previewEl.textContent = formatDuration(total);
}

function createFlowStepRow(step = { name: "", duration: 15, desc: "" }) {
  const row = document.createElement("div");
  row.className = "flow-edit-row";
  row.innerHTML = `
    <div class="flow-edit-top">
      <input type="text" class="cyber-input flow-name-input" value="${step.name || ''}" placeholder="流程名稱（例：暖身活動）" required />
      <input type="number" min="1" max="600" class="cyber-input flow-time-input" value="${step.duration || 10}" placeholder="分鐘" required />
      <button type="button" class="btn-row-remove" title="刪除此步驟">✕</button>
    </div>
    <input type="text" class="cyber-input flow-desc-input" value="${step.desc || ''}" placeholder="步驟說明（選填）" />
  `;

  row.querySelector(".flow-time-input").addEventListener("input", updateFlowTotalPreview);
  row.querySelector(".btn-row-remove").addEventListener("click", () => {
    row.remove();
    updateFlowTotalPreview();
  });
  return row;
}

function createDynamicImgRow(value = "", inputClass = "webapp-img-input") {
  const uid = `dynImg_${++dynamicImgCounter}`;
  const wrapper = document.createElement("div");
  wrapper.className = "dynamic-img-row";
  wrapper.innerHTML = `
    <div class="img-upload-box">
      <img src="${value}" class="img-upload-preview" id="preview_${uid}" onerror="this.style.opacity=0.2" />
      <div class="img-upload-controls">
        <label class="upload-file-label">
          ↑ 選擇圖片上傳（自動壓縮）
          <input type="file" accept="image/*" hidden data-upload-target="${uid}" />
        </label>
        <input type="text" class="cyber-input ${inputClass}" id="input_${uid}" value="${value}" placeholder="圖片網址或 images/xxx.jpg" />
        <span class="upload-status" id="status_${uid}"></span>
      </div>
    </div>
    <button type="button" class="btn-row-remove" title="移除這張圖">✕</button>
  `;

  wrapper.querySelector(".btn-row-remove").addEventListener("click", () => wrapper.remove());
  bindUploadInputs(wrapper);
  return wrapper;
}

function createCategoryRow(cat = { id: "", label: "", theme: "cyan" }) {
  const row = document.createElement("div");
  row.className = "cat-edit-row";
  row.dataset.catId = cat.id || ("cat_" + Date.now() + "_" + Math.floor(Math.random() * 1000));
  row.innerHTML = `
    <input type="text" class="cyber-input cat-label-input" value="${cat.label}" placeholder="分類名稱（例：學習單）" required />
    <select class="cyber-select cat-theme-select">
      <option value="cyan" ${cat.theme === "cyan" ? "selected" : ""}>電光青</option>
      <option value="pink" ${cat.theme === "pink" ? "selected" : ""}>桃紅</option>
      <option value="green" ${cat.theme === "green" ? "selected" : ""}>賽博綠</option>
    </select>
    <button type="button" class="btn-row-remove" title="刪除分類">🗑</button>
  `;
  row.querySelector(".btn-row-remove").addEventListener("click", () => row.remove());
  return row;
}

function openEditor(type, index) {
  currentEditTarget = { type, index };
  editorFields.innerHTML = "";

  if (type === "hero") {
    editorTitle.textContent = "編輯首頁主視覺 (Hero)";
    const h = siteData.hero;
    editorFields.innerHTML = `
      <div class="field-group"><label>頂部綠色標語</label><input class="cyber-input" name="kicker" value="${h.kicker}" /></div>
      <div class="field-group"><label>粉紅框主標</label><input class="cyber-input" name="titleOutline" value="${h.titleOutline}" /></div>
      <div class="field-group"><label>白底藍光主標</label><input class="cyber-input" name="titleSolid" value="${h.titleSolid}" /></div>
      <div class="field-group"><label>中文引言</label><textarea class="cyber-textarea" name="subtitle">${h.subtitle}</textarea></div>
      ${imageFieldHtml("bgImage", "首頁背景圖", h.bgImage)}
    `;
    bindUploadInputs(editorFields);
  } else if (type === "about") {
    editorTitle.textContent = "編輯自我介紹 (About Me)";
    const a = siteData.about;
    editorFields.innerHTML = `
      <div class="field-group"><label>名稱</label><input class="cyber-input" name="name" value="${a.name}" /></div>
      <div class="field-group"><label>頭銜徽章</label><input class="cyber-input" name="role" value="${a.role}" /></div>
      <div class="field-group"><label>自我介紹文字</label><textarea class="cyber-textarea" name="desc">${a.desc}</textarea></div>
      <div class="field-group"><label>專長標籤（用逗號分隔）</label><input class="cyber-input" name="tags" value="${(a.tags || []).join(', ')}" /></div>
      ${imageFieldHtml("avatar", "個人形象照", a.avatar)}
    `;
    bindUploadInputs(editorFields);
  } else if (type === "categories") {
    editorTitle.textContent = "管理教材分類（新增 / 改名 / 刪除）";
    const listBox = document.createElement("div");
    listBox.id = "catManagerList";
    (siteData.materialCategories || []).forEach((c) => listBox.appendChild(createCategoryRow(c)));

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "btn-row-add";
    addBtn.textContent = "+ 新增教材分類";
    addBtn.addEventListener("click", () => listBox.appendChild(createCategoryRow()));

    editorFields.appendChild(listBox);
    editorFields.appendChild(addBtn);
  } else if (type === "journey") {
    const isNew = index === -1;
    editorTitle.textContent = isNew ? "新增教學歷程" : "編輯教學歷程";
    const item = isNew
      ? { badge: "HIGHLIGHT", customColor: "#ff007f", meta: "2026 // 主題課程", title: "", text: "", image: "", flow: [{ name: "", duration: 15, desc: "" }], reflection: "", notes: "" }
      : siteData.journeys[index];

    editorFields.innerHTML = `
      <div class="field-group"><label>標題</label><input class="cyber-input" name="title" value="${item.title || ''}" required /></div>
      <div class="field-group"><label>日期與副標</label><input class="cyber-input" name="meta" value="${item.meta || ''}" /></div>
      <div class="field-group"><label>左上角英文徽章</label><input class="cyber-input" name="badge" value="${item.badge || ''}" /></div>
      <div class="field-group"><label>首頁卡片簡介</label><textarea class="cyber-textarea" name="text" required>${item.text || ''}</textarea></div>
      ${imageFieldHtml("image", "相片（首頁封面與詳情頁共用）", item.image || "")}

      <div class="field-group"><label>設計理念</label><textarea class="cyber-textarea" name="concept" placeholder="寫下這個課程的發想動機與核心理念...">${item.concept || ''}</textarea></div>

      <div class="field-group">
        <label>直式教學流程表（單位：分鐘，系統自動加總）</label>
        <div class="flow-total-preview">
          <span>⏱ 目前自動計算總時長</span>
          <strong id="flowTotalPreviewVal">0 分鐘</strong>
        </div>
        <div id="journeyFlowList"></div>
        <button type="button" id="addFlowStepBtn" class="btn-row-add">+ 新增流程步驟</button>
      </div>

      <div class="field-group"><label>教學心得</label><textarea class="cyber-textarea" name="reflection" placeholder="寫下這次課程的觀察與心得...">${item.reflection || ''}</textarea></div>
      <div class="field-group"><label>注意事項</label><textarea class="cyber-textarea" name="notes" placeholder="寫下備課或執行時需要注意的細節...">${item.notes || ''}</textarea></div>
      <div class="field-group">
        <label>活動花絮照片（可自由增減張數）</label>
        <div id="journeyGalleryList"></div>
        <button type="button" id="addJourneyImgBtn" class="btn-row-add">+ 新增活動照片</button>
      </div>
    `;

    bindUploadInputs(editorFields);

    const flowListEl = document.getElementById("journeyFlowList");
    const steps = (item.flow && item.flow.length) ? item.flow : [{ name: "", duration: 15, desc: "" }];
    steps.forEach((s) => flowListEl.appendChild(createFlowStepRow(s)));
    updateFlowTotalPreview();

    document.getElementById("addFlowStepBtn").addEventListener("click", () => {
      flowListEl.appendChild(createFlowStepRow({ name: "", duration: 15, desc: "" }));
      updateFlowTotalPreview();
    });
    const galleryListEl = document.getElementById("journeyGalleryList");
    (item.gallery || []).forEach((src) => galleryListEl.appendChild(createDynamicImgRow(src, "journey-gallery-input")));
    document.getElementById("addJourneyImgBtn").addEventListener("click", () => {
      galleryListEl.appendChild(createDynamicImgRow("", "journey-gallery-input"));
    });

  } else if (type === "material") {
    const isNew = index === -1;
    editorTitle.textContent = isNew ? "新增自製教材 / 表單" : "編輯自製教材 / 表單";
    const cats = siteData.materialCategories || [];
    const defaultCat = cats.length ? cats[0].id : "";
    const item = isNew ? { category: defaultCat, badge: "NEW", wide: false, title: "", text: "", image: "", link: "#" } : siteData.materials[index];
    const catOptions = cats.map((c) => `<option value="${c.id}" ${item.category === c.id ? "selected" : ""}>${c.label}</option>`).join("");

    editorFields.innerHTML = `
      <div class="field-group"><label>教材標題</label><input class="cyber-input" name="title" value="${item.title}" required /></div>
      <div class="field-group"><label>分類</label>
        <select class="cyber-select" name="category">${catOptions}</select>
      </div>
      <div class="field-group"><label>左上角徽章（留空不顯示）</label><input class="cyber-input" name="badge" value="${item.badge || ''}" /></div>
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
    bindUploadInputs(editorFields);
  } else if (type === "webapp") {
    const isNew = index === -1;
    editorTitle.textContent = isNew ? "新增自製教學網頁" : "編輯自製教學網頁";
    const item = isNew ? { title: "", tags: ["#互動網頁"], text: "", url: "https://", images: [""] } : siteData.webapps[index];

    editorFields.innerHTML = `
      <div class="field-group"><label>網站名稱</label><input class="cyber-input" name="title" value="${item.title}" required /></div>
      <div class="field-group"><label>網站連結 (URL)</label><input class="cyber-input" name="url" value="${item.url}" required /></div>
      <div class="field-group"><label>特色標籤（用逗號分隔）</label><input class="cyber-input" name="tags" value="${(item.tags || []).join(', ')}" /></div>
      <div class="field-group"><label>網站介紹</label><textarea class="cyber-textarea" name="text" required>${item.text}</textarea></div>
      <div class="field-group">
        <label>輪播截圖（可自由增減張數）</label>
        <div id="webappImagesList"></div>
        <button type="button" id="addWebappImgBtn" class="btn-row-add">+ 新增輪播截圖</button>
      </div>
    `;

    const imgListEl = document.getElementById("webappImagesList");
    const imgs = (item.images && item.images.length) ? item.images : [""];
    imgs.forEach((src) => imgListEl.appendChild(createDynamicImgRow(src)));

    document.getElementById("addWebappImgBtn").addEventListener("click", () => {
      imgListEl.appendChild(createDynamicImgRow(""));
    });
  } else if (type === "theme") {
    editorTitle.textContent = "🎨 各元件專屬色彩編輯（點擊即時預覽）";
    const ec = { ...DEFAULT_DATA.elementColors, ...(siteData.elementColors || {}) };

    let html = `<div class="color-section-title">01 // 首頁與自我介紹元件</div>`;
    html += colorPickerRowHtml("el_heroOutline", "首頁線框主標", ec.heroOutline, "el:heroOutline");
    html += colorPickerRowHtml("el_avatarBorder", "個人照片霓虹邊框（含火花）", ec.avatarBorder, "el:avatarBorder");
    html += colorPickerRowHtml("el_roleBadge", "自我介紹頭銜徽章", ec.roleBadge, "el:roleBadge");
    html += colorPickerRowHtml("el_statNum", "自我介紹各項資源數字", ec.statNum, "el:statNum");

    html += `<div class="color-section-title">02 // 教學歷程圖卡</div>`;
    (siteData.journeys || []).forEach((item, i) => {
      const hex = item.customColor || THEME_TO_HEX[item.theme] || "#ff007f";
      html += colorPickerRowHtml(`j_${i}`, `教學歷程圖卡 ${i + 1}：${item.title}`, hex, `journey:${i}`);
    });

    html += `<div class="color-section-title">03 // 自製教材表單圖卡</div>`;
    (siteData.materials || []).forEach((item, i) => {
      const hex = item.customColor || "#00f0ff";
      html += colorPickerRowHtml(`m_${i}`, `教材圖卡 ${i + 1}：${item.title}`, hex, `material:${i}`);
    });

    html += `<div class="color-section-title">04 // 自製教學網頁圖卡</div>`;
    (siteData.webapps || []).forEach((item, i) => {
      const hex = item.customColor || DEFAULT_APP_COLORS[i % DEFAULT_APP_COLORS.length];
      html += colorPickerRowHtml(`w_${i}`, `教學網頁圖卡 ${i + 1}：${item.title}`, hex, `webapp:${i}`);
    });

    editorFields.innerHTML = html;

    editorFields.querySelectorAll(".color-swatch").forEach((swatch) => {
      swatch.addEventListener("click", () => {
        const { field, hex, name, preview } = swatch.dataset;
        swatch.parentElement.querySelectorAll(".color-swatch").forEach((s) => s.classList.remove("selected"));
        swatch.classList.add("selected");
        document.getElementById(`cinput_${field}`).value = hex;
        document.getElementById(`cname_${field}`).textContent = name;

        const [scope, key] = preview.split(":");
        if (scope === "el") {
          const temp = { ...siteData.elementColors, [key]: hex };
          applyElementColors(temp);
        } else if (scope === "journey") {
          const card = document.querySelector(`[data-journey-idx="${key}"]`);
          if (card) card.setAttribute("style", buildCardColorStyle(hex));
        } else if (scope === "material") {
          const card = document.querySelector(`[data-material-idx="${key}"]`);
          if (card) card.setAttribute("style", buildCardColorStyle(hex));
        } else if (scope === "webapp") {
          const card = document.querySelector(`[data-webapp-idx="${key}"]`);
          if (card) card.setAttribute("style", buildWebAppColorStyle(hex));
        }
      });
    });
  }

  editorModal.classList.add("open");
}

function bindUploadInputs(container) {
  const processImageFile = async (file, target) => {
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
    } catch {
      statusEl.textContent = "⚠ 圖片讀取失敗";
    }
  };

  container.querySelectorAll("[data-upload-target]").forEach((fileInput) => {
    const target = fileInput.dataset.uploadTarget;

    // 1. 原本的「選擇圖片上傳」
    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (file) await processImageFile(file, target);
    });

    // 2. 新增：在輸入框按 Ctrl+V 直接貼上剪貼簿截圖
    const textInput = document.getElementById(`input_${target}`);
    if (textInput) {
      textInput.placeholder = "點此按 Ctrl+V 直接貼上截圖，或貼上圖片網址";
      textInput.addEventListener("paste", async (e) => {
        const items = e.clipboardData?.items || [];
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            e.preventDefault();
            const file = item.getAsFile();
            if (file) await processImageFile(file, target);
            return;
          }
        }
      });
    }
  });
}

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
  } else if (type === "categories") {
    const rows = document.querySelectorAll("#catManagerList .cat-edit-row");
    siteData.materialCategories = Array.from(rows)
      .map((row) => ({
        id: row.dataset.catId,
        label: row.querySelector(".cat-label-input").value.trim(),
        theme: row.querySelector(".cat-theme-select").value
      }))
      .filter((c) => c.label);
  } else if (type === "journey") {
    const prevColor = index === -1 ? "#ff007f" : (siteData.journeys[index].customColor || "#ff007f");
    const flowRows = document.querySelectorAll("#journeyFlowList .flow-edit-row");
    const flow = Array.from(flowRows)
      .map((row) => ({
        name: row.querySelector(".flow-name-input").value.trim(),
        duration: Number(row.querySelector(".flow-time-input").value) || 0,
        desc: row.querySelector(".flow-desc-input").value.trim()
      }))
      .filter((s) => s.name);

    const galleryInputs = document.querySelectorAll("#journeyGalleryList .journey-gallery-input");
    const gallery = Array.from(galleryInputs).map((el) => el.value.trim()).filter(Boolean);

    const newItem = {
      id: index === -1 ? "j_" + Date.now() : siteData.journeys[index].id,
      title: fd.get("title"),
      meta: fd.get("meta"),
      badge: fd.get("badge"),
      customColor: prevColor,
      text: fd.get("text"),
      image: fd.get("image"),
      concept: fd.get("concept"),
      flow,
      reflection: fd.get("reflection"),
      notes: fd.get("notes"),
      gallery
    };

    if (index === -1) siteData.journeys.push(newItem);
    else siteData.journeys[index] = newItem;
  } else if (type === "material") {
    const prevColor = index === -1 ? "#00f0ff" : (siteData.materials[index].customColor || "#00f0ff");
    const newItem = {
      id: index === -1 ? "m_" + Date.now() : siteData.materials[index].id,
      title: fd.get("title"),
      category: fd.get("category"),
      badge: fd.get("badge"),
      customColor: prevColor,
      wide: fd.get("wide") === "true",
      text: fd.get("text"),
      link: fd.get("link") || "#",
      image: fd.get("image")
    };
    if (index === -1) siteData.materials.push(newItem);
    else siteData.materials[index] = newItem;
  } else if (type === "webapp") {
    const imgInputs = document.querySelectorAll("#webappImagesList .webapp-img-input");
    const images = Array.from(imgInputs).map((el) => el.value.trim()).filter(Boolean);
    const prevColor = index === -1
      ? DEFAULT_APP_COLORS[siteData.webapps.length % DEFAULT_APP_COLORS.length]
      : (siteData.webapps[index].customColor || "#00f0ff");

    const newItem = {
      id: index === -1 ? "w_" + Date.now() : siteData.webapps[index].id,
      customColor: prevColor,
      title: fd.get("title"),
      url: fd.get("url"),
      tags: fd.get("tags").split(",").map((s) => s.trim()).filter(Boolean),
      text: fd.get("text"),
      images
    };
    if (index === -1) siteData.webapps.push(newItem);
    else siteData.webapps[index] = newItem;
  } else if (type === "theme") {
    siteData.elementColors = {
      heroOutline: fd.get("el_heroOutline"),
      avatarBorder: fd.get("el_avatarBorder"),
      roleBadge: fd.get("el_roleBadge"),
      statNum: fd.get("el_statNum")
    };
    (siteData.journeys || []).forEach((item, i) => {
      const hex = fd.get(`j_${i}`);
      if (hex) item.customColor = hex;
    });
    (siteData.materials || []).forEach((item, i) => {
      const hex = fd.get(`m_${i}`);
      if (hex) item.customColor = hex;
    });
    (siteData.webapps || []).forEach((item, i) => {
      const hex = fd.get(`w_${i}`);
      if (hex) item.customColor = hex;
    });
  }

  editorModal.classList.remove("open");
  renderAll();
  await saveToFirebase();
});

// ======================================================
// 6. 介面互動、代理點擊、複製信箱與相框霓虹火花
// ======================================================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => navLinks.classList.remove("open")));

document.getElementById("editThemeBtn")?.addEventListener("click", () => openEditor("theme", 0));
document.getElementById("editHeroBtn")?.addEventListener("click", () => openEditor("hero", 0));
document.getElementById("editAboutBtn")?.addEventListener("click", () => openEditor("about", 0));

document.getElementById("copyEmailBtn")?.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = "jwls0202@gmail.com";
  try {
    await navigator.clipboard.writeText(email);
    showToast(`✓ 已複製信箱：${email}`);
  } catch {
    const input = document.createElement("input");
    input.value = email;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    showToast(`✓ 已複製信箱：${email}`);
  }
});

document.addEventListener("click", async (e) => {
  const editBtn = e.target.closest("[data-edit]");
  if (editBtn) {
    e.preventDefault();
    e.stopPropagation();
    openEditor(editBtn.dataset.edit, Number(editBtn.dataset.index));
    return;
  }

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

  const journeyCard = e.target.closest("[data-open-journey]");
  if (journeyCard) {
    e.preventDefault();
    openJourneyDetail(Number(journeyCard.dataset.openJourney));
    return;
  }

  if (isEditMode && e.target.closest(".bento-card, .app-card")) {
    e.preventDefault();
    return;
  }

  const placeholderCard = e.target.closest("[data-placeholder-link]");
  if (placeholderCard) {
    e.preventDefault();
    showToast("內頁架構建置中，敬請期待！");
  }
});

// 相框不定時霓虹閃爍 + 火花噴濺
const photoFrame = document.querySelector(".about-photo-frame");
if (photoFrame) {
  function spawnSparks(count) {
    const frameHex = siteData.elementColors?.avatarBorder || "#ff007f";
    const sparkColors = [frameHex, frameHex, "#ffffff", "#ffe066"];
    const rect = photoFrame.getBoundingClientRect();
    const edge = Math.floor(Math.random() * 4);
    let originX, originY;

    if (edge === 0) { originX = Math.random() * rect.width; originY = 0; }
    else if (edge === 1) { originX = rect.width; originY = Math.random() * rect.height; }
    else if (edge === 2) { originX = Math.random() * rect.width; originY = rect.height; }
    else { originX = 0; originY = Math.random() * rect.height; }

    for (let i = 0; i < count; i++) {
      const spark = document.createElement("span");
      spark.className = "neon-spark";
      spark.style.left = `${originX}px`;
      spark.style.top = `${originY}px`;

      const angle = Math.random() * Math.PI * 2;
      const distance = 25 + Math.random() * 75;
      const dur = 350 + Math.random() * 350;

      spark.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
      spark.style.setProperty("--ty", `${Math.sin(angle) * distance + 30}px`);
      spark.style.setProperty("--dur", `${dur}ms`);
      spark.style.setProperty("--size", `${2.5 + Math.random() * 3.5}px`);
      spark.style.setProperty("--spark-color", sparkColors[Math.floor(Math.random() * sparkColors.length)]);

      photoFrame.appendChild(spark);
      setTimeout(() => spark.remove(), dur + 50);
    }
  }

  function triggerGlitch() {
    const blinks = 2 + Math.floor(Math.random() * 3);
    let delay = 0;

    for (let i = 0; i < blinks; i++) {
      setTimeout(() => {
        photoFrame.classList.remove("neon-surge");
        photoFrame.classList.add("neon-off");
      }, delay);
      delay += 40 + Math.random() * 70;

      setTimeout(() => {
        photoFrame.classList.remove("neon-off");
        photoFrame.classList.add("neon-surge");
        if (i === 0 || Math.random() > 0.5) spawnSparks(6 + Math.floor(Math.random() * 7));
      }, delay);
      delay += 35 + Math.random() * 60;
    }

    setTimeout(() => photoFrame.classList.remove("neon-off", "neon-surge"), delay);
    setTimeout(triggerGlitch, delay + 1800 + Math.random() * 3200);
  }

  setTimeout(triggerGlitch, 1200);
}

// ======================================================
// 7. 啟動初始化
// ======================================================
injectAddButtons();
loadFromFirebase();