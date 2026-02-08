/* ================= AUDIO ELEMENTS ================= */

const loveAudio = document.getElementById("loveAudio");
const noSound = document.getElementById("noSound");
const yesSound = document.getElementById("yesSound");

[loveAudio, noSound, yesSound].forEach(a => {
  a.preload = "auto";
  a.load();
});

/* ================= QUIZ SECTION ================= */

const quizWrongMessages = [
  "Oops 😜 try again",
  "Hehe 😅 not this one",
  "Aww 🥺 think harder",
  "Almost 💭 but no",
  "Dil se yaad karo ❤️"
];

const quizSteps = [
  { id: "quiz1", next: "quiz2", wrong: 0 },
  { id: "quiz2", next: "quiz3", wrong: 0 },
  { id: "quiz3", next: "gameScreen", wrong: 0 }
];

quizSteps.forEach(step => {
  const screen = document.getElementById(step.id);
  const msg = screen.querySelector(".msg");

  screen.querySelectorAll(".opt").forEach(btn => {
    btn.addEventListener("click", () => {

      /* ❌ WRONG MCQ */
      if (!btn.classList.contains("correct")) {
        noSound.currentTime = 0;
        noSound.play().catch(() => {});

        msg.textContent = quizWrongMessages[step.wrong];
        step.wrong = (step.wrong + 1) % quizWrongMessages.length;
        return;
      }

      /* ✅ CORRECT MCQ */
      yesSound.currentTime = 0;
      yesSound.play().catch(() => {});

      // ⏱ allow sound to start before DOM change
      setTimeout(() => {
        msg.textContent = "";
        screen.classList.add("hidden");
        document.getElementById(step.next).classList.remove("hidden");

        if (step.next === "gameScreen") {
          resetNo();
        }
      }, 150);
    });
  });
});

/* ================= GAME SECTION ================= */

const noBtn = document.getElementById("noBtn");
const noWrapper = document.querySelector(".no-wrapper");
const yesZone = document.getElementById("yesZone");
const yesBtn = document.getElementById("yesBtn");

const attemptsText = document.getElementById("attempts");
const destinyMsg = document.getElementById("destinyMsg");

let attemptsLeft = 10;
let yesW = 180;
let yesH = 70;

const noMessages = [
  "Hehe 😅 missed me",
  "Still NO? 😐",
  "Dil maanta nahi ❤️",
  "Bas maan jao na 🥺",
  "Destiny calling 😌",
  "Ab toh YES likha hai 💫",
  "Running won’t help 😏",
  "Almost 😈",
  "Last chance 😬",
  "Destiny chose us ❤️💍"
];

function resetNo() {
  noBtn.style.left = "0px";
  noBtn.style.top = "0px";
}

function moveNo() {
  const area = noWrapper.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const x = Math.random() * (area.width - btn.width);
  const y = Math.random() * (area.height - btn.height);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

/* ❌ NO BUTTON */
noBtn.addEventListener("click", () => {
  noSound.currentTime = 0;
  noSound.play().catch(() => {});

  attemptsLeft--;
  attemptsText.textContent = `Attempts left: ${attemptsLeft} / 10 😏`;
  destinyMsg.textContent = noMessages[10 - attemptsLeft - 1];

  if (attemptsLeft <= 0) {
    noBtn.style.display = "none";
    destinyMsg.textContent =
      "There is no more running… destiny has chosen us ❤️💍✨";
    return;
  }

  moveNo();

  if (yesW < window.innerWidth * 0.9) yesW += 28;
  if (yesH < 200) yesH += 14;
  yesZone.style.width = `${yesW}px`;
  yesZone.style.height = `${yesH}px`;
});

/* ✅ YES BUTTON */
yesBtn.addEventListener("click", () => {
  yesSound.currentTime = 0;
  yesSound.play().catch(() => {});

  loveAudio.currentTime = 0;
  loveAudio.play().catch(() => {});

  confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });

  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("finalScreen").classList.remove("hidden");

  let i = 0;
  setInterval(() => {
    i = (i + 1) % 4;
    document.getElementById("slideshow").src = `megha${i + 1}.jpg`;
  }, 2500);
});
