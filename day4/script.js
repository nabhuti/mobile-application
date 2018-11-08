function generateGuess(){
    return Math.round(Math.random()* 10)
}

const app = new Vue({
    el: "#app",
    data: {
     computerGues:generateGuess(),
      timer: 20,
      guesnNo :0,
      errors: [ ],
      showModal:false,
      failure: false,
      success:false,
      customMessage:''

    },
    methods: {
        guessing: function () {
           if(this.guesnNo == this.computerGues){
            alert('CORRECT!!!')
            this.errors=[]

            app.timer = 20
            this.computerGues=generateGuess()
           }else{
            this.errors.push(true)
            if(this.errors.length >= 3){
                alert('You Failed!!!'+ ' '+this.computerGues )
                this.errors=[]

                app.timer = 20
                this.computerGues=generateGuess()
               

            }
            
            console.log(this.computerGues)
           }
            
        }
      }
  })
  function countDown(){
     app.timer--
     if (app.timer == 0){
         alert('You failed')
         app.showModal=true
         app.failure=true
         app.success=false
         app.timer = 20
         app.customMessage='The correct value is:' +' '+app.computerGues
     }
  }
  setInterval(countDown,1000)