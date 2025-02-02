

let video = document.getElementById("metzgerVideo");
video.addEventListener("ended", async () => {
    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    let status = await (await fetch("/set?state=timer")).statusText
    console.log("Set state to timer: ", status);
});