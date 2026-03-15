let map;
let directionsService;
let directionsRenderer;

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: { strokeColor: "#7c3aed", strokeWeight: 5 }
    });
    
    const center = { lat: 28.6273, lng: 77.3725 }; // Centered around Noida/GZB
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
        disableDefaultUI: true,
        styles: [ /* Custom Silver/Purple Map Theme */ ]
    });
    directionsRenderer.setMap(map);
}

export function calculateRoute(start, end) {
    const request = {
        origin: start + ", India",
        destination: end + ", India",
        travelMode: 'DRIVING'
    };
    directionsService.route(request, (result, status) => {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });
}