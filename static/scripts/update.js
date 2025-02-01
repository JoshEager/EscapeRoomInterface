// All this script needs to do is see if the contents when we refresh have changed
// If they have, insert the new content. 

const CHECKINTERVAL = 2000

async function reloadScripts() {
    const scripts = document.querySelectorAll("script");
    for (const oldScript of scripts) {
        const newScript = document.createElement("script");
        if (oldScript.src) {
            newScript.src = oldScript.src;
            newScript.defer = oldScript.defer;
            newScript.async = oldScript.async;
        } else {
            newScript.textContent = oldScript.textContent;
        }
        oldScript.replaceWith(newScript);
    }
}

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
        document.documentElement.innerHTML = new_dom.documentElement.innerHTML;
        await reloadScripts();
    } else {
        return;
    }
}

setInterval(updatePage, CHECKINTERVAL);
