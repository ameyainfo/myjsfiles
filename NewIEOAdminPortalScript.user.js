// ==UserScript==
// @name         New IEO Portal Script
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  this is IEO New Admin script
// @author       You
// @match        https://prs-admin.innerengineering.com/?kdr=eyJyb3V0ZSI6IkFwcC9NYWluL2llY29zdXBwb3J0IiwiYWN0aW9uIjoiaW5kZXgifQ==
// @icon         https://www.google.com/s2/favicons?domain=innerengineering.com
// @grant        GM_setClipboard
// @require https://code.jquery.com/jquery-1.8.3.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

var msg = '';
var firstidx = 0;
var secondidx = 0;
var CurrentWeek = false;
var CurrentDate = new Date;
var CurrentDay = 0;
var Overseas = false;
var dt;

var InitiationDate = new Date(2022, 0, 23);
var IniClass3Time = new Date(2022, 0, 23, 9, 30, 0);
var OverseasSessions =[3324,3325,3327];
var array = [
   [17, 18],
   [19, 20],
   [21, 22]
];

var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var prefix =['Mon/Tue Participant','Wed/Thu Participant','Fri/Sat Participant'];

waitForKeyElements (".table-striped", myFunc);

var myInt;
(function() {
    'use strict';

    myInt = setInterval(myFunc, 1000);

    // Your code here...
})();

function myFunc(){
    if($('table thead tr:first-child th:nth-child(1)').html().trim() == 'Roll No.' ||
      $('table thead tr:first-child th:nth-child(1)').html().trim() == 'Session')
    {
        clearInterval(myInt);
    }
    else
        return;

    var rollno = '';

    if($('table thead tr:first-child th:nth-child(1)').html().trim() == 'Roll No.')
    {
        var classId = $('table tbody tr:first-child td:nth-child(2)').html().split('|')[0];
        var classDate = $('table tbody tr:first-child td:nth-child(2)').html().split('|')[1];
        var RegInitDate = $('table tbody tr:first-child td:nth-child(4)').html().split('|')[1];
        var RegInitDt = RegInitDate.slice(9,11);
        var RegInitMo = RegInitDate.slice(6,8);
        var dt = classDate.slice(classDate.indexOf('<br>') - 2, classDate.indexOf('<br>'));
        var RegClsDate = dt;
        var StartDate = new Date;
        StartDate.setDate(InitiationDate.getDate() - 6); // 6 - Week long IECO     2 - Weekend IECO
        var CurrentDt= new Date().getDate();
        CurrentDay = new Date().getDay();
        var RegClsDay = 0;
        var msgTemp = '=SPLIT("';
        if (RegInitDt == InitiationDate.getDate() && RegInitMo == (InitiationDate.getMonth()+1))
        {
        CurrentWeek = true;
        for(var i = 0; i < array.length; i++)
        {
            if(array[i][0] == parseInt(dt, 10))
            {
                dt = array[i][0] + '-' + array[i][1];
            }
            if(array[i][0] == CurrentDt)
            {
               firstidx = i;
               secondidx = 0;
            }
            if(array[i][1] == CurrentDt)
            {
             firstidx = i;
             secondidx = 1;
            }
            if(array[i][0] == RegClsDate || array[i][1] == RegClsDate)
            {
             RegClsDay = i;
            }
        }
        if (RegClsDay != firstidx)
        {
        secondidx = 1;
        }
        if (CurrentDay == 0)
        {
        secondidx = 3;
        }
        if (OverseasSessions.length != 0)
        {
        for(var idx = 0; idx < OverseasSessions.length; idx++)
        {
        if (classId == OverseasSessions[idx])
        {
        secondidx = 3;
        Overseas = true;
        msgTemp += 'Overseas - IECO, ';
        msgTemp += 'Program Id: ' + parseInt(classId, 10).toString() + ', "&CHAR(10)&"';
        }
        }
        }
        } else
        {
        secondidx = 3;
        msgTemp += 'Other - IECO, ';
        msgTemp += 'Program Id: ' + parseInt(classId, 10).toString() + ', "&CHAR(10)&"';
        }
        var mon = parseInt(classDate.split('-')[1]);
        var year = parseInt(classDate.split('-')[0]);
        if (RegClsDay != firstidx && RegInitDt == InitiationDate.getDate() && RegInitMo == (InitiationDate.getMonth()+1) && !Overseas && CurrentDay != 0)
        {
        msgTemp += prefix[RegClsDay] + ', "&CHAR(10)&"' + dt.toString() + 'th ' + monthName[mon - 1] + ', "&CHAR(10)&"';
        } else {
        msgTemp += dt.toString() + 'th ' + monthName[mon - 1] + ' ' + year + ', "&CHAR(10)&"';
        }
        var hr = classDate.substr(classDate.indexOf('<br>') + 4, 5);

        msgTemp += hr + ' hrs ' + ((parseInt(classDate.substr(classDate.indexOf('<br>') + 4, 2), 10) > 17) ? 'Evening' : 'Morning') + ', "&CHAR(10)&"';
        rollno = $('table tbody tr:first-child td:nth-child(1)').html().trim();

        sessionStorage.setItem('clicked', msgTemp);
        sessionStorage.setItem('rollno', rollno);
        $('table tbody tr:first-child td:last-child a:contains("Session Details")').get(0).click();
     }
     else
     {
        msg = sessionStorage.getItem('clicked');
        rollno = sessionStorage.getItem('rollno');

        var blLast = false;
        var lastSeen = '';
        var dayidx = -1;
        $( "table tbody tr" ).each(function() {
            if(!blLast)
            {
               msg += $(this).find('td:first-child').html().trim() + ' - ' + $(this).find('td:nth-child(2)').html().trim() + ', "&CHAR(10)&"';
               //
               // Heartbeat detail is picked only for 'Joined' or 'Revoked' status
               // and also only for the current day
               //
               CurrentDate = new Date;
               if(($(this).find('td:nth-child(2)').html().trim() == 'Joined' || $(this).find('td:nth-child(2)').html().trim() == 'Revoked') && CurrentWeek)
               msg += 'Heartbeat @ ' + addZero(CurrentDate.getHours()) + ':' + addZero(CurrentDate.getMinutes()) + ' - ' + $(this).find('td:nth-child(4)').html().trim() + ', "&CHAR(10)&"';
               dayidx = dayidx + 1;
               if (dayidx == secondidx)
               {
                   blLast = true;
               }
            }
        });
         msg += '^' + rollno + '", "^")';

        GM_setClipboard (msg);
        alert('Message copied!!!');
        }
}
function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}
