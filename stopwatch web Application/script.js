let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById("display");
const lapsList = document.getElementById("laps");

document.getElementById("start").addEventListener("click", () => {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
});

document.getElementById("pause").addEventListener("click", () => {
    clearInterval(timerInterval);
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = "00 : 00 : 00 : 000";
    lapsList.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {
    const li = document.createElement("li");
    li.textContent = display.textContent;
    lapsList.appendChild(li);
});

function updateDisplay() {
    elapsedTime = Date.now() - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor(elapsedTime % 1000);

    display.textContent = 
        `${String(hours).padStart(2, '0')} : 
         ${String(minutes).padStart(2, '0')} : 
         ${String(seconds).padStart(2, '0')} : 
         ${String(milliseconds).padStart(3, '0')}`;
}
