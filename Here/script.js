
const app_id = 'oTERX2hRES8AmqElPIKI'
const app_code = 'LVuT9MRoJ8PCQEmE2H9CJQ'



const autocompleteurl = "http://autocomplete.geocoder.api.here.com/6.2/suggest.json" +
    "?app_id=" + app_id +
    "&app_code=" + app_code +
    "&query="

const geocodeurl = "https://geocoder.api.here.com/6.2/geocode.json" +
    "?app_id=" + app_id +
    "&app_code=" + app_code +
    "&searchtext="

var app = new Vue({
    el: '#app',
    data: {
        address: '',
        results: [],
        geoResults: []
    },
    methods: {
        search: function () {
            if (this.address.length > 5) {
                var _this = this
                fetch(autocompleteurl + this.address)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (response) {
                        _this.results = response.suggestions
                    })
            } else {
                console.log('must use a valid email address')
            }
        },
        Klick: function (result) {
            this.address = result.label
        },
        find: function () {
            var _this = this

            fetch(geocodeurl + this.address)
                .then(function (response) {
                    return response.json()
                })
                .then(function (response) {
                    console.log('geocode', response)
                    console.log('location', response.Response.View[0].Result[0].Location.DisplayPosition)
                    _this.geoResults = response.Response.View[0].Result
                })

        },
    }
})
