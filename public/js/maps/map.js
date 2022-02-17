let map
let pointer = false

function initMap() {
    drawMap()
    getCases()
    selectPointer()
    pointerLocation()
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

        let clickedLocation = event.latLng;

        const image = 'https://i.ibb.co/sKmTRyw/pointer.png'

        if (pointer === false) {

            pointer = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true,
                icon: image

            });

            google.maps.event.addListener(pointer, 'dragend', function (event) {
                pointerLocation();
            });

        } else {
            pointer.setPosition(clickedLocation);
        }

        pointerLocation();
    })

}

function pointerLocation() {


    let currentLocation = pointer.getPosition();

    document.getElementById('latInput').value = currentLocation.lat();
    document.getElementById('lngInput').value = currentLocation.lng();

}

function getCases() {

    axios.get('/api/cases')
        .then(response => printCasesMarkers(response.data))
        .catch(err => console.log(err))

}

function printCasesMarkers(cases) {

    const { Marker } = google.maps

    cases.forEach(elm => {

        const infowindow = new google.maps.InfoWindow({
            content: `<p>${elm.description}</p> <a href="/usuario/${elm.creator}/${elm._id}" class="btn">ver detalles</a>`
        })

        const image = 'https://i.ibb.co/QDvh6yP/marker.png'

        const marker = new Marker({
            map,
            position: {
                lat: elm.location.coordinates[0],
                lng: elm.location.coordinates[1]
            },
            icon: image,
            animation: google.maps.Animation.DROP
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