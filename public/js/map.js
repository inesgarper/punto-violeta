let map
let pointer = false

let conflicto = 6

let borrar

function initMap() {
    drawMap()
    getCases()
    selectPointer()
    pointerLocation()



    // const infowindow = new google.maps.InfoWindow({
    //     content: 'hola'
    // })

    // const marker1 = new google.maps.Marker({
    //     position: new google.maps.LatLng(37.38643412087282, -5.992667346003612),
    //     map,
    //     title: 'marker de prueba'
    // })

    // infowindow.open(map, marker1)
}

function drawMap() {

    const { Map } = google.maps

    map = new Map(
        document.getElementById('myMap'),
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

function getCases() {

    axios.get('/api/cases')
        .then(response => printCasesMarkers(response.data))
        .catch(err => console.log(err))

}

function printCasesMarkers(cases) {

    const { Marker } = google.maps

    const windowText = "<"

    cases.forEach(elm => {

        const infowindow = new google.maps.InfoWindow({
            content: elm.description
        })
        const marker = new Marker({
            map,
            position: {
                lat: elm.location.coordinates[0],
                lng: elm.location.coordinates[1]
            }
        })

        marker.addListener('click', () => {
            infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
            })
        })

    })



}
function getCoords() {

    navigator.geolocation.getCurrentPosition(
        geolocationDetails => centerMap(geolocationDetails),
        errorDetails => console.log('fallo --->', errorDetails)
    )
}
function centerMap(geolocationDetails) {

    const { latitude, longitude } = geolocationDetails.coords
    const position = { lat: latitude, lng: longitude }
    const { Marker } = google.maps

    map.setCenter(position)

    new Marker({ map, position })
}