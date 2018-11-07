// create a client here: https://developer.whereismytransport.com/clients
var app = new Vue({
    el: '#app',
    data:{
        guess:0,
        guesnNo :0
    },
    methods: {
        guessing: function () {
           if(this.guesnNo == this.guess){
            alert('You guessed rihgt'+' '+ 'the number was '+this.$data.guess)
           }else{
            alert('Wrong! try again'+' '+ 'the number was '+this.$data.guess )
           }
            
        }
      }
})
app.guess = Math.round(Math.random()*10)
