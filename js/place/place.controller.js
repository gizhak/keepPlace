'use strict'

var gSelectedPlace = null
var gPlacesListVisible = false

function onInit() {
    renderPlaces()
    getPosition()
    updatePlacesCount()
}

function renderPlaces() {
    const places = getPlaces()
    const elPlace = document.getElementById('placesList')

    if (places.length === 0) {
        elPlace.innerHTML = '<div class="no-places">🗺️ No places saved yet<br><br>Click on the map to select a location,<br>then click "New place" to save it!</div>'
        return
    }

    var strHtml = places.map(place => `
        <div class="place-item">
            <div class="place-info">
                <h4 class="place-name">${place.name}</h4>
                <p class="place-coords">Lat: ${place.lat.toFixed(4)}, Lng: ${place.lng.toFixed(4)}</p>
                <p class="place-date">Added: ${new Date(place.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="place-actions">
                <button onclick="onGoToPlace('${place.id}')" class="action-btn go-btn">Go</button>
                <button onclick="onRemovePlace('${place.id}')" class="action-btn remove-btn">Delete</button>
            </div>
        </div>
    `).join('')

    elPlace.innerHTML = strHtml
}

function togglePlacesList() {
    const placesList = document.getElementById('placesList')
    const toggleBtn = document.querySelector('.toggle-places-btn')
    const toggleText = document.getElementById('toggle-text')

    gPlacesListVisible = !gPlacesListVisible

    if (gPlacesListVisible) {
        placesList.style.display = 'flex'
        toggleBtn.classList.add('active')
        toggleText.textContent = 'Hide Saved Places'
    } else {
        placesList.style.display = 'none'
        toggleBtn.classList.remove('active')
        toggleText.textContent = 'Show Saved Places'
    }
}

function updatePlacesCount() {
    const places = getPlaces()
    const countEl = document.getElementById('places-count')
    if (countEl) {
        countEl.textContent = `(${places.length})`
    }
}

function onNewPlace() {
    if (!gSelectedPlace) {
        alert('Please click on the map to select a location first!')
        return
    }

    const placeName = prompt('Enter place name:')
    if (placeName && placeName.trim()) {
        addPlace(placeName.trim(), gSelectedPlace.lat, gSelectedPlace.lng)
        renderPlaces()
        updatePlacesCount()
        alert('Place saved successfully!')
        gSelectedPlace = null
    }
}

function onRemovePlace(placeId) {
    const place = getPlaceById(placeId)
    if (place && confirm(`Are you sure you want to delete "${place.name}"?`)) {
        removePlace(placeId)
        renderPlaces()
        updatePlacesCount()
        alert('Place deleted successfully!')
    }
}

function clearAllPlaces() {
    const places = getPlaces()
    if (places.length === 0) {
        alert('No places to clear!')
        return
    }

    if (confirm(`Are you sure you want to delete ALL ${places.length} saved places?`)) {
        localStorage.removeItem('placesDB')
        location.reload()
    }
}

function onFindPlace() {
    const searchTerm = prompt('Enter place name or address to search:')
    if (searchTerm && searchTerm.trim()) {
        searchPlace(searchTerm.trim())
    }
}

function onGoToPlace(placeId) {
    const place = getPlaceById(placeId)
    if (place && gMap) {
        const position = { lat: place.lat, lng: place.lng }

        // Move map to location
        gMap.setCenter(position)
        gMap.setZoom(15)

        // Add marker
        new google.maps.Marker({
            position: position,
            map: gMap,
            title: place.name,
            animation: google.maps.Animation.BOUNCE
        })

        // Stop animation after 2 seconds
        setTimeout(() => {
            const markers = gMap.markers || []
            markers.forEach(marker => marker.setAnimation(null))
        }, 2000)

        alert(`Navigated to: ${place.name}`)
    }
}

function searchPlace(query) {
    const geocoder = new google.maps.Geocoder()

    geocoder.geocode({ address: query }, (results, status) => {
        if (status === 'OK') {
            const location = results[0].geometry.location
            gMap.setCenter(location)
            gMap.setZoom(15)

            // Clear previous markers
            if (gMap.searchMarker) {
                gMap.searchMarker.setMap(null)
            }

            // Add marker for found place
            gMap.searchMarker = new google.maps.Marker({
                position: location,
                map: gMap,
                title: results[0].formatted_address,
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            })

            gSelectedPlace = {
                lat: location.lat(),
                lng: location.lng()
            }

            alert(`Found: ${results[0].formatted_address}\nClick "New place" to save it!`)
        } else {
            alert('Place not found: ' + status)
        }
    })
}