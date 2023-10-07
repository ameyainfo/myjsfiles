// ==UserScript==
// @name         Sanity Script 2023 New IEO
// @namespace    http://tampermonkey.net/
// @version      6.0
// @description  try to take over the world!
// @author       You
// @match        https://prs-admin.innerengineering.com/?kdr=eyJyb3V0ZSI6IkFwcC9QUlNNYW5hZ2VtZW50L2llb3N1cHBvcnQiLCJhY3Rpb24iOiJpbmRleCIsInBhcmFtcyI6bnVsbH0=
// @match        https://prs-admin.innerengineering.com/index?kdr=eyJyb3V0ZSI6IkFwcC9QUlNNYW5hZ2VtZW50L2llb3N1cHBvcnQiLCJhY3Rpb24iOiJpbmRleCIsInBhcmFtcyI6bnVsbH0=
// @grant        GM_setClipboard
// @require https://code.jquery.com/jquery-1.8.3.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */
var msg = '';
waitForKeyElements (".table-striped", myFunc);

var myInt;
(function() {
    'use strict';

    myInt = setInterval(myFunc, 1000);

    // Your code here...
})();

function myFunc(){
    let text = $('table thead tr:first-child th:nth-child(1)').html().trim();
    let SessionYes = text.includes("Session");
    let RollNumberYes = text.includes("Roll No. | Reg Id");
    if(RollNumberYes || SessionYes)
    {
        clearInterval(myInt);
    }
    else
    {
        return;
    }
    if(SessionYes)
    {
    alert($( "table tbody tr" ).length);
    return;
    }
    msg = '=SPLIT("';
    var test = $('.card-header:contains("User Course Progress")').parent().children('.card-body:contains("Current Step")').html();
    var CurrentStep = test.slice(test.indexOf('Current Step') + 44, test.indexOf('Current Step')+45);
    var language = test.slice(test.indexOf('Language') + 40, test.indexOf('Language')+42);
    var rollNumber = $('table tbody td:nth-child(2)').html().split('|')[0];
    var classDetail = $('table tbody td:nth-child(3)').html().split('<br>')[0];
    var progDetail = classDetail.trim();
    msg += 'Initiation:"&CHAR(10)&"' + progDetail + '"'
    msg += '&CHAR(10)&"Current Step: ' + CurrentStep + '^' + rollNumber + '", "^")';
    GM_setClipboard (msg);
    alert('Message copied!!!');
    return;
    }
