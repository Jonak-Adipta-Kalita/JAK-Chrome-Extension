const openWebsite = () => {
	return (info, tab) => { 
		let link = "https://jonakadiptakalita.herokuapp.com/"
		chrome.tabs.create({
			index: tab.index + 1,
			url: link,
			selected: true
		});
	};
};

module.exports = {
	openWebsite,
};