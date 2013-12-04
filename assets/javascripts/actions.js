var directToRandomLink = {

  initialize: function() {
    var awesomeLink = document.getElementById("awesome-link")
    awesomeLink.addEventListener("click", function(){
      var yourLink = randomize.getLink()
      awesomeLink.href = yourLink
    });
  }
}

var randomize = {

  myLinks: new Array(
    "http://instapulse.herokuapp.com/",
    "https://github.com/gopher-snakes-2013/Instapulse",
    "http://starwarsracer.herokuapp.com/",
    "https://github.com/gopher-snakes-2013/orphan_snakes",
    "http://interview-overflow.herokuapp.com/",
    "https://github.com/gopher-snakes-2013/interview-overflow"
  ),

  randomNumber: function(collectionOfLinks){
  var randomNumber = Math.round(Math.random()*(collectionOfLinks.length-1))
  return randomNumber
  },

  getLink: function(){
  var myRandomLink = randomize.randomNumber(randomize.myLinks)
  return this.myLinks[myRandomLink]
  }

}


$(document).ready(function() {
  directToRandomLink.initialize()
})
