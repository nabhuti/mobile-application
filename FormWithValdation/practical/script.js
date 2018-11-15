
var map = L.map('map').setView([-33.91, 18.41], 11)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

const appId = 'BqU0U8dHPxCCYD9lLONy'
const appCode = 'sEcZjhBTHp46SlRzts1ZMQ'

const autocompleteUrl = "http://autocomplete.geocoder.api.here.com/6.2/suggest.json" +
    "?app_id=" + appId +
    "&app_code=" + appCode +
    "&query="

const geocodeUrl = "https://geocoder.api.here.com/6.2/geocode.json" +
    "?app_id=" + appId +
    "&app_code=" + appCode +
    "&searchtext="
document.getElementById('map').style.display = 'none'
document.getElementById('search').style.display = 'none'
var app = new Vue({
    el: '#app',
    data: {
        startAddress: '',
        destinationAddress: '',
        startLocation: undefined,
        destinationLocation: undefined,
        isStart: true,
        autoCompleteResults: [],
        startPoint: undefined,
        destinationPoint: undefined,
        username: '',
        password: '',
        usernameError: false,
        passwordError: false,
        usernameErrorMessage: [],
        passwordErrorMessage: []
    },
    methods: {
        validate: function () {
            this.passwordError = false
            this.usernameError = false
            this.usernameErrorMessage = [],
                this.passwordErrorMessage = []

            if (this.password.length < 6) {
                this.passwordError = true
                this.passwordErrorMessage.push({ msg: 'Password is too short', date: Date.now() })
            }

            if (this.username.length < 3) {
                this.usernameError = true
                this.usernameErrorMessage.push({ msg: 'Username is too short', date: Date.now() })

            }

            if (!(this.username.includes('@'))) {
                this.usernameError = true
                this.usernameErrorMessage.push({ msg: 'Username must include @', date: Date.now() })

            } else {
                document.getElementById('apo').style.display = 'none'

                document.getElementById('search').style.display = 'block'
                document.getElementById('map').style.display = 'block'
            }
        },
        autocomplete: function (isStart) {
            var _this = this
            var text = this.startAddress

            if (isStart == false) {
                text = this.destinationAddress
            }

            if (text.length < 5) {
                return false
            }

            fetch(autocompleteUrl + text)
                .then(function (response) {
                    return response.json()
                })
                .then(function (response) {
                    _this.autoCompleteResults = response.suggestions
                    _this.isStart = isStart
                })
        },
        resultSelect: function (result) {
            var _this = this
            fetch(geocodeUrl + result.label)
                .then(function (response) {
                    return response.json()
                })
                .then(function (response) {
                    var location = response.Response.View[0].Result[0].Location.DisplayPosition
                    if (_this.isStart == true) {
                        _this.startPoint = L.marker([location.Latitude, location.Longitude])
                        _this.startPoint.addTo(map)
                        _this.startLocation = location
                        _this.autoCompleteResults = []
                    } else {
                        _this.destinationPoint = L.marker([location.Latitude, location.Longitude])
                        _this.destinationPoint.addTo(map)
                        _this.destinationLocation = location
                        _this.autoCompleteResults = []
                    }
                })
        },
        search: function () {
            // will connect to the whereismytransport api and get some results and do things with it.
            //From whereismytransport developer page
            var CLIENT_ID = 'f99da0f2-7aed-4d6a-a64b-5a166c99bdd3';
            var CLIENT_SECRET = 'fTV46ARkBaBb+nSNwmBWQm2Eum+I2ik+cBsq6Bsnwso=';
            var payload = {
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET,
                'grant_type': 'client_credentials',
                'scope': 'transportapi:all'
            };
            var request = new XMLHttpRequest();
            request.open('POST', 'https://identity.whereismytransport.com/connect/token', true);
            request.addEventListener('load', function () {
                var response = JSON.parse(this.responseText);
                var token = response.access_token;
                window.token = token;

                if (this.status == 200) {
                    localStorage.setItem('token', token)
                    localStorage.setItem('storageDate', Date.now().toLocaleString())

                } else {
                    console.log("get token call failed")
                }
            });
            request.setRequestHeader('Accept', 'application/json');
            var formData = new FormData();

            for (var key in payload) {
                formData.append(key, payload[key]);
            }

            request.send(formData);

            
        },
        getToken: function () {
            var token = this.localStorage.getItem('token')
            if(token == null || token == undefined || token == 'undefined') {
                throw new Error("Invalid token")
            } else {
                return token
            }
        }

        
    }
})


window.addEventListener('load', function () {

    var webAuth = new auth0.WebAuth({
        domain: 'dandan.auth0.com',
        clientID: 'J9_G5vbK3js_sLQEP2zaQTIlS5sfXPTA',
        responseType: 'token id_token',
        scope: 'openid',
        redirectUri: window.location.href
    });

    var loginBtn = document.getElementById('btn-login');

    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        webAuth.authorize();
    });

});

