
let startTime, updatedTime, difference, timerInterval;
let running = false;
let lapTimes = [];
const display = document.getElementById("display");
const lapsList = document.getElementById("laps");

function formatTime(milliseconds) {
    let date = new Date(milliseconds);
    let minutes = String(date.getUTCMinutes()).padStart(2, "0");
    let seconds = String(date.getUTCSeconds()).padStart(2, "0");
    let millisecondsFormatted = String(date.getUTCMilliseconds()).padStart(3, "0");
    return `${minutes}:${seconds}.${millisecondsFormatted}`;
}

function updateTime() {
    updatedTime = Date.now();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

document.getElementById("start").addEventListener("click", function() {
    if (!running) {
        startTime = Date.now() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
        running = true;
    }
});

document.getElementById("stop").addEventListener("click", function() {
    clearInterval(timerInterval);
    running = false;
});

document.getElementById("reset").addEventListener("click", function() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    display.textContent = "00:00:00.000";
    lapsList.innerHTML = "";
    lapTimes = [];
});

document.getElementById("lap").addEventListener("click", function() {
    if (running) {
        let lapTime = formatTime(difference);
        lapTimes.push(lapTime);
        let lapElement = document.createElement("li");
        lapElement.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
        lapsList.appendChild(lapElement);
    }
});
