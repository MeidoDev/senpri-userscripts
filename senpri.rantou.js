// ==UserScript==
// @name         Senpri Rantou
// @namespace    meidodev.senpri.rantou
// @version      1.1
// @description  Dairantou Helper
// @author       Meidodev
// @match        https://app.senpri.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

window.SenpriRantou = (function() {
    "use strict";

    const
        initRivalSelection = function() {
            //console.log('Rival Selection');

            $('.battleSelectRivalRivalList__selectRivalBtnA').each(function() {
                const url = new URL(this.href);
                const rID = url.searchParams.get('rivalID');

                if (rID) {
                    // Check if there's any data on the current opponent
                    const rData = GM_getValue(`meidodev.senpri.rantou.rival_data.${rID}`, false);

                    if (rData !== false) {
                        let bColor = 'transparent';
                        switch (rData) {
                            case 'w':
                                bColor = 'lightgreen';
                                break;

                            case 'm':
                                bColor = 'turquoise';
                                break;

                            case 'm1':
                                bColor = 'seagreen';
                                break;

                            case 'm2':
                                bColor = 'fuchsia';
                                break;

                            case 'l':
                                bColor = 'red';
                                break;
                        }

                        $(this).css('border', `3px solid ${bColor}`);
                    }

                    $(this).on('click', function() {
                        GM_setValue('meidodev.senpri.rantou.last_rival', rID);
                        //console.log(`Registered rival ${rID}`);
                    });
                }
            });
        },

        initBattleResult = function() {
            console.log('Battle Result');

            const rID = GM_getValue('meidodev.senpri.rantou.last_rival', false);
            if (rID === false) {
                return;
            }

            // Determine the result of the ATK round
            const resultImgContainer = $('div[class^="eventPvpBattleResultSummery__crownImg"]');
            const resultAtk = resultImgContainer.attr('class').indexOf('--win') > 0;

            // Determine the result of the DEF round
            let resultDef = true;
            resultImgContainer.parent().children('.eventPvpBattleResultSummery__resultTitle').each(function() {
                if (this.innerHTML === '防衛戦で敗北') {
                    resultDef = false;
                }
            });

            let resultTotal = resultAtk ? 'w' : 'l';
            if (resultAtk != resultDef) {
                resultTotal = resultAtk ? 'm1' : 'm2';
            }

            //console.log(`Result for rival ${rID}: ${resultTotal}`);
            GM_setValue(`meidodev.senpri.rantou.rival_data.${rID}`, resultTotal);
            GM_deleteValue('meidodev.senpri.rantou.last_rival');
        }
    ;

    return {
        init: function() {
            // Determine what page we on and initialize the appropriate handler
            const currentURL = new URL(window.location.href),
                  urlC = currentURL.searchParams.get('c'),
                  urlF = currentURL.searchParams.get('f');

            if (urlC === 'EventPvp' && urlF === 'selectRival') {
                initRivalSelection();
            } else if (urlC === 'EventPvpBattle' && urlF === 'battleResult') {
                initBattleResult();
            }

        }
    };
})();

window.SenpriRantou.init();
