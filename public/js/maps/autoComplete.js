var placeSearch, autocomplete

function initAutocomplete() {

    autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        { types: ['geocode'] });


    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {

    let place = autocomplete.getPlace();
    document.getElementById('mapsURL').value = place.url
    document.getElementById('address').value = place.formatted_address

}
