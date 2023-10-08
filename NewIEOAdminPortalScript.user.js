// ==UserScript==
// @name         Sanity Script 2023 10 07
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://prs-admin.innerengineering.com/?kdr=eyJyb3V0ZSI6IkFwcC9QUlNNYW5hZ2VtZW50L2llb3N1cHBvcnQiLCJhY3Rpb24iOiJpbmRleCIsInBhcmFtcyI6bnVsbH0=
// @match        https://prs-admin.innerengineering.com/index?kdr=eyJyb3V0ZSI6IkFwcC9QUlNNYW5hZ2VtZW50L2llb3N1cHBvcnQiLCJhY3Rpb24iOiJpbmRleCIsInBhcmFtcyI6bnVsbH0=
// @icon         https://www.google.com/s2/favicons?sz=64&domain=innerengineering.com
// @grant        GM_setClipboard
// @require https://code.jquery.com/jquery-1.8.3.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

var msg = '';
var msgTemp = '';
var rollno = '';
var BackfromSession = false;
var pageCount = 0;

waitForKeyElements (".table-striped", myFunc);

var myInt;
(function() {
    'use strict';

    myInt = setInterval(myFunc, 1000);

    // Your code here...
})();

function myFunc(){
    let text = $('table thead tr:first-child th:nth-child(1)').html().trim();
    let RollNumberYes = text.includes("Roll No");
    let SessionYes = text.includes("Session");
    if(RollNumberYes || SessionYes)
    {
        clearInterval(myInt);
    }
    else {
        return;
    }
    if(RollNumberYes)
    {
        if (BackfromSession) {
            BackfromSession = false;
            sessionStorage.setItem('backin', BackfromSession);
            return;
        }
    msg = '=SPLIT("';
    var test = $('.card-header:contains("User Course Progress")').parent().children('.card-body:contains("Current Step")').html();
    var CurrentStep = test.slice(test.indexOf('Current Step') + 44, test.indexOf('Current Step')+45);
    var language = test.slice(test.indexOf('Language') + 40, test.indexOf('Language')+42);
    rollno = $('table tbody td:nth-child(2)').html().split('|')[0];
    var classDetail = $('table tbody td:nth-child(3)').html().split('<br>')[0];
    var progDetail = classDetail.trim();
    var progDate = progDetail.slice(16,27)
    msg += 'Initiation:"&CHAR(10)&"' + progDetail + '"'
    msg += '&CHAR(10)&"Current Step: ' + CurrentStep;
//    if(progDate.trim() != '2023-10-07') {
//    msg += '^' + rollno + '", "^")';
//    GM_setClipboard (msg);
//    alert('Message copied!!!');
//    return;
//    }
    sessionStorage.setItem('clicked', msg);
    sessionStorage.setItem('rollnum', rollno);
    $('table tbody td:last-child a:contains("Session Details")').get(0).click();
     }
     else
     {
        msg = sessionStorage.getItem('clicked');
        rollno = sessionStorage.getItem('rollnum');
        progDate = sessionStorage.getItem('pgmdat');
        var CurrentDate = new Date;
        var CurrentDay = new Date().getDay();
        var Hrs = CurrentDate.getHours();
        var Mins = CurrentDate.getMinutes();
        var trcount = 1
        $( "table tbody tr" ).each(function() {
        msg += '"&CHAR(10)&"' + $(this).find('td:nth-child(1)').html().trim() + ',' + $(this).find('td:nth-child(2)').html().trim() + ',' + $(this).find('td:nth-child(5)').html().trim()
        if ((trcount == 2 && (Hrs*100+Mins) < 930) || (trcount == 3 && (Hrs*100+Mins) > 929)) msg += ',"&CHAR(10)&"Heartbeat @ ' + (Hrs.toString().length == 1 ? '0' + Hrs : Hrs) + ':' + (Mins.toString().length == 1 ? '0' + Mins : Mins) + ' - ' + $(this).find('td:nth-child(7)').html().trim();
        trcount = trcount +1;
        });
        msg += '^' + rollno + '", "^")';
        BackfromSession = true;
        sessionStorage.setItem('backin', BackfromSession);
        sessionStorage.setItem('count', pageCount);
        $('button:contains("Back")').get(0).click();
        GM_setClipboard (msg);
        alert('Message copied!!!');
        setTimeout(focusFunc,3000);
        return;
        }
        }
        function focusFunc() {
        $('#participant').focus();
        }
