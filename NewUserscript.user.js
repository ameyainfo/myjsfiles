// ==UserScript==
// @name         Sanity Script 2023 - '04
// @namespace    http://tampermonkey.net/
// @version      6.31
// @description  try to take over the world!
// @author       You
// @match        https://prs-admin.innerengineering.com/?kdr=eyJyb3V0ZSI6IkFwcC9QUlNNYW5hZ2VtZW50L2llb3N1cHBvcnQiLCJhY3Rpb24iOiJpbmRleCIsInBhcmFtcyI6bnVsbH0=
// @match        https://prs-admin.innerengineering.com/index?kdr=eyJyb3V0ZSI6IkFwcC9QUlNNYW5hZ2VtZW50L2llb3N1cHBvcnQiLCJhY3Rpb24iOiJpbmRleCIsInBhcmFtcyI6bnVsbH0=
// @icon         https://www.google.com/s2/favicons?sz=64&domain=innerengineering.com
// @grant        GM_setClipboard
// @require https://code.jquery.com/jquery-1.8.3.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

var msg = '';
var rollno = '';
var count = 0;

waitForKeyElements (".table-striped", myFunc);

var myInt;
(function() {
    'use strict';

    myInt = setInterval(myFunc, 1000);

    // Your code here...
})();

function myFunc(){
        clearInterval(myInt);
        if($('.breadcrumb').find('.breadcrumb-item:nth-child(3)').html() == 'Old IEO Support')
        {
        count = 0;
        sessionStorage.setItem('countId',count);
        if($('table thead tr:first-child th:nth-child(1)').html().trim() == 'Payment Type')
        {
        var language = '';
        switch (jQuery("div:contains('Profile Information')").next().find('td:contains("Language")').next().html()) {
        case 'EN':
         language = 'English';
         break;
         case 'TA':
         language = 'Tamil';
         break;
         case 'TE':
         language = 'Telugu';
         break;
         case 'BN':
         language = 'Bangla';
         break;
         case 'ML':
         language = 'Malayalam';
         break;
         case 'MR':
         language = 'Marathi';
         break;
         case 'KN':
         language = 'Kannada';
         break;
         case 'HI':
         language = 'Hindi';
}
        msg = '="Not Registered for the New IEO"&CHAR(10)&CHAR(10)&"Old IEO"&CHAR(10)&"Language: '+ language + '"'
        msg += '&CHAR(10)&"Current Class: '+ jQuery("div:contains('Class Information')").next().find('td:contains("Current Class")').next().html() + ' ^ '
        var secondary = jQuery("div:contains('Contact Information')").next().find('td:contains("Secondary")').next().html()
        msg += '^' + secondary.slice(1,12);
        msg += '^' + jQuery("div:contains('Contact Information')").next().find('td:contains("Email")').next().html() + '^ ^' + jQuery("div:contains('Profile Information')").next().find('td:contains("First Name")').next().html() + ' ' + jQuery("div:contains('Profile Information')").next().find('td:contains("Last Name")').next().html()+'"';
        GM_setClipboard (msg);
        jQuery('a:contains("Support"):not(:contains("Old"))').click();
        setTimeout(focusFunc,2000);
        }
        }
        if($('table thead tr:first-child th:nth-child(1)').html().trim() == 'ID' && $('.breadcrumb').find('.breadcrumb-item:nth-child(3)').html() == 'Old IEO Support')
        {
        var emailId = sessionStorage.getItem('mailId');
        if(emailId != '' ) msg = '="' + emailId +'"&CHAR(10)&"No Data available for this email Id"';
        var phoneId = sessionStorage.getItem('phone');
        if(phoneId != '' ) msg = '="' + phoneId +'"&CHAR(10)&"No Data available for this phone number"';
        GM_setClipboard (msg);
        jQuery('a:contains("Support"):not(:contains("Old"))').click();
        setTimeout(focusFunc,2000);
        }
        if ($('#searchEmail').val() != "" || $('#searchPhone').val() != "" || $('#searchPartId').val() != "") {
        if($('table thead tr:first-child th:nth-child(1)').html().trim() == 'ID' && $('.breadcrumb').find('.breadcrumb-item:nth-child(1)').html()== 'IE 7 Steps')
        {
        if($( "table tbody tr" ).length == 1)
        {
        sessionStorage.setItem('mailId',$('#searchEmail').val());
        sessionStorage.setItem('phone',$('#searchPhone').val());
        jQuery('a:contains("Old IEO Support")').click();
        setTimeout(setValue,1000);
        count = count + 1;
        sessionStorage.setItem('countId',count);
        if(count == 1) setTimeout(searchClick,1500);
        } else
        {
        msg = '="Multiple entries for ' + $('#searchPhone').val() + '"&CHAR(10)'
        $( "table tbody tr" ).each(function() {
        msg += '&CHAR(10)&"' + $(this).find('td:nth-child(2)').html().trim() +'"';
        });
        GM_setClipboard (msg);
        jQuery('a:contains("Support"):not(:contains("Old"))').click();
        }
        }
        if($('table thead tr:first-child th:nth-child(1)').html().trim() == 'Step Id' && $('.breadcrumb').find('.breadcrumb-item:nth-child(3)').html()== 'IE 7 Steps')
        {
        var CurrentStep = jQuery("div:contains('User Course Progress')").next().find('td:contains("Current Step")').next().html();
        var langIEO = jQuery("div:contains('User Course Progress')").next().find('td:contains("Language")').next().html();
        language = '';
        switch (langIEO.trim()) {
        case 'EN':
         language = 'English';
         break;
         case 'TA':
         language = 'Tamil';
         break;
         case 'TE':
         language = 'Telugu';
         break;
         case 'BN':
         language = 'Bangla';
         break;
         case 'ML':
         language = 'Malayalam';
         break;
         case 'MR':
         language = 'Marathi';
         break;
         case 'KN':
         language = 'Kannada';
         break;
         case 'HI':
         language = 'Hindi';
}
        var firstName = jQuery("div:contains('Profile Information')").next().find('td:contains("First Name")').next().html();
        var lastName = jQuery("div:contains('Profile Information')").next().find('td:contains("Last Name")').next().html();
        rollno = jQuery("div:contains('Profile Information')").next().find('td:contains("Roll No")').next().html();
        email = jQuery("div:contains('Profile Information')").next().find('td:contains("Email")').next().html();
        var phone = jQuery("div:contains('Profile Information')").next().find('td:contains("Primary")').next().html();
        msg = '="' + language + ' Current Step: ' + CurrentStep + '"&CHAR(10)&"No IEO Record Found';
        msg += '^' + rollno + '^' + phone +'^' + email + '^' + language + '^' + firstName + ' ' + lastName + '"';
        count = count + 1;
        sessionStorage.setItem('countId',count);
        GM_setClipboard (msg);
        if(count == 1) jQuery('a:contains("IEO Support"):not(:contains("Old"))').click();
        }
        if($('table thead tr:first-child th:nth-child(1)').html().trim() == 'Roll No' && $('.breadcrumb').find('.breadcrumb-item:nth-child(1)').html()== 'IE 7 Steps')
        {
        msg = '="';
        const initDate = new Date();
        const currentDate = new Date();
        CurrentStep = jQuery("div:contains('User Course Progress')").next().find('td:contains("Current Step")').next().html();
        langIEO = jQuery("div:contains('User Course Progress')").next().find('td:contains("Language")').next().html();
        var langInit = $('table tbody td:nth-child(4)').html().split('|')[2];
        language = '';
    switch (langInit.trim()) {
    case 'EN':
         language = 'English';
         break;
    case 'TA':
         language = 'Tamil';
         break;
    case 'TE':
         language = 'Telugu';
         break;
    case 'BN':
         language = 'Bangla';
         break;
    case 'ML':
         language = 'Malayalam';
         break;
    case 'MR':
         language = 'Marathi';
         break;
    case 'KN':
         language = 'Kannada';
         break;
    case 'HI':
         language = 'Hindi';
}
    var IEOlang = '';
    switch (langIEO.trim()) {
    case 'EN':
         IEOlang = 'English';
         break;
    case 'TA':
         IEOlang = 'Tamil';
         break;
    case 'TE':
         IEOlang = 'Telugu';
         break;
    case 'BN':
         IEOlang = 'Bangla';
         break;
    case 'ML':
         IEOlang = 'Malayalam';
         break;
    case 'MR':
         IEOlang = 'Marathi';
         break;
    case 'KN':
         IEOlang = 'Kannada';
         break;
    case 'HI':
         IEOlang = 'Hindi';
}
    firstName = jQuery("div:contains('Profile Information')").next().find('td:contains("First Name")').next().html();
    lastName = jQuery("div:contains('Profile Information')").next().find('td:contains("Last Name")').next().html();
    rollno = jQuery("div:contains('Profile Information')").next().find('td:contains("Roll No")').next().html();
    email = jQuery("div:contains('Profile Information')").next().find('td:contains("Email")').next().html();
    phone = jQuery("div:contains('Profile Information')").next().find('td:contains("Primary")').next().html();
    var progId = $('table tbody td:nth-child(4)').html().split('|')[0];
    var progRegn = $('table tbody td:nth-child(4)').html().split('|')[1];
    var progDetail = $('table tbody td:nth-child(4)').html().split('|')[3];
    var oldProg = $('table tbody td:nth-child(4)').html().split('Old Program Details:</b> <br>')[1];
    var progDate = progDetail.slice(9,11);
    var progMonth = progDetail.slice(6,8);
    var progYear = progDetail.slice(1,5);
    initDate.setFullYear(parseInt(progYear),parseInt(progMonth)-1,parseInt(progDate));
    var dateDiff = initDate - currentDate;
    dateDiff /= 86400000;
    var curweek = 0;
    if(dateDiff < 6 && dateDiff > -2 && progRegn.trim() == 'IN'){
    msg += 'Initiation (Current):"&CHAR(10)&"' + progId.trim() + ' ' + language + ' ' + progDate + '-' + progMonth + '-' + progYear + '"'
    curweek = 1;
    } else
    {
    if(progRegn.trim() != 'IN') msg += 'Initiation (Overseas):"&CHAR(10)&"' + progId.trim() + ' ' + language + ' ' + progDate + '-' + progMonth + '-' + progYear + '^';
    if(progRegn.trim() == 'IN') msg += 'Initiation:"&CHAR(10)&"' + progId.trim() + ' ' + language + ' ' + progDate + '-' + progMonth + '-' + progYear + '^';
    msg += rollno + '^' + phone + '^' + email + '^' + language + '^' + firstName + ' ' + lastName + '"';
    GM_setClipboard (msg);
    setTimeout(delayClick,1000);
    setTimeout(focusFunc,1000);
    return;
    }
    if(langIEO != langInit.trim())
    {
    msg += '&CHAR(10)&"(IEO Language: ' + IEOlang + ')"';
    }
    msg += '&CHAR(10)&"Current Step: ' + CurrentStep;
    var msgTemp ='';
    if(oldProg !== undefined)
    {
    msgTemp = '"&CHAR(10)&CHAR(10)&"Old Program:"&CHAR(10)&"' + oldProg.slice(0,22);
    }
    sessionStorage.setItem('clicked', msg);
    sessionStorage.setItem('rollnum', rollno);
    sessionStorage.setItem('name', firstName);
    sessionStorage.setItem('oldPgId', msgTemp);
    sessionStorage.setItem('mailId', email);
    sessionStorage.setItem('phonenum', phone);
    sessionStorage.setItem('weekchk', curweek);
    sessionStorage.setItem('lang', language);
    sessionStorage.setItem('name', firstName + " " + lastName);
    count = count + 1;
    sessionStorage.setItem('countId',count);
    if(count == 1) $('table tbody td:last-child a:contains("Session Details")').get(0).click();
    }
    }
        if($('table thead tr:first-child th:nth-child(1)').html().trim() == 'Session' && $('.breadcrumb').find('.breadcrumb-item:nth-child(1)').html()== 'IE 7 Steps')
        {
        msg = sessionStorage.getItem('clicked');
        rollno = sessionStorage.getItem('rollnum');
        firstName = sessionStorage.getItem('name');
        oldProg = sessionStorage.getItem('oldPgId');
        var email = sessionStorage.getItem('mailId');
        phone = sessionStorage.getItem('phonenum');
        curweek = sessionStorage.getItem('weekchk');
        language = sessionStorage.getItem('lang');
        var CurrentDate = new Date;
        var CurrentDay = new Date().getDay();
        var Hrs = CurrentDate.getHours();
        var Mins = CurrentDate.getMinutes();
        var trcount = 1
        $( "table tbody tr" ).each(function() {
        if($( "table tbody tr" ).length == 3)
     {
         if (((trcount < 3 || (trcount == 3 && (Hrs*100+Mins) > 929)) && CurrentDay == 0) || (trcount == 1 && CurrentDay == 6) || (CurrentDay > 0 && CurrentDay < 6) || curweek == 0) msg += '"&CHAR(10)&"' + $(this).find('td:nth-child(1)').html().trim() + ',' + $(this).find('td:nth-child(2)').html().trim() + ',' + $(this).find('td:nth-child(5)').html().trim()
         if ((((trcount == 1 && $(this).find('td:nth-child(5)').html().trim() == 'Dropout') || (trcount == 2 && $(this).find('td:nth-child(5)').html().trim() == 'Dropout') || (trcount == 2 && (Hrs*100+Mins) < 930) || (trcount == 3 && (Hrs*100+Mins) > 929)) && CurrentDay == 0) || (trcount == 1 && CurrentDay == 6 && curweek == 1))
         {
             if($(this).find('td:nth-child(5)').html().trim() != 'Allowed' && $(this).find('td:nth-child(5)').html().trim() != 'Not-allowed' && $(this).find('td:nth-child(5)').html().trim() != 'No-show') {
             if($(this).find('td:nth-child(7)').html().trim() != '-')
             {
             if($(this).find('td:nth-child(5)').html().trim() == 'Dropout' || $(this).find('td:nth-child(5)').html().trim() == 'Revoked') {
             var HBhour = $(this).find('td:nth-child(7)').html().split('minutes')[0];
             var HBmin = HBhour.split('hours,')[1];
             var HBtemp = HBhour.split('hours,')[0];
             HBhour = HBtemp.split('days,')[1];
             var hrDropout = Hrs - parseInt(HBhour);
             var mnDropout = Mins - parseInt(HBmin);
             var minuteDropout = parseInt(HBhour) * 60 + parseInt(HBmin);
             if(mnDropout < 0) {
             mnDropout = mnDropout + 60;
             hrDropout = hrDropout - 1;
             }
             if (hrDropout < 0 ) {hrDropout = 24 + hrDropout}
             if (trcount == 1 && CurrentDay == 0) {
             msg += ' (Yesterday at ' + (hrDropout.toString().length == 1 ? '0' + hrDropout : hrDropout) + ':' + (mnDropout.toString().length == 1 ? '0' + mnDropout : mnDropout) +' hrs)'
             } else
             {
             msg += ',"&CHAR(10)&"Heartbeat @ ' + (Hrs.toString().length == 1 ? '0' + Hrs : Hrs) + ':' + (Mins.toString().length == 1 ? '0' + Mins : Mins) + ' (' + $(this).find('td:nth-child(5)').html().trim() + ' ' + (parseInt(HBhour) > 1 ? HBhour + ' hours ' : (parseInt(HBhour) > 0 ? HBhour + ' hour ' : '')) + (parseInt(HBhour) + parseInt(HBmin) == parseInt(HBhour) ? '' : 'and ')+ (parseInt(HBmin) > 1 ? HBmin + ' minutes back at ' : (parseInt(HBmin) == 1 ? HBmin + ' minute back at ' : '')) + (hrDropout.toString().length == 1 ? '0' + hrDropout : hrDropout) + ':' + (mnDropout.toString().length == 1 ? '0' + mnDropout : mnDropout) +' hrs)'
             }
             } else { msg += ',"&CHAR(10)&"Heartbeat @ ' + (Hrs.toString().length == 1 ? '0' + Hrs : Hrs) + ':' + (Mins.toString().length == 1 ? '0' + Mins : Mins) + ' - ' + $(this).find('td:nth-child(7)').html().trim(); }
             } else { msg += ',"&CHAR(10)&"Heartbeat @ ' + (Hrs.toString().length == 1 ? '0' + Hrs : Hrs) + ':' + (Mins.toString().length == 1 ? '0' + Mins : Mins) + ' - No Heartbeat Record'; }
             }
             }
         trcount = trcount +1;
        } else { msg += '"&CHAR(10)&"' + $(this).find('td:nth-child(1)').html().trim(); }
        });
        msg += oldProg + '^' + rollno + '^' + phone + '^' + email + '^' + language + '^' + firstName + '"';
        GM_setClipboard (msg);
        count = 0;
        sessionStorage.setItem('countId',count);
        setTimeout(delayClick,500);
        setTimeout(focusFunc,2000);
        }
        }
        function focusFunc() {
        $('#searchEmail').focus();
        }
        function delayClick() {
        jQuery('a:contains("Support"):not(:contains("Old"))').click();
        }
        function setValue() {
        var mail = sessionStorage.getItem('mailId');
        document.getElementById('searchEmail').value = mail;
        var mobile = sessionStorage.getItem('phone');
        document.getElementById('searchPhone').value = mobile;
        }
        function searchClick() {
        jQuery('button:contains("Search")').click();
        }
