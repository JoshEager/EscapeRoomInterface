// Functions that will set the state of the escape room
// These are all meant for use inside of a controlroom 

preButton = document.getElementById("preButton");
preButton.addEventListener("click", async () => { 
    let status = await ( await fetch("/set?state=pre")).statusText;
    console.log("Set state pre: ", status);
});

startButton = document.getElementById("startButton");
startButton.addEventListener("click", async () => {
    let status = await ( await fetch("/set?state=start")).statusText;
    console.log("Set state start: ", status);
});

timerButton = document.getElementById("timerButton");
timerButton.addEventListener("click", async () => {
    let status = await ( await fetch("/set?state=timer")).statusText;
    console.log("Set state timer: ", status); 
});

endButton = document.getElementById("endButton");
endButton.addEventListener("click", async () => {
    let status = await ( await fetch("/set?state=end")).statusText;
    console.log("Set state end: ", status);
});
