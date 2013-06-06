/**
 * OneClickClear
 * Easy to delete history and cookie.
 *
 * Copyright 1000ch<http://1000ch.net/>
 */

//cache
var nativeForEach = [].forEach;

/**
 * general ready function
 * @param {Function} callback
 */
var ready = function(callback) {
	if(["complete", "loaded", "interactive"].indexOf(document.readyState) != -1) {
		callback();
	} else {
		document.addEventListener("DOMContentLoaded", function() {
			callback();
		});
	}
};
var OneClickClear = {
	/**
	 * init function
	 */
	init: function() {
		//update badge once.
		this.updateBadgeText();

		//when history is updated
		chrome.history.onVisited.addListener(function(historyItem) {
			OneClickClear.updateBadgeText();
		});

		//when cookie information is changed
		chrome.cookies.onChanged.addListener(function(changeInfo) {});

		//start listening
		chrome.browserAction.onClicked.addListener(function(tab) {
			if(window.confirm("Are you sure you want to erase all history and cookie ?\n(This action cannot be canceled)")) {
				chrome.history.deleteAll(function() {
					OneClickClear.updateBadgeText();
				});
				chrome.cookies.getAll({}, function(cookies) {
					nativeForEach.call(cookies, function(cookie) {
						chrome.cookies.remove({
							url: "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path,
							name: cookie.name
						}, function(details) {});
					});
				});
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