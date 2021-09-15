chrome.runtime.onInstalled.addListener((details) => {
	const name = "JAK Chrome Extension";
	
	if(details.reason === "install") {
		console.log(`Thanks for Installing ${name}!!`);
	} else if (details.reason === "update") {
		console.log(`Thanks for Updating ${name}!!`);
	} else if (details.reason === "chrome_update") {
		console.log(`Please also Update ${name} to get the most values!!`);
	} else if (details.reason === "shared_module_update") {
		console.log(`A shared module ${name} is Updated!!`);
	};
});
