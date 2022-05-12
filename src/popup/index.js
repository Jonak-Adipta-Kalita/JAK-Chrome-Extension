const website_notifyBtn = document.getElementById("website-notifyBtn");
const api_notifyBtn = document.getElementById("api-notifyBtn");
const discordBot_notifyBtn = document.getElementById("discord-bot-notifyBtn");

website_notifyBtn.addEventListener("click", () => {
    if (website_notifyBtn.innerText === "Enable") {
        website_notifyBtn.innerText = "Disable";
        localStorage.setItem("website-notifyBtn", "Disable");
        website_notifyBtn.innerText = localStorage.getItem("website-notifyBtn");
    } else {
        website_notifyBtn.innerText = "Enable";
        localStorage.setItem("website-notifyBtn", "Enable");
        website_notifyBtn.innerText = localStorage.getItem("website-notifyBtn");
    }
});

api_notifyBtn.addEventListener("click", () => {
    if (api_notifyBtn.innerText === "Enable") {
        api_notifyBtn.innerText = "Disable";
        localStorage.setItem("api-notifyBtn", "Disable");
        api_notifyBtn.innerText = localStorage.getItem("api-notifyBtn");
    } else {
        api_notifyBtn.innerText = "Enable";
        localStorage.setItem("api-notifyBtn", "Enable");
        api_notifyBtn.innerText = localStorage.getItem("api-notifyBtn");
    }
});

discordBot_notifyBtn.addEventListener("click", () => {
    if (discordBot_notifyBtn.innerText === "Enable") {
        discordBot_notifyBtn.innerText = "Disable";
        localStorage.setItem("discord-bot-notifyBtn", "Disable");
        discordBot_notifyBtn.innerText = localStorage.getItem(
            "discord-bot-notifyBtn"
        );
    } else {
        discordBot_notifyBtn.innerText = "Enable";
        localStorage.setItem("discord-bot-notifyBtn", "Enable");
        discordBot_notifyBtn.innerText = localStorage.getItem(
            "discord-bot-notifyBtn"
        );
    }
});
