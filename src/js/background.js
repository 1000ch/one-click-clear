/**
 * OneClickClear
 * Easy to delete history.
 *
 * Copyright 1000ch<http://1000ch.net/>
 */

//BrowserAction API wrapper
var BrowserActionAccess = {
	/**
	 * set badge text
	 * @param {String} text
	 */
	setBadgeText: function(text) {
		chrome.browserAction.setBadgeText({text: text});
	},
	/**
	 * set icon clicked callback
	 * @param {Function} callback
	 */
	addClickedCallback: function(callback) {
		chrome.browserAction.onClicked.addListener(callback);
	}
};

//History API wrapper
var HistoryAccess = {
	/**
	 * search history with query
	 * @param {Object} query
	 * @param {Function} callback
	 */
	search: function(query, callback) {
		chrome.history.search(query, callback);
	},
	/**
	 * delete all browser history
	 * @param {Function} callback
	 */
	deleteAll: function(callback) {
		chrome.history.deleteAll(callback);
	},
	/**
	 * set visited callback
	 * @param {Function} callback
	 */
	addVisitedCallback: function(callback) {
		chrome.history.onVisited.addListener(callback);
	}
};

(function() {

	//update badge text when history is updated
	HistoryAccess.addVisitedCallback(function(historyItem) {
		HistoryAccess.search({text: ""}, function(items) {
			BrowserActionAccess.setBadgeText(String(items.length));
		});
	});

	//confirm on click, and, delete history when accepted.
	var confirmText = 
		"Are you sure you want to erase all history and cookie ?\n" + 
		"(This action cannot be canceled)";
	BrowserActionAccess.addClickedCallback(function(tab) {
		if(window.confirm(confirmText)) {
			HistoryAccess.deleteAll(function() {
				BrowserActionAccess.setBadgeText("0");
			});
		}
	});

})();