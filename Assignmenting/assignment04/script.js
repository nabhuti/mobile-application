



var app = new Vue({
    el: '#app',
    data:{
        username:'',
        password :'',
        usernameError:false,
        passwordError:false,
        usernameErrorMessage:[],
        passwordErrorMessage:[]
    },
    methods: {
        validate: function () {
            this.passwordError=false 
            this.usernameError=false
            this.usernameErrorMessage=[],
            this.passwordErrorMessage=[]

            if(this.password.length < 6){
                this.passwordError=true
                this.passwordErrorMessage.push({msg:'Password is too short', date:Date.now()})
            }
            
            if(this.username.length < 3){
                this.usernameError=true
                this.usernameErrorMessage.push({msg:'Username is too short', date:Date.now()})
                
            }
            
            if(!(this.username.includes('@'))){
                this.usernameError=true
                this.usernameErrorMessage.push({msg:'Username must include @', date:Date.now()})
                
            }else{
                loadMap()
            }
            
        }
    }
})
document.getElementById('back').style.display = 'none'
document.getElementById('journey-form').style.display = 'none'

window.addEventListener('load', function() {

    var webAuth = new auth0.WebAuth({
      domain: 'dandan.auth0.com',
      clientID: 'J9_G5vbK3js_sLQEP2zaQTIlS5sfXPTA',
      responseType: 'token id_token',
      scope: 'openid',
      redirectUri: window.location.href
    });
  
    var loginBtn = document.getElementById('btn-login');
  
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      webAuth.authorize();
    });
  
  });

  function backWards(){
    document.getElementById('app').style.display = 'block'
    document.getElementById('logins').style.display = 'block'
    document.getElementById('back').style.display = 'none'
    document.getElementById('map-form').style.display = 'none'
}

function loadMap() {
    document.getElementById('app').style.display = 'none'
    document.getElementById('logins').style.display = 'none'
    document.getElementById('journey-form').style.display = 'block'
    document.getElementById('back').style.display = 'block'
    document.getElementById('map-form').style.display = 'block'

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
  