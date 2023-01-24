const storage = JSON.parse(localStorage.getItem("user")) || "[]";
const clearBtn = document.getElementById("clear");
highscores.innerHTML = `
 ${storage
   .map(
     (user) =>
       `<li style="list-style:none"><span class="span-score">User:</span>${user.initials}  <span class="span-score">Score:</span>${user.score}</li>`
   )
   .join("")}
`;

clearBtn.addEventListener("click", () => {
  localStorage.getItem("user");
  localStorage.removeItem("user");
  highscores.innerHTML = "";
});