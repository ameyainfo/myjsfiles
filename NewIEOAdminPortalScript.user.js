// ==UserScript==
// @name         New IEO Portal Script
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  this is IEO New Admin script
// @author       You
// @match        https://prs-admin.innerengineering.com/?kdr=eyJyb3V0ZSI6IkFwcC9NYWluL2llY29zdXBwb3J0IiwiYWN0aW9uIjoiaW5kZXgifQ==
// @icon         https://www.google.com/s2/favicons?domain=innerengineering.com
// @grant        GM_setClipboard
// @require https://code.jquery.com/jquery-1.8.3.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

var msg = '';

var iniClass3Date = new Date(2021, 11, 12);
var iniClass3Time = new Date(2021, 11, 12, 9, 30, 0);
var dt;

var array = [
    [6, 7],
    [8, 9],
    [10, 11]
];

var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

waitForKeyElements ("table", myFunc);

(function() {
    'use strict';

    // Your code here...
})();

function myFunc(){

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

        for(var i = 0; i < array.length; i++)
        {
            if(array[i][0] == parseInt(dt, 10))
            {
                dt = array[i][0] + '-' + array[i][1];
            }
        }

        var msgTemp = '="';

        if(classId == '3223' || classId == '3224' || classId == '3225')
        {
            msgTemp += 'Overseas participant, "&CHAR(10)&"';
            msgTemp += 'Program Id: ' + classId + ', "&CHAR(10)&"';
        }

        if(parseInt(classId, 10) < 3288 || parseInt(classId, 10) > 3300)
            msgTemp += 'Earlier Program Id: ' + classId + ', "&CHAR(10)&"';

        var mon = parseInt(classDate.split('-')[1]);
        msgTemp += dt.toString() + 'th ' + monthName[mon - 1] + ', "&CHAR(10)&"';

        var hr = classDate.substr(classDate.indexOf('<br>') + 4, 5);

        msgTemp += hr + ' hrs ' + ((parseInt(classDate.substr(classDate.indexOf('<br>') + 4, 2), 10) > 17) ? 'Evening' : 'Morning') + ', "&CHAR(10)&"';

        //alert(msgTemp);

        sessionStorage.setItem('clicked', msgTemp);
        $('table tbody tr:first-child td:last-child a:contains("Session Details")').get(0).click();
    }
    else
    {
        msg = sessionStorage.getItem('clicked');

        var blLast = false;
        var lastSeen = '';

        $( "table tbody tr" ).each(function() {
            if(!blLast)
            {
                msg += $(this).find('td:first-child').html().trim() + ' - ' + $(this).find('td:nth-child(2)').html().trim() + ', "&CHAR(10)&"';

                if($(this).find('td:nth-child(3)').html().trim() == '-')
                    blLast = true;
                else
                    lastSeen = $(this).find('td:nth-child(4)').html().trim();
            }
        });

        msg += 'Heartbeat: ' + lastSeen + '"';

        GM_setClipboard (msg);
        alert('Message copied!!!');
    }
}
