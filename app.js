const WORDS_PER_DAY = 5;
const words = window.VOCAB_WORDS;

const dateKey = new Date().toISOString().slice(0, 10);
const progressKey = `daily-five-progress-${dateKey}`;

const dateLabel = document.querySelector("#dateLabel");
const learnedCount = document.querySelector("#learnedCount");
const grid = document.querySelector("#wordGrid");
const template = document.querySelector("#wordCardTemplate");
const shuffleButton = document.querySelector("#shuffleButton");
const resetButton = document.querySelector("#resetButton");

dateLabel.textContent = new Intl.DateTimeFormat("en-NZ", {
  weekday: "long",
  day: "numeric",
  month: "long"
}).format(new Date());

function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let state = seed >>> 0;
  return function () {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(items, seedText) {
  const result = [...items];
  const random = seededRandom(hashString(seedText));
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const dailyWords = seededShuffle(words, dateKey).slice(0, WORDS_PER_DAY);
let displayWords = [...dailyWords];

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(progressKey)) || {};
  } catch {
    return {};
  }
}

function writeProgress(progress) {
  localStorage.setItem(progressKey, JSON.stringify(progress));
}

function refreshCount() {
  const progress = readProgress();
  const count = dailyWords.filter(item => progress[item.word]).length;
  learnedCount.textContent = count;
}

function render() {
  const progress = readProgress();
  grid.innerHTML = "";

  displayWords.forEach((item, index) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".word-card");
    const reveal = fragment.querySelector(".reveal");
    const details = fragment.querySelector(".details");
    const checkbox = fragment.querySelector(".learned");

    fragment.querySelector(".number").textContent = String(index + 1).padStart(2, "0");
    fragment.querySelector(".part").textContent = item.pos;
    fragment.querySelector(".word").textContent = item.word;
    fragment.querySelector(".definition").textContent = item.definition;
    fragment.querySelector(".example").textContent = `“${item.example}”`;

    checkbox.checked = Boolean(progress[item.word]);
    card.classList.toggle("complete", checkbox.checked);

    reveal.addEventListener("click", () => {
      const isHidden = details.hidden;
      details.hidden = !isHidden;
      reveal.textContent = isHidden ? "Hide meaning" : "Reveal meaning";
    });

    checkbox.addEventListener("change", () => {
      const next = readProgress();
      next[item.word] = checkbox.checked;
      writeProgress(next);
      card.classList.toggle("complete", checkbox.checked);
      refreshCount();
    });

    grid.appendChild(fragment);
  });

  refreshCount();
}

shuffleButton.addEventListener("click", () => {
  displayWords = seededShuffle(displayWords, `${Date.now()}-${Math.random()}`);
  render();
});

resetButton.addEventListener("click", () => {
  localStorage.removeItem(progressKey);
  render();
});

render();
