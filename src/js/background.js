chrome.runtime.onInstalled.addListener((details) => {
    const name = "JAK Chrome Extension";

    if (details.reason === "install") {
        console.log(`Thanks for Installing ${name}!!`);
		chrome.notifications.create("install", {
			type: "basic",
			iconUrl: "../../assets/images/logo.png",
			title: `Extension Installed!!`,
			message: `Thanks for Installing ${name}!!`,
			priority: 2
		});
    } else if (details.reason === "update") {
        console.log(`Thanks for Updating ${name}!!`);
		chrome.notifications.create("update", {
			type: "basic",
			iconUrl: "../../assets/images/logo.png",
			title: `Extension Updated!!`,
			message: `Thanks for Updating ${name}!!`,
			priority: 2
		});
    } else if (details.reason === "chrome_update") {
        console.log(`Please also Update ${name} to get the most values!!`);
		chrome.notifications.create("chrome_update", {
			type: "basic",
			iconUrl: "../../assets/images/logo.png",
			title: `Chrome got Updated!!`,
			message: `Please also Update ${name} to get the most values!!`,
			priority: 2
		});
    } else if (details.reason === "shared_module_update") {
        console.log(`A Shared Module is Updated!!`);
		chrome.notifications.create("shared_module_update", {
			type: "basic",
			iconUrl: "../../assets/images/logo.png",
			title: `Shared Module Updated!!`,
			message: `A Shared Module is Updated!!`,
			priority: 2
		});
    }
});
