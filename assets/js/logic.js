const questionsHolder = document.getElementById("questions");
const questionTitle = document.getElementById("question-title");
const questionChoices = document.getElementById("choices");
const startBtn = document.getElementById("start");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const submitBtn = document.getElementById("submit");
const initials = document.getElementById("initials");
const highscores = document.getElementById("highscores");
const startScreen = document.getElementById("start-screen");
const data = localStorage.getItem("user");
const user = data ? JSON.parse(data) : [];
const correctSound = new Audio();
correctSound.src = "./assets/sfx/correct.wav";
const incorrectSound = new Audio();
incorrectSound.src = "./assets/sfx/incorrect.wav";
const timer = document.getElementById("time");

let score = 0;
let questionIndex = 0;
let button;
let selected;
let time = 60;
timer.innerText = time;
let timedInterval;

startBtn.addEventListener("click", () => {
  renderQuestion();
  startScreen.classList.add("hide");
  questionsHolder.classList.remove("hide");
  startTimer();
});

function renderQuestion() {
  let question = questions[questionIndex];
  questionTitle.innerHTML = question.title;
  questionChoices.innerHTML = question.possibleAnswers
    .map(
      (choice) =>
        `<button value="${choice}" >${choice}</button>
        `
    )
    .join("");
  questionChoices.addEventListener("click", selectedOptions);
}

function selectedOptions() {
  button = event.target;
  selected = event.target.value;
  let answer = questions[questionIndex].correctAnswer;
  if (selected === answer) {
    button.setAttribute("style", "background-color:green");
    score++;
    correctSound.play();
  } else {
    button.setAttribute("style", "background-color:red");
    incorrectSound.play();
    time -= 10;
  }
  checkAnswer(button);
  questionChoices.removeEventListener("click", selectedOptions);
}
function checkAnswer() {
  setTimeout(() => {
    renderQuestion();
  }, 1000);
  if (questionIndex < questions.length - 1) {
    questionIndex++;
  } else {
    result();
  }
}
function result() {
  questionsHolder.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.innerHTML += score;
  clearInterval(timedInterval);
  timer.innerText = 30;
}
submitBtn.addEventListener("click", () => {
  localStorage.getItem("user");
  let newUser = {
    score: score,
    initials: initials.value.toUpperCase(),
  };
  user.push(newUser);
  localStorage.setItem("user", JSON.stringify(user));
  initials.value = "";
  endScreen.classList.add("hide");
  startScreen.classList.remove("hide");
});

function startTimer() {
  timedInterval = setInterval(() => {
    time--;
    timer.innerText = time;
    if (time <= 0) {
      clearInterval(timedInterval);
      result();
      timer.innerText = 60;
    }
  }, 1000);
}