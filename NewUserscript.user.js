// ==UserScript==
// @name         Isha PRS Script
// @namespace    http://tampermonkey.net/
// @version      1.4.1
// @description  try to take over the world!
// @author       You
// @match        https://prs.innerengineering.com/ieo/newadmin/iecsoAdminMgmt.php
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        GM_setClipboard
// ==/UserScript==

var myInt;
var msg = '';
var classIndex = 1;
(function() {
    'use strict';

    document.getElementById('searchType0').checked = true;
    document.getElementById('email').focus();


    if(document.getElementById('iecsouser').style.display == '' || document.getElementById('iecsouser').style.display == 'block')
    {
        var str = document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length - 1].getElementsByTagName('td')[0].innerHTML;

        var dt = str.slice(str.indexOf('<br>') - 2, str.indexOf('<br>'));
        msg = dt + "th, ";

        var hr = str.substr(str.indexOf('<br>') + 4, 2);
        msg += (parseInt(hr, 10) > 17) ? 'Evening' : 'Morning';
        msg += ', ';

        var newHTML = str.slice(0, str.indexOf(":") + 1);
        newHTML += '<b>' + str.substring(str.indexOf(":") + 1, str.indexOf("Timezone")) + '</b>';
        newHTML += str.substring(str.indexOf("Timezone"));
        
        var dte = new Date();
        var day = dte.getDate();

        if(day.toString() == '19')
        {
        
        }
        else
        {
            if(parseInt(day, 10) % 2 == 1)
            {
                classIndex = 0;
            }
            else
            {
                classIndex = 1;
            }
        }

        document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length - 1].getElementsByTagName('td')[0].innerHTML = newHTML;

        document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length - 1].getElementsByTagName('ul')[1].getElementsByTagName('a')[document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('ul')[1].getElementsByTagName('a').length - 1].click();

        myInt = setInterval(myFunc, 1000);
    }
})();

function myFunc()
{
    if(document.getElementById('attndInfo').style.display == '' || document.getElementById('attndInfo').style.display == 'block')
    {
        var className = document.getElementById('attndInfo').getElementsByTagName('div')[classIndex].getElementsByTagName('h4')[0].innerHTML;
        var status = document.getElementById('attndInfo').getElementsByTagName('div')[classIndex].getElementsByTagName('dd')[document.getElementById('attndInfo').getElementsByTagName('div')[0].getElementsByTagName('dd').length - 2].innerHTML.replace('&nbsp;', '');
        var secs = document.getElementById('attndInfo').getElementsByTagName('div')[classIndex].getElementsByTagName('dd')[document.getElementById('attndInfo').getElementsByTagName('div')[0].getElementsByTagName('dd').length - 1].innerHTML.replace('&nbsp;', '');

        var d = new Date();
        var hrs = d.getHours();
        var min = d.getMinutes();
        var time = (hrs.toString().length == 1 ? '0' + hrs.toString() : hrs) + ':' + (min.toString().length == 1 ? '0' + min.toString() : min);


        msg += 'Class: ' + className + ', ';
        msg += 'Status: ' + status + ', ';
        msg += 'Secs: ' + secs + ' @ ' + time;

        GM_setClipboard (msg);
        clearInterval(myInt);
        alert('Message copied!!!');
    }
}
