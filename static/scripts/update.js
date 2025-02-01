// All this script needs to do is see if the contents when we refresh have changed
// If they have, reload the page.

const CHECKINTERVAL = 2000

async function updatePage() {
    let newPage;
    try {
        newPage = await (await fetch("/escaperoom", {cache: "no-cache"})).text();
    } catch (error) {
        console.log("Could not check for updates: ", error);
        return;
    }

    // Check for differences
    const parser = new DOMParser();
    let new_dom = parser.parseFromString(newPage, "text/html");

    if (document.documentElement.innerHTML != new_dom.documentElement.innerHTML) {
        console.log("Changes Detected!");
        location.reload();
    } else {
        return;
    }
}

setInterval(updatePage, CHECKINTERVAL);
