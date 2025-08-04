'use strict'

var gPlaces = []

_createPlaces()

function getPlaces() {
    return gPlaces
}

function removePlace(placeId) {
    const placeIdx = gPlaces.findIndex(place => place.id === placeId)
    if (placeIdx !== -1) {
        gPlaces.splice(placeIdx, 1)
        saveToStorage('placesDB', gPlaces)
    }
}

function addPlace(name, lat, lng, zoom) {
    const newPlace = _createPlace(name, lat, lng)
    gPlaces.unshift(newPlace)
    saveToStorage('placesDB', gPlaces)
    return newPlace
}

function getPlaceById(placeId) {
    return gPlaces.find(place => place.id === placeId)

}
function _createPlace(name, lat, lng, zoom) {
    return {
        id: makeid(),
        name: name,
        lat: lat,
        lng: lng,
        createdAt: Date.now()
    }

}
function _createPlaces() {
    var places = loadFromStorage('placesDB')

    if (!places) {
        places = [
            _createPlace('Demo Place', 32.1416, 34.831213)
        ]
        saveToStorage('placesDB', places)
    }
    gPlaces = places

} 