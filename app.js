const revealBtn = document.getElementById("revealBtn");
const answer = document.getElementById("answer");
const streakDisplay = document.getElementById("streak");
const riddleText = document.getElementById("riddle");

// 🔹 Your riddle list
const riddles = [
  {
    question: "What disappears the moment you say its name?",
    answer: "Silence"
  },
  {
    question: "The more you take, the more you leave behind. What are they?",
    answer: "Footsteps"
  },
  {
    question: "What has one eye but can’t see?",
    answer: "A needle"
  },
  {
    question: "What gets wetter the more it dries?",
    answer: "A towel"
  },
  {
    question: "What can travel around the world while staying in one corner?",
    answer: "A stamp"
  }
];

// 🔹 Helpers
function getToday() {
  return new Date().toISOString().split("T")[0];
}

function daysBetween(start, end) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.floor((end - start) / oneDay);
}

// 🔹 Pick riddle of the day
const startDate = new Date("2025-03-01"); // choose any fixed date
const today = new Date();
const dayIndex = daysBetween(startDate, today) % riddles.length;
const todaysRiddle = riddles[dayIndex];

// 🔹 Load riddle
riddleText.textContent = todaysRiddle.question;
answer.textContent = todaysRiddle.answer;

// 🔹 Streak logic
let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastCompletedDate = localStorage.getItem("lastCompletedDate");
const todayStr = getToday();

streakDisplay.textContent = `🔥 Streak: ${streak}`;

if (lastCompletedDate === todayStr) {
  answer.style.display = "block";
  revealBtn.style.display = "none";
}

revealBtn.addEventListener("click", () => {
  answer.style.display = "block";
  revealBtn.style.display = "none";

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (lastCompletedDate === yesterdayStr) {
    streak += 1;
  } else {
    streak = 1;
  }

  localStorage.setItem("streak", streak);
  localStorage.setItem("lastCompletedDate", todayStr);
  streakDisplay.textContent = `🔥 Streak: ${streak}`;
});
