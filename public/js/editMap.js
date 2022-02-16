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
       
        let clickedLocation = event.latLng;
      
        if (pointer === false) {
           
            pointer = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true 
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
