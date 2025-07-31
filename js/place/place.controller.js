'use strict'

var gPlace = { id: '1p2', lat: 32.1416, lng: 34.831213, name: 'Pukis house' }

console.log(gPlace)


function onInit() {
    renderPlaces()

}
function renderPlaces() {

    const places = gPlace
    console.log(places)

    const elPlace = document.querySelector('.map-conf')
    console.log(elPlace)

    var strHtml = `
        <tr>
            <td>Name: ${places.name}</td>
            <td>Lat: ${places.lat}</td>
            <td>Lng: ${places.lng}</td>
        </tr>
    `
    elPlace.innerHTML = strHtml

}
function onRemovePlace(placeId) {

} 