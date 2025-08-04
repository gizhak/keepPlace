'use strict'
// START
// setInterval(() => console.log('Hi'), 400)
var gZoomLevel = 10
var gMap

function mapReady() {
    console.log('Map is ready')
}

function getPosition() {
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser')
        return
    }

    // One shot position retrieval...
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)

    // ...or continous watch
    // navigator.geolocation.watchPosition(showLocation, handleLocationError)
}

function showLocation(position) {
    console.log(position)
    const { latitude: lat, longitude: lng, accuracy } = position.coords

    const latEl = document.getElementById('latitude')
    const lngEl = document.getElementById('longitude')
    const accEl = document.getElementById('accuracy')
    const timeEl = document.getElementById('timestamp')

    if (latEl) latEl.innerText = lat
    if (lngEl) lngEl.innerText = lng
    if (accEl) accEl.innerText = accuracy

    if (timeEl) {
        var date = new Date(position.timestamp)
        timeEl.innerText = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }

    initMap(lat, lng)
}

function initMap(lat = 31, lng = 31) {
    const elMap = document.querySelector('.map')
    const mapOptions = {
        center: { lat, lng },
        zoom: gZoomLevel,
    }
    gMap = new google.maps.Map(elMap, mapOptions)

    const markerOptions = {
        position: { lat, lng },
        map: gMap,
        title: 'Hello World!',
    }
    const marker = new google.maps.Marker(markerOptions)
    setupMap(gMap)
}

function setupMap() {
    // Clear previous markers array
    gMap.markers = []

    gMap.addListener('click', (event) => {
        const lat = event.latLng.lat()
        const lng = event.latLng.lng()

        console.log('Clicked at:', lat, lng)

        // Clear previous selection markers
        if (gMap.selectionMarker) {
            gMap.selectionMarker.setMap(null)
        }

        // Save selected location
        gSelectedPlace = { lat, lng }

        // Add marker at clicked location
        gMap.selectionMarker = new google.maps.Marker({
            position: { lat, lng },
            map: gMap,
            title: 'Selected Location',
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        })

        alert(`Location selected: ${lat.toFixed(4)}, ${lng.toFixed(4)}\nClick "New place" to save it!`)
    })
}

function zoom(diff) {
    gZoomLevel += diff
    gMap.setZoom(gZoomLevel)
}

function pan() {
    const strLatLng = prompt('Enter lat, lng')
    const latLng = strLatLng.split(',')

    gMap.setCenter({ lat: +latLng[0], lng: +latLng[1] })
}

function handleLocationError(error) {
    var elLocationError = document.getElementById('locationError')

    switch (error.code) {
        case 0:
            elLocationError.innerHTML = 'There was an error while retrieving your location: ' + error.message
            break
        case 1:
            elLocationError.innerHTML = "The user didn't allow this page to retrieve a location."
            break
        case 2:
            elLocationError.innerHTML = 'The browser was unable to determine your location: ' + error.message
            break
        case 3:
            elLocationError.innerHTML = 'The browser timed out before retrieving the location.'
            break
    }
}