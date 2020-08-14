# Senpri Userscripts

Userscripts to enhance the DMM browsergame 戦乱プリンセス

To use them. you will need a browser extension that allows you to install userscripts. These scripts were tested with [Tampermonkey](https://tampermonkey.net), however you should be able to use Greasemonkey or other, similar extensions as well.

### senpri.ui.js

Enables selecting text in certain places so you can copy (and e.g. paste into Google Translate). Since the HTML used to render text elements isn't unified, each element has to be added manually. Thus, only guild chat (sidebar & fullscreen) and update notes are currently covered.


### senpri.rantou.js

A win/loss tracker for the Dairantou (大乱闘) event. The last battle result versus an opponent is displayed by a border on the opponent choice screen.

Color codes are:
* light green: double win
* dark green: draw, ATK round won
* light purple: draw, DEF round won
* red: double loss
* turquoise: draw (no longer used)

Notes:
* Dairantou/Choudairantou mode is not taken into consideration, so if you have bonus cards in your deck the results may differ compared to regular mode.
* You can reset the data in Tampermonkey in the "Storage" tab for the script. The tab is only visible if you set Tampermoney to **Advanced** config mode in settings. To reset the data, put `{}` into the text box and save.
