// ==UserScript==
// @name         Moodle auto login for ICAM
// @name:fr      Moodle auto login for ICAM
// @version      1.2
// @description  An automatic login script for Moodle.
// @description:fr  Un login automatique pour Moodle
// @author       EVilm1
// @match        https://cas.icam.fr/cas/login
// @match        https://moodle.icam.fr/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @license MIT
// ==/UserScript==

(function() {
    'use strict';

    var loginDetails = {
        userName: "esteban.villemain@2027.icam.fr",
        password: "$K*k66T5",
    }

    function login() {
        document.querySelector("input#username").value = loginDetails.userName;
        document.querySelector("input#password").value = loginDetails.password;
        document.querySelector("button#defaultSubmitBtn").removeAttribute("disabled");
        setTimeout(clickLoginButton, 200);
    }

    function clickLoginButton() {
        document.querySelector("button#defaultSubmitBtn").click();
    }

    function isLoggedIn() {
        return document.getElementsByClassName('usertext').length > 0 // 0 = not logged
    }

    function redirectToLogin() {
        window.location.href = 'https://cas.icam.fr/cas/login';
    }

    function redirectToMoodle() {
        window.location.href = 'https://moodle.icam.fr/login/index.php?authCAS=CAS';
    }

    var host = window.location.host;

    if (host == "moodle.icam.fr") {
        if (!isLoggedIn()) {
            // login if needed
            redirectToLogin();
        }
    } else if (host == "cas.icam.fr") {
        addEventListener('load', (event) => {});
        window.addEventListener('load', (event) => {
            // wait for 'load' to allow reacting faster without setTimeOut
            console.log("logging in...")
            setTimeout(login(), 200);
        });
        window.addEventListener('load', (event) => {
            // wait for 'load' to allow reacting faster without setTimeOut
            console.log("redirection Moodle...")
            setTimeout(redirectToMoodle(), 200);
        });
    }

    if (host == "cas.icam.fr") {
        if(document.title == "Connexion réussie - Icam – Central Authentication Service"){
            redirectToMoodle();
        }
    }
})();
