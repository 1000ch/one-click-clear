/**
 * OneClickClear
 * Easy to delete history.
 *
 * Copyright 1000ch<http://1000ch.net/>
 */

/**
 * general ready function
 * @param {Function} callback
 */
var ready = function(callback) {
	if(document.readyState === "complete" || document.readyState === "interactive") {
		callback();
	} else {
		document.addEventListener("DOMContentLoaded", function() {
			callback();
		});
	}
};

OneClickClear = {
	/**
	 * init function
	 */
	init: function() {
		//update badge once.
		this.updateBadgeText();

		//start listening
		chrome.browserAction.onClicked.addListener(function(tab) {
			if(window.confirm("Are you sure you want to erase all history?\n(This action cannot be canceled)")) {
				chrome.history.deleteAll(OneClickClear.updateBadgeText);
			}
		});
	},
	/**
	 * set history count as badge text
	 */
	updateBadgeText: function() {
		chrome.history.search({text: ""}, function(items) {
			chrome.browserAction.setBadgeText({
				text: String(items.length)
			});
		});
	}
};

//when document is ready, call init
ready(OneClickClear.init.bind(OneClickClear));