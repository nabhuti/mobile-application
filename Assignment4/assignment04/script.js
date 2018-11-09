
window.onload = function() {
    document.getElementById('back').style.display = 'none'
    document.getElementById('test').style.display = 'block'
    document.getElementById('logins').style.display = 'block'

  }

function backWards(){
    document.getElementById('test').style.display = 'block'
    document.getElementById('logins').style.display = 'block'
    document.getElementById('back').style.display = 'none'
    document.getElementById('map-form').style.display = 'none'
}
function log(){
    document.getElementById('test').style.display = 'none'
    document.getElementById('logins').style.display = 'none'
    document.getElementById('back').style.display = 'block'
    loadMap()
    document.getElementById('map-form').style.display = 'block'
    
}


function loadMap() {
    document.getElementById('test').style.display = 'none'
    document.getElementById('logins').style.display = 'none'
    
    mapboxgl.accessToken = 'pk.eyJ1IjoidXdjbGVjdHVyZXIiLCJhIjoiY2ptdWJ6aWt1MGQ4aDN3bzhiM2V1dnRiYyJ9.lWYq773rwVmRzbyHcYAVHw'
    window.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [18.4241, -33.9249], // starting position [lng, lat]
        zoom: 9
    })
  
    window.startPin = new mapboxgl.Marker({ draggable: true }).setLngLat([0, 0]).addTo(window.map)
    window.destinationPin = new mapboxgl.Marker({ draggable: true }).setLngLat([0, 0]).addTo(window.map)
  
    window.map.on('click', function (event) {
        console.log(event)
        if(window.startPoint == true) {
            window.destinationPin.setLngLat(event.lngLat)
            window.startPoint = false
            document.getElementById('destination').value = event.lngLat.lng + ',' + event.lngLat.lat 
        } else {
            window.startPin.setLngLat(event.lngLat)
            window.startPoint = true
            document.getElementById('start').value = event.lngLat.lng + ',' + event.lngLat.lat
        }
    })
    
  
  }
  