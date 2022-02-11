// ==UserScript==
// @name         New IEO Portal Script
// @namespace    http://tampermonkey.net/
// @version      4.2
// @description  this is IEO New Admin script
// @author       You
// @match        https://prs-admin.innerengineering.com/?kdr=eyJyb3V0ZSI6IkFwcC9NYWluL2llY29zdXBwb3J0IiwiYWN0aW9uIjoiaW5kZXgifQ==
// @icon         https://www.google.com/s2/favicons?domain=innerengineering.com
// @grant        GM_setClipboard
// @require https://code.jquery.com/jquery-1.8.3.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

var msg = 'No record found';
var firstidx = 0;
var secondidx = 0;
var CurrentWeek = false;
var CurrentDate = new Date;
var CurrentDay = 0;
var dt;
//
//  Sanity check script for 07 - 13 Feb 2022 IECO
//
var InitiationDate = new Date(2022, 1, 13);
var IniClass3Time = new Date(2022, 1, 13, 9, 30, 0);
var OverseasSessions =[3324,3325,3327];
var array = [
   [7, 8],
   [9, 10],
   [11, 12]
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
        if($('.card-header:contains("Participant Details")').parent().children('.card-body:contains("No record found")').length == 1){
        GM_setClipboard ("No IECO Record Found");
        alert('Message copied!!!');
        return;
        }
   //      if($( "table tbody tr" ).length == 0){
   //      msg = 'No Sessions Data';
   //      GM_setClipboard (msg);
   //     alert('Message copied!!!');
   //     return;
   //     }
        var classId = $('table tbody tr:first-child td:nth-child(2)').html().split('|')[0];
        var classDate = $('table tbody tr:first-child td:nth-child(2)').html().split('|')[1];
        var RegInitProgId = $('table tbody tr:first-child td:nth-child(4)').html().split('|')[0];
        var RegInitDate = $('table tbody tr:first-child td:nth-child(4)').html().split('|')[1];
        var RegInitDt = RegInitDate.slice(9,11);
        var RegInitMo = RegInitDate.slice(6,8);
        var RegInitYr = RegInitDate.slice(1,5);
        var dt = classDate.slice(classDate.indexOf('<br>') - 2, classDate.indexOf('<br>'));
        var RegClsDate = dt;
        var StartDate = new Date;
        StartDate.setDate(InitiationDate.getDate() - 6); // 6 - Week long IECO     2 - Weekend IECO
        var CurrentDt= new Date().getDate();
        CurrentDay = new Date().getDay();
        var CurrentWeekend = new Date;
        var CurrentHr= new Date().getHours();
        var CurrentMn= new Date().getMinutes();
        CurrentWeekend.setDate(CurrentDate.getDate() + ((7-CurrentDay) % 7));

        if (CurrentWeekend.getDate() == InitiationDate.getDate() && CurrentWeekend.getMonth() == (InitiationDate.getMonth())) {
            CurrentWeek = true;
        }
        var SupScript = "";
        var RegClsDay = 0;
        firstidx = -1;
        var msgTemp = '=SPLIT("';
        if (RegInitDt == InitiationDate.getDate() && RegInitMo == (InitiationDate.getMonth()+1))
        {
        for(var i = 0; i < array.length; i++)
        {
            if(array[i][0] == parseInt(dt, 10))
            {
                dt = array[i][0] + '-' + array[i][1];
                SupScript = SuperScript(array[i][1]);
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
        secondidx = 2;
        if ((CurrentHr * 100 + CurrentMn) > 929 ) {
        secondidx = 3;
        }
        }
        if (OverseasSessions.length != 0)
        {
        for(var idx = 0; idx < OverseasSessions.length; idx++)
        {
        if (classId == OverseasSessions[idx])
        {
        msgTemp += 'Overseas IECO Particpant"&CHAR(10)&"';
        }
        }
        }
        } else
        {
        msgTemp += 'Other IECO Particpant"&CHAR(10)&"';
        msgTemp += 'Program Id: ' + parseInt(RegInitProgId, 10).toString() + ' "&CHAR(10)&"';
        msgTemp += RegInitDt.toString() + SuperScript(RegInitDt) + ' ' + monthName[parseInt(RegInitMo)-1] + ' ' + RegInitYr + '", "^")';
        GM_setClipboard (msgTemp);
        alert('Message copied!!!');
        return;
        }
        var mon = parseInt(classDate.split('-')[1]);
        var year = parseInt(classDate.split('-')[0]);

        if (RegClsDay != firstidx && CurrentDay != 0 && CurrentWeek)
        {
        msgTemp += prefix[RegClsDay] + ', "&CHAR(10)&"' + dt.toString() + SupScript + ' ' + monthName[mon - 1] + ', "&CHAR(10)&"';
        } else {
        msgTemp += dt.toString() + SupScript + ' ' + monthName[mon - 1] + ' ' + year + ', "&CHAR(10)&"';
        }
        var hr = classDate.substr(classDate.indexOf('<br>') + 4, 5);

        msgTemp += hr + ' hrs ' + ((parseInt(classDate.substr(classDate.indexOf('<br>') + 4, 2), 10) > 17) ? 'Evening' : 'Morning');
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
        if($( "table tbody tr" ).length == 1){
        msg += '"&CHAR(10)&"No Sessions Data", "^")';
        GM_setClipboard (msg);
        alert('Message copied!!!');
        return;
        }
        $( "table tbody tr" ).each(function() {
            if(!blLast)
            {
                if (dayidx == -1 && $(this).find('td:nth-child(1)').html().trim() != 'Session 1')
                {
                msg += ',"&CHAR(10)&"Session 1 - No Data'+ ',"&CHAR(10)&"Session 2 - No Data';
                }
                msg += ',"&CHAR(10)&"' + $(this).find('td:first-child').html().trim() + ' - ' + $(this).find('td:nth-child(2)').html().trim();
               //
               // Heartbeat detail is picked only for 'Joined' or 'Revoked' or 'Completed' status
               // and also only for the current day
               //
               dayidx = dayidx + 1;
               CurrentDate = new Date;
               if(($(this).find('td:nth-child(2)').html().trim() == 'Joined' || $(this).find('td:nth-child(2)').html().trim() == 'Completed' || $(this).find('td:nth-child(2)').html().trim() == 'Revoked') && $(this).find('td:nth-child(4)').html().trim() != '-' && CurrentWeek && dayidx == secondidx)
               msg += ',"&CHAR(10)&"Heartbeat @ ' + addZero(CurrentDate.getHours()) + ':' + addZero(CurrentDate.getMinutes()) + ' - ' + $(this).find('td:nth-child(4)').html().trim();
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
function SuperScript(i) {
  var SupScpt = ["th ","st ","nd ","rd ","th ","th ","th ","th ","th ","th "];
  var reminder = i % 10;
  var SpScpt = SupScpt[reminder];
  if (i > 10 && i < 14) SpScpt = "th";
  i = SpScpt;
  return i;
}
