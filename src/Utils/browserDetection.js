const browserDetection = (navigator) => {
	let userBrowser = "";

	if (navigator.userAgent.indexOf("Firefox") > -1) {
		userBrowser = "Mozilla Firefox";
	} else if (navigator.userAgent.indexOf("Opera") > -1 || navigator.userAgent.indexOf("OPR") > -1) {
		userBrowser = "Opera";
	} else if (navigator.userAgent.indexOf("Trident") > -1) {
		userBrowser = "Microsoft Internet Explorer";
	} else if (navigator.userAgent.indexOf("Edge") > -1) {
		userBrowser = "Microsoft Edge";
	} else if (navigator.userAgent.indexOf("Chrome") > -1) {
		userBrowser = navigator?.brave?.isBrave() ? "Brave" : "Google Chrome or Chromium";
	} else {
		userBrowser = "unknown";
	}

	return userBrowser;
};

export default browserDetection;
