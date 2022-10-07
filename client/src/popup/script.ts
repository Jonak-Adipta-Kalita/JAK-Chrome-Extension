const website_notifyBtn = document.getElementById("website-notifyBtn")!;
const api_notifyBtn = document.getElementById("api-notifyBtn")!;
const discordBot_notifyBtn = document.getElementById("discord-bot-notifyBtn")!;
const mobileApp_notifyBtn = document.getElementById("mobile-app-notifyBtn")!;

const fetchBtn = document.getElementById("fetchBtn")!;

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

mobileApp_notifyBtn.addEventListener("click", () => {
    if (mobileApp_notifyBtn.innerText === "Enable") {
        localStorage.setItem("mobile-app-notifyBtn", "Disable");
    } else {
        localStorage.setItem("mobile-app-notifyBtn", "Enable");
    }

    mobileApp_notifyBtn.innerText = localStorage.getItem(
        "mobile-app-notifyBtn"
    )!;
});

fetchBtn.addEventListener("click", () => {
    fetch(`${process.env.SERVER_URL}/notifications/read`, { method: "GET" })
        .then((response) => {
            try {
                return response.json();
            } catch (error) {
                console.log(error);
            }
        })
        .then((data) => {
            if (data.length !== 0) {
                fetch(`${process.env.SERVER_URL}/notifications/delete`, {
                    method: "DELETE",
                });
                data?.map(async (release: any, index: number) => {
                    const name: string = release.repository.name
                        .toLowerCase()
                        .split("jak-")[0];

                    if (
                        localStorage.getItem(`${name}-notifyBtn`) === "Enable"
                    ) {
                        chrome.runtime.sendMessage({ release, name });
                    }
                });
            }
        });
});
