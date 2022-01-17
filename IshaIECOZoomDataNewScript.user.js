// ==UserScript==
// @name         IECO Zoom Data New Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://prs-admin.innerengineering.com/?kdr=eyJyb3V0ZSI6IkFwcC9NYWluL2llY29zdXBwb3J0IiwiYWN0aW9uIjoiaW5kZXgifQ==
// @icon         https://www.google.com/s2/favicons?domain=innerengineering.com
// @grant        GM_setClipboard
// ==/UserScript==

var myInt;
(function() {
    'use strict';

    myInt = setInterval(myFunc, 1000);

    // Your code here...
})();

function myFunc(){
    //alert($('table thead tr:first-child th:nth-child(1)').html());
    if($('table thead tr:first-child th:nth-child(1)').html().trim() == 'Roll No.')
    {
        clearInterval(myInt);
    }
    else
        return;

    var str = $('b:contains("First Name")').parent().html().split(':')[1].trim() + ' ' + $('b:contains("Last Name")').parent().html().split(':')[1].trim() + ',';
    str += $('b:contains("Primary Phone")').parent().html().split(':')[1].trim() + ',';
    str += $('b:contains("Email")').parent().html().split(':')[1].trim();

    var msg = '=SPLIT("' + str + '", ",")';
    GM_setClipboard (msg);
    alert('Message copied!!!');
}
