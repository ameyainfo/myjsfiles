// ==UserScript==
// @name         New IEO Portal Script
// @namespace    http://tampermonkey.net/
// @version      1.4
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

var iniClass3Date = new Date(2022, 0, 23);
var iniClass3Time = new Date(2022, 0, 23, 9, 30, 0);
var dt;

var array = [
    [17, 18],
    [19, 20],
    [21, 22]
];

var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var prefix =['Mon/Tue Participant','Wed/Thu Participant','Fri/Sat Participant']
waitForKeyElements (".table-striped", myFunc);

var myInt;
(function() {
    'use strict';

    myInt = setInterval(myFunc, 1000);

    // Your code here...
})();

function myFunc(){
    //alert($('table thead tr:first-child th:nth-child(1)').html());
    if($('table thead tr:first-child th:nth-child(1)').html().trim() == 'Roll No.' ||
      $('table thead tr:first-child th:nth-child(1)').html().trim() == 'Session')
    {
        clearInterval(myInt);
    }
    else
        return;

    var rollno = '';

    //$('#participant').focus();

    //alert($('table tbody tr:first-child td:nth-child(2)').html());
    //alert($('table tbody tr:first-child td:last-child a:contains("Session Details")'));
    //alert($('table tbody tr:first-child td:last-child a:contains("Session Details")').get(0).href);
    //$('table tbody tr:first-child td:last-child a:contains("Session Details")').get(0).click();

    if($('table thead tr:first-child th:nth-child(1)').html().trim() == 'Roll No.')
    {
        //="6-7th Dec, "&CHAR(10)&"18:30 hrs Evening, "&CHAR(10)&"Class-1 - allowed, "&CHAR(10)&"Class-2 - allowed, "&CHAR(10)&"Class-3 - allowed, "&CHAR(10)&"Heartbeat: null  @ 14:49"

        var classId = $('table tbody tr:first-child td:nth-child(2)').html().split('|')[0];
        var classDate = $('table tbody tr:first-child td:nth-child(2)').html().split('|')[1];
        var dt = classDate.slice(classDate.indexOf('<br>') - 2, classDate.indexOf('<br>'));
        var RegClsDate = dt;
        var CurrentDate = new Date().getDate();
        var CurrentDay = new Date().getDay();
        var RegClsDay = 0;
        for(var i = 0; i < array.length; i++)
        {
            if(array[i][0] == parseInt(dt, 10))
            {
                dt = array[i][0] + '-' + array[i][1];
            }
            if(array[i][0] == CurrentDate)
            {
               firstidx = i;
               secondidx = 0;
            }
            if(array[i][1] == CurrentDate)
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
        if (CurrentDay == 7)
        {
        secondidx = 3;
        }
        var msgTemp = '=SPLIT("';

        // if(classId == '3312' || classId == '3327')
        if(parseInt(classId, 10) >= 3312 && parseInt(classId, 10) <= 3327)
        {
            msgTemp += 'Feb 2022 - IECO, "&CHAR(10)&"';
            msgTemp += 'Program Id: ' + parseInt(classId, 10).toString() + ', "&CHAR(10)&"';
        }

        if(parseInt(classId, 10) < 3288)// || parseInt(classId, 10) > 3300)
            msgTemp += 'Earlier Program Id: ' + parseInt(classId, 10).toString() + ', "&CHAR(10)&"';

        var mon = parseInt(classDate.split('-')[1]);
        if (RegClsDay != firstidx)
        msgTemp += prefix[RegClsDay] + ', "&CHAR(10)&"' + dt.toString() + 'th ' + monthName[mon - 1] + ', "&CHAR(10)&"';
        if (RegClsDay == firstidx)
        msgTemp += dt.toString() + 'th ' + monthName[mon - 1] + ', "&CHAR(10)&"';
        var hr = classDate.substr(classDate.indexOf('<br>') + 4, 5);

        msgTemp += hr + ' hrs ' + ((parseInt(classDate.substr(classDate.indexOf('<br>') + 4, 2), 10) > 17) ? 'Evening' : 'Morning') + ', "&CHAR(10)&"';

        //alert(msgTemp);

        //alert($('table tbody tr:first-child td:nth-child(1)').html().trim());

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
               if($(this).find('td:nth-child(2)').html().trim() == 'Joined')
               lastSeen = 'Heartbeat: ' + $(this).find('td:nth-child(4)').html().trim();
               dayidx = dayidx + 1;
               if (dayidx == secondidx)
               {
                   blLast = true;
               }
            }
        });

        msg +=  lastSeen + '^' + rollno + '", "^")';

        //alert(msg);

        GM_setClipboard (msg);
        alert('Message copied!!!');
    }
}
