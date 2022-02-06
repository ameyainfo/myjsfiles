// ==UserScript==
// @name         Isha PRS Script
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  this is IEO Admin script
// @author       You
// @match        https://prs.innerengineering.com/ieo/newadmin/iecsoAdminMgmt.php
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        GM_setClipboard
// @require https://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==

//
// Sanity check script for the earlier version of IEO portal
//
var myInt;
var msg = '=Split("';
var msgTemp = '';
var rollnumber = ' ';
var classIndex = 1;
var CurrClassIndex = 0;
var CurrentWeek = false;
var CurrentProg = false;
var RegClsIdx = -1
var iniClass3Date = new Date(2022, 1, 13);
var iniClass3Time = new Date(2022, 1, 13, 9, 30, 0);

var array = [
    [7, 8],
    [9, 10],
    [11, 12]
];
var OverseasProg =[3324,3325,3327];

var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

(function() {
    'use strict';

    document.getElementById('searchType0').checked = true;
    document.getElementById('email').focus();

    document.addEventListener("keyup", myFunction);

    function myFunction() {
        var x = event.which || event.keyCode;
        if(x == 47)
        {
            document.getElementById('email').focus();
            document.getElementById('email').value = '';
        }
    }

    if(document.getElementById('iecsouser').style.display == '' || document.getElementById('iecsouser').style.display == 'block')
    {
        var str = document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length - 1].getElementsByTagName('td')[0].innerHTML;
        var str2 = document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length - 1].getElementsByTagName('td')[1].innerHTML;
        rollnumber = (document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length - 1].getElementsByTagName('td')[5].innerHTML);
        var dte = new Date();
        var day = dte.getDate();
        var xDate = str2.slice(0, str2.indexOf('<br>'));
        var RegInitMo = parseInt(xDate.split('-')[1]);
        var RegInitYr = parseInt(xDate.split('-')[0]);
        var RegInitDt = str2.slice(str2.indexOf('<br>') - 2, str2.indexOf('<br>'));

        var a = str.slice(0, str.indexOf('<br>'));
        var fullDate = a.slice(a.indexOf(':') + 1);
        var mon = parseInt(fullDate.split('-')[1]);
        var yr = parseInt(fullDate.split('-')[0]);
        var dt = str.slice(str.indexOf('<br>') - 2, str.indexOf('<br>'));
        if(RegInitDt == iniClass3Date.getDate() && RegInitMo == (iniClass3Date.getMonth() + 1))
        {
        CurrentProg = true;
        }
        if(CurrentProg)
        {
        for(var i = 0; i < array.length; i++)
        {
            if(array[i][0] == parseInt(dt, 10))
            {
                RegClsIdx = i;
                dt = array[i][0] + '-' + array[i][1];
                CurrClassIndex = 0;
                var SupScrpt = SuperScript(array[i][1]);
                if (day == array[i][1]) CurrClassIndex = 1;
            }
        }

        msgTemp += dt.toString() + SupScrpt + monthName[mon - 1] + ' ' + yr + '"&CHAR(10)&"';

        var hr = str.substr(str.indexOf('<br>') + 4, 5);
        msgTemp += hr + ' hrs ' + ((parseInt(str.substr(str.indexOf('<br>') + 4, 2), 10) > 17) ? 'Evening' : 'Morning') + ' "&CHAR(10)&"';

        var newHTML = str.slice(0, str.indexOf(":") + 1);
        newHTML += '<font style="color:red;font-size:15px;"><b>' + str.substring(str.indexOf(":") + 1, str.indexOf("Timezone")) + '</b></font>';
        newHTML += str.substring(str.indexOf("Timezone"));
        } else
        {
        msgTemp += dt.toString() + SuperScript(dt) + monthName[mon - 1] + ' ' + yr + '"&CHAR(10)&"';
        }
        document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length - 1].getElementsByTagName('td')[0].innerHTML = newHTML;

        $('#sample_2 > tbody:last-child tr:last-child td:last-child ul li:last-child a').click()

        myInt = setInterval(myFunc, 1000);
    }
})();

function myFunc()
{

    if((document.getElementById('attndInfo').style.display == '' || document.getElementById('attndInfo').style.display == 'block') &&
       document.getElementById('attndInfo').getElementsByTagName('div')[classIndex - 1].getElementsByTagName('h4')[0].innerHTML != 'undefined')
    {
        try
        {
            var d = new Date();
            var hrs = d.getHours();
            var min = d.getMinutes();
            var time = (hrs.toString().length == 1 ? '0' + hrs.toString() : hrs) + ':' + (min.toString().length == 1 ? '0' + min.toString() : min);

            var classId = $('#attndInfo div:nth-child(1) dd')[0].innerHTML.replace('&nbsp;', '')
            var Overseas = false;
            var Others = false;
            if (OverseasProg.length != 0)
            {
            for(var idx = 0; idx < OverseasProg.length; idx++)
            {
            if (classId == OverseasProg[idx])
            {
                msg += 'Overseas IECO participant"&CHAR(10)&"';
                msg += 'Program Id: ' + classId + '"&CHAR(10)&"';
                Overseas = true;
            }
            }
            }
            if (!CurrentProg)
            {
                msg += 'Other IECO participant "&CHAR(10)&"Program Id: ' + classId + '"&CHAR(10)&"';
                Others = true;
            }
            msg += msgTemp;
            if (!Overseas && !Others)
            {
            msg += $('#attndInfo div:nth-child(1) h4').text() + ' - ' + $('#attndInfo div:nth-child(1) dd')[2].innerHTML.replace('&nbsp;', '') + ', "&CHAR(10)&"';
            if(d.getDay() != (RegClsIdx*2 + 1) && (d.getDay() % 2) == 0 )
            {
            msg += $('#attndInfo div:nth-child(2) h4').text() + ' - ' + $('#attndInfo div:nth-child(2) dd')[2].innerHTML.replace('&nbsp;', '') + ', "&CHAR(10)&"';
            }
            if(d.getDay() == 0)
            {
                msg += $('#attndInfo div:nth-child(3) h4').text() + ' - ' + $('#attndInfo div:nth-child(3) dd')[2].innerHTML.replace('&nbsp;', '') + ', "&CHAR(10)&"';

                if(new Date() > iniClass3Time)
                    msg += $('#attndInfo div:nth-child(4) h4').text() + ' - ' + $('#attndInfo div:nth-child(4) dd')[2].innerHTML.replace('&nbsp;', '') + ', "&CHAR(10)&"';
            }

            var secs = '';
            if(d.getDay() == 0)
            {
                if(new Date() > iniClass3Time)
                    secs = $('#attndInfo div:nth-child(4) dd')[3].innerHTML.replace('&nbsp;', '');
                else
                    secs = $('#attndInfo div:nth-child(3) dd')[3].innerHTML.replace('&nbsp;', '');
            }
            else
            {
                secs = document.getElementById('attndInfo').getElementsByTagName('div')[CurrClassIndex].getElementsByTagName('dd')[document.getElementById('attndInfo').getElementsByTagName('div')[0].getElementsByTagName('dd').length - 1].innerHTML.replace('&nbsp;', '');
            }

            if(secs != 'null')
            {
                var minutes = Math.floor(parseInt(secs, 10)/60);
                var seconds = ((parseInt(secs, 10)/60) - minutes) * 60;
                msg += 'Heartbeat @ '+ time + ': ' + minutes + ':' + seconds.toFixed(0) + ' mins';
            }
            }
			msg += '^' + rollnumber + '","^")';

            GM_setClipboard (msg);
            alert('Message copied!!!');
        }
        catch(e)
        {
            alert(e);
        }
        clearInterval(myInt);
    }
}
function SuperScript(i) {
  var SupScpt = ["th ","st ","nd ","rd ","th ","th ","th ","th ","th ","th "];
  var reminder = i % 10;
  var SpScpt = SupScpt[reminder];
  if (i > 10 && i < 14) SpScpt = "th";
  i = SpScpt;
  return i;
}
