import { Release as Release_ } from "github-webhook-event-types";

export interface Release extends Release_ {
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

    chrome.runtime.onMessage.addListener((release: Release) => {
        chrome.notifications.create(
            `github-notification-${release.repository.name.split("jak-")[1]}`,
            {
                type: "basic",
                iconUrl: "../../assets/images/logo.png",
                title: `New release!! in ${release.repository.name}`,
                message: `There is a new Release in ${release.repository.name}`,
                priority: 2,
            },
            () => {}
        );
    });
} catch (error) {
    console.log(error);
}
