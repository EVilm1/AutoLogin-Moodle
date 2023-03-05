// ==UserScript==
// @name         ICAM Moodle auto login
// @name:he      auto
// @namespace    http://tampermonkey.net/
// @version      1
// @description  An automatic login script for moodle.
// @author       EVilm1
// @match        https://cas.icam.fr/cas/login
// @match        https://moodle.icam.fr/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==


(function() {
    'use strict';

    var loginDetails = {
        userName: "esteban.villemain@2027.icam.fr",
        password: "$K*k66T5",
    }

    function login(){
        document.querySelector("input#username").value = loginDetails.userName;
        document.querySelector("input#password").value = loginDetails.password;

        setTimeout(clickLoginButton, 300);
    }

    function clickLoginButton(){
        document.querySelector("button#defaultSubmitBtn").click()
    }

    function isLoggedIn() {
        return document.getElementsByClassName('usertext').length > 0
    }

    function redirectToLogin() {
        window.location.href = 'https://cas.icam.fr/cas/login';
    }

    var host = window.location.host;

    if (host == "moodle.icam.fr") {
        if (!isLoggedIn()) {
            // login if needed
            redirectToLogin();
        }
    } else if (host == "cas.icam.fr") {
        window.addEventListener('load', (event) => {
            // wait for 'load' to allow reacting faster without setTimeOut
            login()
        });
        window.addEventListener('load', (event) => {
            // wait for 'load' to allow reacting faster without setTimeOut
            $('a[href*="https://moodle.icam.fr/login/index.php?authCAS=CAS"]')[0].click()
            //location.href = "https://moodle.icam.fr/login/index.php?authCAS=CAS";

        });
    }
})();
