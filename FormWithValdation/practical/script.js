
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
                
            }
        }
    }
})

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

