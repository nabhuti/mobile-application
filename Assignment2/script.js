// create a client here: https://developer.whereismytransport.com/clients
var app = new Vue({
    name: "Transporter",
    short_name: "Transporter time",
    description: "Transporting application",
    start_url: "/?homescreen=1",
    background_color: "#000000",
    theme_color: "#0f4a73",
    icons: [
        {
          src: "/images/icons-192.png",
          type: "image/png",
          sizes: "192x192"
        }]
  })
  var manifest= document.getElementById('myJSON').innerHTML; //sets manifest to the text in #myJSON
manifest= JSON.parse(manifest) //Converts it into JSON
document.getElementById('test').innerHTML= manifest.name+ '<br/>'+ manifest.otherOptions; //Displays it
console.log('manifest')
console.log(manifest);

