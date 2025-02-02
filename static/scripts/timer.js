// Should update the content of time-remaining to be 1 second less every time

const ALLOWEDTIME = 40; // 40 minutes
const endTime = Date.now() + (1000 * 60 * ALLOWEDTIME);

function updateTimeRemaining() {
    let timeRemaining = Math.max(0, (endTime - Date.now()) / 1000); 
    let minutesRemaining = Math.floor(timeRemaining / 60);
    let secondsRemaining = Math.floor(timeRemaining % 60).toString().padStart(2, "0");

    document.getElementById("time-remaining").textContent = `${minutesRemaining}:${secondsRemaining}`;

    if (timeRemaining <= 0) {
        clearInterval(interval);
        document.getElementById("time-remaining").textContent = "00:00";
    }
}

const interval = setInterval(updateTimeRemaining, 1000);