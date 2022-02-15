let map
let pointer = false

function initMap() {
    drawMap()
    selectPointer()
    pointerLocation()
}

function drawMap() {

    const { Map } = google.maps

    map = new Map(
        document.getElementById('editMap'),
        {
            zoom: 10,
            center: { lat: 40.392499, lng: -3.698214 },
            styles: mapStyles.violet
        }
    )
}

function selectPointer() {
    google.maps.event.addListener(map, 'click', function (event) {
        //Get the location that the user clicked.
        let clickedLocation = event.latLng;
        //If the marker hasn't been added.
        if (pointer === false) {
            //Create the marker.
            pointer = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true //make it draggable
            });
            //Listen for drag events!
            google.maps.event.addListener(pointer, 'dragend', function (event) {
                pointerLocation();
            });
        } else {
            //Marker has already been added, so just change its location.
            pointer.setPosition(clickedLocation);
        }
        //Get the marker's location.
        pointerLocation();
    })
}

    function pointerLocation() {
        //This function will get the marker's current location and then add the lat/long
        //values to our textfields so that we can save the location.

        //Get location.
        let currentLocation = pointer.getPosition();
        //Add lat and lng values to a field that we can save.
        document.getElementById('latInput').value = currentLocation.lat(); //latitude
        document.getElementById('lngInput').value = currentLocation.lng(); //longitude
    }
