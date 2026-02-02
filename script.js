const select = document.getElementById("startHizb");
const morning = document.getElementById("morning");
const evening = document.getElementById("evening");

for (let i = 1; i <= 60; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = "حزب " + i;
  select.appendChild(opt);
}

function update() {
  const base = parseInt(select.value);
  const today = new Date().getDate();

  const morningHizb = ((base + today - 1) % 60) + 1;
  const eveningHizb = (morningHizb % 60) + 1;

  morning.innerHTML = `حزب ${morningHizb}<br>${HIZB[morningHizb].start}`;
  evening.innerHTML = `حزب ${eveningHizb}<br>${HIZB[eveningHizb].start}`;
}

select.addEventListener("change", () => {
  localStorage.setItem("startHizb", select.value);
  update();
});

select.value = localStorage.getItem("startHizb") || 1;
update();
