// ==UserScript==
// @name         Isha PRS Script
// @namespace    http://tampermonkey.net/
// @version      1.20
// @description  this is IEO Admin script
// @author       You
// @match        https://prs.innerengineering.com/ieo/newadmin/iecsoAdminMgmt.php
// @match        https://prs.innerengineering.com/ieo/newadmin/iecsomgmt.php
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        GM_setClipboard
// @require https://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==

var myInt;
var msg = '="';
var msgTemp = '';
var classIndex = 1;
var CurrClassIndex = 0;
var iniClass3Date = new Date(2021, 11, 12);
var iniClass3Time = new Date(2021, 11, 12, 9, 30, 0);
var dt;

var array = [
    [6, 7],
    [8, 9],
    [10, 11]
];

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

        var dte = new Date();
        var day = dte.getDate();

        var a = str.slice(0, str.indexOf('<br>'));
        var fullDate = a.slice(a.indexOf(':') + 1);
        var mon = parseInt(fullDate.split('-')[1]);
        var yr = parseInt(fullDate.split('-')[0]);

        dt = str.slice(str.indexOf('<br>') - 2, str.indexOf('<br>'));

        for(var i = 0; i < array.length; i++)
        {
            if(array[i][0] == parseInt(dt, 10))
            {
                /*
                if(array[i][0] == day || array[i][1] == day)
                {
                    dt = day.toString();
                }
                else if(day == 19)
                {
                    dt = array[i][0] + '-' + array[i][1];
                }
                */
                dt = array[i][0] + '-' + array[i][1];
            }
        }

        msgTemp += dt.toString() + 'th ' + monthName[mon - 1] + ', "&CHAR(10)&"';

        var hr = str.substr(str.indexOf('<br>') + 4, 5);
        //msg += (parseInt(hr, 10) > 17) ? 'Evening' : 'Morning';
        msgTemp += hr + ' hrs ' + ((parseInt(str.substr(str.indexOf('<br>') + 4, 2), 10) > 17) ? 'Evening' : 'Morning') + ', "&CHAR(10)&"';

        var newHTML = str.slice(0, str.indexOf(":") + 1);
        newHTML += '<font style="color:red;font-size:15px;"><b>' + str.substring(str.indexOf(":") + 1, str.indexOf("Timezone")) + '</b></font>';
        newHTML += str.substring(str.indexOf("Timezone"));

        if(day.toString() == '19')
        {
            console.log('Shambho');
        }
        else
        {
            if(parseInt(day, 10) % 2 == 1)
            {
                CurrClassIndex = 0;
            }
            else
            {
                CurrClassIndex = 1;
            }
        }

        document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length - 1].getElementsByTagName('td')[0].innerHTML = newHTML;

        //ocument.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length - 1].getElementsByTagName('ul')[1].getElementsByTagName('a')[document.getElementById('sample_2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('ul')[1].getElementsByTagName('a').length - 1].click();
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
            /*
            if(classIndex > 0)
            {
                var className1 = document.getElementById('attndInfo').getElementsByTagName('div')[classIndex - 1].getElementsByTagName('h4')[0].innerHTML;
                var status1 = document.getElementById('attndInfo').getElementsByTagName('div')[classIndex - 1].getElementsByTagName('dd')[document.getElementById('attndInfo').getElementsByTagName('div')[0].getElementsByTagName('dd').length - 2].innerHTML.replace('&nbsp;', '');
                msg += className1 + ' - ' + status1 + ',  ';
            }

            var className = document.getElementById('attndInfo').getElementsByTagName('div')[classIndex].getElementsByTagName('h4')[0].innerHTML;
            var status = document.getElementById('attndInfo').getElementsByTagName('div')[classIndex].getElementsByTagName('dd')[document.getElementById('attndInfo').getElementsByTagName('div')[0].getElementsByTagName('dd').length - 2].innerHTML.replace('&nbsp;', '');
            var secs = document.getElementById('attndInfo').getElementsByTagName('div')[CurrClassIndex].getElementsByTagName('dd')[document.getElementById('attndInfo').getElementsByTagName('div')[0].getElementsByTagName('dd').length - 1].innerHTML.replace('&nbsp;', '');
*/
            var d = new Date();
            var hrs = d.getHours();
            var min = d.getMinutes();
            var time = (hrs.toString().length == 1 ? '0' + hrs.toString() : hrs) + ':' + (min.toString().length == 1 ? '0' + min.toString() : min);

            var classId = $('#attndInfo div:nth-child(1) dd')[0].innerHTML.replace('&nbsp;', '')
            if(classId == '3223' || classId == '3224' || classId == '3225')// || classId == '3183')
            {
                msg += 'Overseas participant, "&CHAR(10)&"';
                msg += 'Program Id: ' + classId + ', "&CHAR(10)&"';
            }

            if(parseInt(classId, 10) < 3209 || parseInt(classId, 10) > 3222)
                msg += 'Earlier Program Id: ' + classId + ', "&CHAR(10)&"';

            msg += msgTemp;

            msg += $('#attndInfo div:nth-child(1) h4').text() + ' - ' + $('#attndInfo div:nth-child(1) dd')[2].innerHTML.replace('&nbsp;', '') + ', "&CHAR(10)&"';
            msg += $('#attndInfo div:nth-child(2) h4').text() + ' - ' + $('#attndInfo div:nth-child(2) dd')[2].innerHTML.replace('&nbsp;', '') + ', "&CHAR(10)&"';

            if(new Date() > iniClass3Date)// || 1 == 1)
            {
                msg += $('#attndInfo div:nth-child(3) h4').text() + ' - ' + $('#attndInfo div:nth-child(3) dd')[2].innerHTML.replace('&nbsp;', '') + ', "&CHAR(10)&"';

                if(new Date() > iniClass3Time)
                    msg += $('#attndInfo div:nth-child(4) h4').text() + ' - ' + $('#attndInfo div:nth-child(4) dd')[2].innerHTML.replace('&nbsp;', '') + ', "&CHAR(10)&"';
                //msg += 'Status: ' + status + ', ';
            }
            else
            {
                var isSet = false;
                for(var i = 0; i < array.length; i++)
                {
                    if(array[i][0] == parseInt(dt, 10))
                    {
                        msg += $('#attndInfo div:nth-child(1) h4').text() + ' - ' + $('#attndInfo div:nth-child(1) dd')[2].innerHTML.replace('&nbsp;', '') + ', "&CHAR(10)&"';
                        isSet = true;
                        break;
                    }
                    else if(array[i][1] == parseInt(dt, 10))
                    {
                        msg += $('#attndInfo div:nth-child(2) h4').text() + ' - ' + $('#attndInfo div:nth-child(2) dd')[2].innerHTML.replace('&nbsp;', '') + ', "&CHAR(10)&"';
                        isSet = true;
                        break;
                    }
                }

                if(!isSet)
                {
                    alert('3');
                    msg += $('#attndInfo div:nth-child(3) h4').text() + ' - ' + $('#attndInfo div:nth-child(3) dd')[2].innerHTML.replace('&nbsp;', '') + ', "&CHAR(10)&"';
                }
            }

            var secs = '';
            if(new Date() > iniClass3Date)// || 1 == 1)
            {
                if(new Date() > iniClass3Time)
                    secs = $('#attndInfo div:nth-child(4) dd')[3].innerHTML.replace('&nbsp;', '');
                else
                    secs = $('#attndInfo div:nth-child(3) dd')[3].innerHTML.replace('&nbsp;', '');
            }
            else
            {
                var isSet = false;
                for(var i = 0; i < array.length; i++)
                {
                    if(array[i][0] == parseInt(dt, 10))
                    {
                        secs = $('#attndInfo div:nth-child(1) dd')[3].innerHTML.replace('&nbsp;', '');
                        isSet = true;
                        break;
                    }
                    else if(array[i][1] == parseInt(dt, 10))
                    {
                        secs = $('#attndInfo div:nth-child(2) dd')[3].innerHTML.replace('&nbsp;', '');
                        isSet = true;
                        break;
                    }
                }

                if(!isSet)
                {
                    secs = $('#attndInfo div:nth-child(3) dd')[3].innerHTML.replace('&nbsp;', '');
                }
                //secs = document.getElementById('attndInfo').getElementsByTagName('div')[CurrClassIndex].getElementsByTagName('dd')[document.getElementById('attndInfo').getElementsByTagName('div')[0].getElementsByTagName('dd').length - 1].innerHTML.replace('&nbsp;', '');
            }

            if(secs != 'null')
            {
                var minutes = Math.floor(parseInt(secs, 10)/60);
                var seconds = ((parseInt(secs, 10)/60) - minutes) * 60;
                msg += 'Heartbeat: ' + minutes + ':' + seconds.toFixed(0) + ' mins';
            }
            else
                msg += 'Heartbeat: null ';

            msg += ' @ ' + time;

            /*
            if(new Date() > iniClass3Time)
                msg += 'Secs: ' + $('#attndInfo div:nth-child(4) dd')[3].innerHTML.replace('&nbsp;', '') + ' @ ' + time;
            else
                msg += 'Secs: ' + $('#attndInfo div:nth-child(3) dd')[3].innerHTML.replace('&nbsp;', '') + ' @ ' + time;
*/

			msg += '"';

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
