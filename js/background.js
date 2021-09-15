chrome.runtime.onInstalled.addListener((details) => {
	if(details.reason === 'install') {
		// Do Something
	} else if (details.reason === "update") {
		// Do Something
	} else if (details.reason === "chrome_update") {
		// Do Something
	} else if (details.reason === "shared_module_update") {
		// Do Something
	};
});
