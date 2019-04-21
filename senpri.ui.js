// ==UserScript==
// @name         Senpri UI
// @namespace    meidodev.senpri.ui
// @version      1.0
// @description  UI enhancements for Senpri
// @author       Meidodev
// @match        http://app.senpri.com/*
// @grant        none
// ==/UserScript==

/**
 * Functionality:
 *
 *	- Allow selecting text in guildchat and announcement sections
 *
 */

window.SenpriUI = (function() {
	"use strict";

	var

	setSelectable = function() {
		$('.groupBoardArea__postText--bodyinner').css('user-select', 'text');
		$('.mypageAdminInfoArea__detailTextArea').css('user-select', 'text');
		$('.mypageAdminInfoArea__detailTextArea').children().css('user-select', 'text');
	};

	return {
		init: function() {
			setSelectable();

			// Install an event listener for content that's injected via AJAX
			$(document).ajaxSuccess(function() {
				setSelectable();
			});
		}
	};
})();

window.SenpriUI.init();
