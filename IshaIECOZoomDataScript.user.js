// ==UserScript==
// @name         Isha PRS Zoom Script
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  this is IEO Admin script (zoom link)
// @author       You
// @match        https://prs.innerengineering.com/ieo/newadmin/iecsoAdminMgmt.php
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        GM_setClipboard
// @require https://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==

var msg = '';

(function() {
    'use strict';

    document.getElementById('searchType0').checked = true;
    document.getElementById('email').focus();

    if(document.getElementById('iecsouser').style.display == '' || document.getElementById('iecsouser').style.display == 'block')
    {
        msg += $('#iecsouser .dl-horizontal dd')[1].innerHTML.replace('&nbsp;', '') + ', ';
        msg += $('#iecsouser .dl-horizontal dd')[2].innerHTML.replace('&nbsp;', '') + ', ';
        msg += $('#iecsouser .dl-horizontal dd')[4].innerHTML.replace('&nbsp;', '') + ', ';
        msg += $('#iecsouser .dl-horizontal dd')[5].innerHTML.replace('&nbsp;', '') + ', ';

        msg += $('#sample_2 tr:last td:nth-child(6)').text();

        GM_setClipboard (msg);
        alert('Message copied!!!');
    }
})();


