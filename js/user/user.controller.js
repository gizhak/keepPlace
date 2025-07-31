'use strict'

// const user = {
//     email: 'test@test',
//     txtColor: '#00000',
//     bgColor: '#00000',
//     Age: '19',
//     birthDate: '25/04/04',
//     birthTime: '19:19'
// }

// console.log(user)

function onInit() {

}

function onRegisterBtn() {
    const elContainer = document.querySelector('.register-container')


    const email = elContainer.querySelector('.email').value
    const age = elContainer.querySelector('.age').value
    const bgColor = elContainer.querySelector('.color-background').value
    const textColor = elContainer.querySelector('.color-text').value
    const birthTime = elContainer.querySelector('.time').value

    addUser(email, textColor, bgColor, age, birthTime)

    alert('User registered successfully!')
    console.log('User saved:', { email, age, bgColor, textColor, birthTime })

    window.location.href = 'places.html'

}




