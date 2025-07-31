'use strict'

function showAge(newVal) {
    document.getElementById('sAge').innerHTML = newVal
    console.log(newVal)
}

function getEmail(newEmail) {
    // console.log(newEmail)
    document.getElementsByClassName('email').innerHTML = newEmail
    console.log(newEmail)
}

function getBackColor(newBackColor) {
    // console.log(newEmail)
    document.getElementById('color-bg').innerHTML = newBackColor
    console.log(newBackColor)
}

function getTextColor(newTextColor) {
    // console.log(newEmail)
    document.getElementById('color-tx').innerHTML = newTextColor
    console.log(newTextColor)
}

function showTime(newTime) {
    // console.log(newEmail)
    document.getElementById('time').innerHTML = newTime
    console.log(newTime)
}