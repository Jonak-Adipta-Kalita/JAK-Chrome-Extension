import { Release as Release_ } from "github-webhook-event-types";

interface Release extends Release_ {
    timestamp: Object;
}

try {
    chrome.runtime.onInstalled.addListener((details) => {
        const name = "JAK Chrome Extension";

        if (details.reason === "install") {
            chrome.notifications.create("install", {
                type: "basic",
                iconUrl: "../../assets/images/logo.png",
                title: `Extension Installed!!`,
                message: `Thanks for Installing ${name}!!`,
                priority: 2,
            });
        } else if (details.reason === "update") {
            chrome.notifications.create("update", {
                type: "basic",
                iconUrl: "../../assets/images/logo.png",
                title: `Extension Updated!!`,
                message: `Thanks for Updating ${name}!!`,
                priority: 2,
            });
        } else if (details.reason === "chrome_update") {
            chrome.notifications.create("chrome_update", {
                type: "basic",
                iconUrl: "../../assets/images/logo.png",
                title: `Chrome got Updated!!`,
                message: `Please also Update ${name} to get the most values!!`,
                priority: 2,
            });
        } else if (details.reason === "shared_module_update") {
            chrome.notifications.create("shared_module_update", {
                type: "basic",
                iconUrl: "../../assets/images/logo.png",
                title: `Shared Module Updated!!`,
                message: `A Shared Module is Updated!!`,
                priority: 2,
            });
        }
    });

    fetch(`${process.env.SERVER_URL}/read/notifications`)
        .then((response) => {
            return response.json() as Promise<Release>;
        })
        .then((data) => {
            console.log(data);
        });
    // Send Notification
    // Delete the Data
} catch (error) {
    console.log(error);
}
