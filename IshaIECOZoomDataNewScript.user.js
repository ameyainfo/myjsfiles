// ==UserScript==
// @name         New IEO Portal Script
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  This is an IEO New Admin script
// @author       You
// @match        https://prs-admin.innerengineering.com/?kdr=eyJyb3V0ZSI6IkFwcC9NYWluL2llY29zdXBwb3J0IiwiYWN0aW9uIjoiaW5kZXgifQ==
// @icon         https://www.google.com/s2/favicons?domain=innerengineering.com
// @grant        GM_setClipboard
// @require https://code.jquery.com/jquery-1.8.3.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

var msg = '';
var Action = '';
var msgTemp = '';
var matched = false;
var firstidx = 0;
var secondidx = 0;
var SessPageCount = 0;
var Satsang = false;
var prvPage = false;
var CurrentWeek = false;
var CurrentDate = new Date;
var CurrentDay = 0;
var dt;
var RegInitProgId = '';
var RegClsDay = 0;
var RegInitDate = 0;
var RegInitDt = '';
var RegInitMo = '';
var RegInitYr = '';
var OtherProgId = '';
var OtherProgDt = '';
var OtherProgMo = '';
var OtherProgYr = '';
//
//  Sanity check script for 25 April - 01 May 2022 IECO
//
var InitiationDate = new Date(2022, 4, 1);
var IniClass3Time = new Date(2022, 4, 1, 9, 30, 0);
var SatsangWeekend = new Date(2022, 4, 8);
var OverseasSessions =[3486,3487,3488];
var Overseas = false;
var InitSession = 3472;
var array = [
   [25, 26],
   [27, 28],
   [29, 30]
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
    matched = false;
    if($('table thead tr:first-child th:nth-child(1)').html().trim() == 'Roll No.')
    {
        if($('.card-header:contains("Participant Details")').parent().children('.card-body:contains("No record found")').length == 1){
        GM_setClipboard ("No Record Found");
        alert('Message copied!!!');
        return;
        }
        if ($("table tbody tr td").length == 1) {
        msg = 'No IECO Record';
        GM_setClipboard (msg);
        alert('Message copied!!!');
        return;
        }
        var TrIdx = 0;
        $( "table tbody tr" ).each(function() {
        if(!blLast)
        {
        msgTemp = '=SPLIT("';
        RegInitProgId = $(this).find('td:nth-child(4)').html().split('|')[0];
        var classId = $(this).find('td:nth-child(2)').html().split('|')[0];
        var classDate = $(this).find('td:nth-child(2)').html().split('|')[1];
        RegInitDate = $(this).find('td:nth-child(4)').html().split('|')[1];
        RegInitDt = RegInitDate.slice(9,11);
        RegInitMo = RegInitDate.slice(6,8);
        RegInitYr = RegInitDate.slice(1,5);
        TrIdx =TrIdx + 1;
        if(TrIdx == 1) {
        OtherProgId = RegInitProgId;
        OtherProgDt = RegInitDt;
        OtherProgMo = RegInitMo;
        OtherProgYr = RegInitYr;
        } else {
        if(RegInitProgId > OtherProgId) {
        OtherProgId = RegInitProgId;
        OtherProgDt = RegInitDt;
        OtherProgMo = RegInitMo;
        OtherProgYr = RegInitYr;
        }
        }

        if( RegInitProgId == InitSession) {
        matched = true;
        var dt = classDate.slice(classDate.indexOf('<br>') - 2, classDate.indexOf('<br>'));
        var RegClsDate = dt;
        var CurrentDt= new Date().getDate();
        CurrentDay = new Date().getDay();
        var CurrentWeekend = new Date;
        var CurrentHr= new Date().getHours();
        var CurrentMn= new Date().getMinutes();
        CurrentWeekend.setDate(CurrentDate.getDate() + ((7-CurrentDay) % 7));
        Satsang = false;
        CurrentWeek = false;
        if (CurrentWeekend.getDate() == InitiationDate.getDate() && CurrentWeekend.getMonth() == (InitiationDate.getMonth())) {
            CurrentWeek = true;
        }
        if (CurrentWeekend.getDate() == SatsangWeekend.getDate() && CurrentWeekend.getMonth() == (SatsangWeekend.getMonth())) {
            Satsang = true;
            CurrentWeek = true;
        }
        var SupScript = "";
        var RegClsDay = 0;
        firstidx = -1;
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
            if(array[i][0] == RegClsDate)
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
        Overseas = false;
        if (OverseasSessions.length != 0)
        {
        for(var idx = 0; idx < OverseasSessions.length; idx++)
        {
        if (classId == OverseasSessions[idx])
        {
        msgTemp += 'Overseas IECO Particpant"&CHAR(10)&"';
        Overseas = true;
        }
        }
        }
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
        rollno = $(this).find('td:nth-child(1)').html().trim();
        var str = $('b:contains("First Name")').parent().html().split(':')[1].trim() + ' ' + $('b:contains("Last Name")').parent().html().split(':')[1].trim() + ',';
        var str1 = ' ' + $('b:contains("Email")').parent().html().split(':')[1].trim() +', ' + rollno + '\n';
        let Choice = prompt(str + str1 + 'Action? "O-override" or "R-revoke" or "S-sanity Check"', "R");
        if (Choice == null || Choice == "") {
        prvPage = false;
        return;
        }
        if (Choice == 'Z' || Choice == 'z') {
        str += $('b:contains("Primary Phone")').parent().html().split(':')[1].trim() + ',';
        str += $('b:contains("Email")').parent().html().split(':')[1].trim();
        var msg = '=SPLIT("' + str + '", ",")';
        GM_setClipboard (msg);
        alert('Message copied!!!');
        return;
        }
        sessionStorage.setItem('clicked', msgTemp);
        sessionStorage.setItem('rollno', rollno);
        sessionStorage.setItem('RegClsDay', RegClsDay);
        SessPageCount = 0;
        Action = Choice;
        prvPage = true;
        $(this).find('td:last-child a:contains("Session Details")').get(0).click();
        }
        }
        });
     } else {
        SessPageCount = SessPageCount + 1;
        if (SessPageCount > 1 || !prvPage) return;
        msg = sessionStorage.getItem('clicked');
        rollno = sessionStorage.getItem('rollno');
        RegClsDay = sessionStorage.getItem('RegClsDay');
        if (Action == 'S' || Action == 's') {
        var blLast = false;
        var lastSeen = '';
        var dayidx = -1;
        if($( "table tbody tr" ).length == 1){
        msg += '"&CHAR(10)&"No Sessions Data^' + rollno + '", "^")';
        GM_setClipboard (msg);
        alert('Message copied!!!');
        return;
        }
        if (Satsang) secondidx = 4;
        $( "table tbody tr" ).each(function() {
            if(!blLast)
            {
                if (dayidx == -1 && $(this).find('td:nth-child(1)').html().trim() != 'Session 1')
                {
                msg += ',"&CHAR(10)&"Session 1 - No Data"&CHAR(10)&"Session 2 - No Data';
                }
                if ($(this).find('td:nth-child(1)').html().trim() == 'Session 99') {
                msg += ',"&CHAR(10)&"Spl Satsang - ' + $(this).find('td:nth-child(3)').html().trim();
                } else {
                msg += ',"&CHAR(10)&"' + $(this).find('td:first-child').html().trim() + ' - ' + $(this).find('td:nth-child(3)').html().trim();
                }
                //
               // Heartbeat detail is picked only for 'Joined' or 'Revoked' or 'Completed' status
               // and also only for the current day
               //
               dayidx = dayidx + 1;
               CurrentDate = new Date;
               var Hrs = CurrentDate.getHours();
               var Mins = CurrentDate.getMinutes();
               if(($(this).find('td:nth-child(3)').html().trim() == 'Joined' || $(this).find('td:nth-child(3)').html().trim() == 'Completed' || $(this).find('td:nth-child(3)').html().trim() == 'Revoked') && $(this).find('td:nth-child(5)').html().trim() != '-' && CurrentWeek && dayidx == secondidx)
               msg += ',"&CHAR(10)&"Heartbeat @ ' + (Hrs.toString().length == 1 ? '0' + Hrs : Hrs) + ':' + (Mins.toString().length == 1 ? '0' + Mins : Mins) + ' - ' + $(this).find('td:nth-child(5)').html().trim();
               if (dayidx == secondidx) blLast = true;
            }
        });
        if (secondidx == 4) {
        msg += '", "^")';
        } else {
        msg += '^' + rollno + '", "^")';
        }
        GM_setClipboard (msg);
        alert('Message copied!!!');
        return;
        } else {
        if(Satsang) secondidx = 4;
        var allowed = false;
            CurrentWeek = true;
        if (prvPage && CurrentWeek && !Overseas) allowed = true;
        if(allowed) {
        if(secondidx == 0) $('table tbody tr:nth-child(1) td button').click();
        if(secondidx == 1) $('table tbody tr:nth-child(2) td button').click();
        if(secondidx == 2) $('table tbody tr:nth-child(3) td button').click();
        if(secondidx == 3) $('table tbody tr:nth-child(4) td button').click();
        if(secondidx == 4) $('table tbody tr:nth-child(5) td button').click();
        if (Action == 'R' || Action == 'r') {
        $('#sessStatus').val('kickout');
        msgTemp = 'Revoked @ ';
        }
        if (Action == 'O' || Action == 'o') {
        $('#sessStatus').val('allowed');
        msgTemp = 'Override @ ';
        }
        var $e = $("#confirmModalAction");
        $("#btn-confirm").attr("data-sessstatus", $e.find("select[name=sessStatus]").val());
        confirmIECOSupportAction();
        CurrentDate = new Date;
        var Hrs = CurrentDate.getHours();
        var Mins = CurrentDate.getMinutes();
        msgTemp += (Hrs.toString().length == 1 ? '0' + Hrs : Hrs) + ':' + (Mins.toString().length == 1 ? '0' + Mins : Mins);
        GM_setClipboard (msgTemp);
        alert('Message copied!!!');
        prvPage = false;
        return;
        } else {
        alert('Not allowed - Overseas!!!');
        return;
        }
        }
        }
        if(!matched)
        {
        msgTemp += 'Other IECO Particpant"&CHAR(10)&"';
        msgTemp += 'Program Id: ' + parseInt(OtherProgId, 10).toString() + ' "&CHAR(10)&"';
        msgTemp += OtherProgDt.toString() + SuperScript(OtherProgDt) + ' ' + monthName[parseInt(OtherProgMo)-1] + ' ' + OtherProgYr + '", "^")';
        GM_setClipboard (msgTemp);
        alert('Message copied!!!');
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
