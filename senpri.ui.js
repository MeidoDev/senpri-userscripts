// ==UserScript==
// @name         Senpri UI
// @namespace    meidodev.senpri.ui
// @version      1.1
// @description  UI enhancements for Senpri
// @author       Meidodev
// @match        https://app.senpri.com/*
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
	},
    moveRaidListRefreshButton = function() {
        $('a.eventRaidBossList__refreshBtn').insertAfter('div.eventRaidBossList__finder--self');
    };

	return {
		init: function() {
			setSelectable();

			// Install an event listener for content that's injected via AJAX
			$(document).ajaxSuccess(function() {
				setSelectable();
			});

            // URL-specific stuff
            const curURL = new URL(window.location);
            if (curURL.searchParams.get('c') === 'EventRaid' && curURL.searchParams.get('f') === 'bossList') {
                moveRaidListRefreshButton();
            }

		}
	};
})();

window.SenpriUI.init();
