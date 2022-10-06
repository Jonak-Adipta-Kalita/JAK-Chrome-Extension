const website_notifyBtn = document.getElementById("website-notifyBtn")!;
const api_notifyBtn = document.getElementById("api-notifyBtn")!;
const discordBot_notifyBtn = document.getElementById("discord-bot-notifyBtn")!;

website_notifyBtn.addEventListener("click", () => {
    if (website_notifyBtn.innerText === "Enable") {
        localStorage.setItem("website-notifyBtn", "Disable");
    } else {
        localStorage.setItem("website-notifyBtn", "Enable");
    }

    website_notifyBtn.innerText = localStorage.getItem("website-notifyBtn")!;
});

api_notifyBtn.addEventListener("click", () => {
    if (api_notifyBtn.innerText === "Enable") {
        localStorage.setItem("api-notifyBtn", "Disable");
    } else {
        localStorage.setItem("api-notifyBtn", "Enable");
    }

    api_notifyBtn.innerText = localStorage.getItem("api-notifyBtn")!;
});

discordBot_notifyBtn.addEventListener("click", () => {
    if (discordBot_notifyBtn.innerText === "Enable") {
        localStorage.setItem("discord-bot-notifyBtn", "Disable");
    } else {
        localStorage.setItem("discord-bot-notifyBtn", "Enable");
    }

    discordBot_notifyBtn.innerText = localStorage.getItem(
        "discord-bot-notifyBtn"
    )!;
});

fetch(`${process.env.SERVER_URL}/read/notifications`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data?.map((release: any) => {
            const name: string = release.repository.name
                .toLowerCase()
                .split("jak-")[0];

            if (localStorage.getItem(`${name}-notifyBtn`) === "Enable") {
                chrome.runtime.sendMessage({ release, name });
            }
            // Delete the Data
        });
    });
