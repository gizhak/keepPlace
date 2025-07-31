'use strict'

var gUsers

console.log(gUsers)

_createUsers()

function addUser(newEmail, newTextColor, newBackColor, newVal, newTime) {

    const newuser = _createUser(newEmail, newTextColor, newBackColor, newVal, newTime)
    gUsers.unshift(newuser)
    saveToStorage('userDB', gUsers)
    return newuser
}

function _createUsers() {

    var users = loadFromStorage('userDB')

    if (!users) {
        users = [
            _createUser('test@test', '#00000', '#11111', '100', '01:01')
        ]
        saveToStorage('userDB', users)
    }
    gUsers = users
}


function _createUser(newEmail, newTextColor, newBackColor, newVal, newTime) {
    return {
        email: newEmail,
        txtColor: newTextColor,
        bgColor: newBackColor,
        Age: newVal,
        birthTime: newTime,
    }
}

function _saveUserToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}