/**
 * OneClickClearHistory
 * Easy to delete history.
 *
 * Copyright 1000ch<http://1000ch.net/>
 */
OneClickClearHistory = {
	init: function() {
		chrome.browserAction.onClicked.addListener(function(tab) {
			if(confirm("Are you sure to erase all history?")) {
				chrome.history.deleteAll(function() {});
			}
		});
	}
};

if(document.readyState === "complete" || document.readyState === "interactive") {
	OneClickClearHistory.init();
} else {
	document.addEventListener("DOMContentLoaded", function() {
		OneClickClearHistory.init();
	});
}