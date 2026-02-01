// إعداد قائمة الأحزاب
const select = document.getElementById("startHizb");
for (let i = 1; i <= 60; i++) {
  const o = document.createElement("option");
  o.value = i;
  o.textContent = "حزب " + i;
  select.appendChild(o);
}

// حفظ البداية
function saveStart() {
  localStorage.setItem("startHizb", select.value);
  loadToday();
}

// حساب الحزب
function getHizb(offset) {
  const start = parseInt(localStorage.getItem("startHizb") || 1);
  const days = Math.floor(Date.now() / 86400000);
  return (start + days * 2 + offset - 1) % 60 + 1;
}

// عرض مختصر
function renderHizb(num) {
  const d = HIZB_DATA[num];
  return d
    ? `حزب ${num}\n📖 ${d.sura}\n🟢 ${d.start}`
    : `حزب ${num}`;
}

// تحميل اليوم
function loadToday() {
  const now = new Date();
  const day = now.getDay();

  document.getElementById("today").innerText =
    now.toLocaleDateString("ar-MA");

  document.getElementById("morning").innerText =
    day === 5 ? "يس – الواقعة – تبارك" : renderHizb(getHizb(0));

  document.getElementById("evening").innerText =
    day === 4 ? "سورة الكهف" : renderHizb(getHizb(1));
}

// القارئ
function readHizb(time) {
  const day = new Date().getDay();
  let title = "";
  let text = "";

  if (time === "morning" && day === 5) {
    title = "صباح الجمعة";
    text = "يس – الواقعة – تبارك";
  } else if (time === "evening" && day === 4) {
    title = "مساء الخميس";
    text = "سورة الكهف";
  } else {
    const num = time === "morning" ? getHizb(0) : getHizb(1);
    title = "حزب " + num;
    text = QURAN_WARSH[num] || "نص الحزب غير مضاف بعد";
  }

  document.getElementById("readerTitle").innerText = title;
  document.getElementById("readerContent").innerText = text;
  document.getElementById("reader").classList.remove("hidden");
}

function closeReader() {
  document.getElementById("reader").classList.add("hidden");
}

loadToday();
