// Odd i = dark piece move while even i = light piece move
var i = 1

var mouseDown = document.getElementById("myTable")
var mouseUp = document.getElementById("myTable")

var start
var stop

start = mouseDown.addEventListener("mousedown", function(e) {
  start = e.target.id
})

stop = mouseUp.addEventListener("mouseup", function(e) {
  stop = e.target.id
  game.movePiece( start, stop )
  return e.target.id
})

var game = {
  initPieces: function() {
    var darkPieces  = []
    var litePieces = []

    // Create 9 generic game pieces for each side
    for ( var i = 0; i < 12; i++ ) {
      darkPieces.push({
        square: "0",
        color: "dark",
        type: "regPiece"
      })
      litePieces.push({
        square: "0",
        color: "lite",
        type: "regPiece"
      })
    }

    // Position each piece in a starting position
    darkPieces[0].square  = "11"
    darkPieces[1].square  = "13"
    darkPieces[2].square  = "15"
    darkPieces[3].square  = "17"
    darkPieces[4].square  = "22"
    darkPieces[5].square  = "24"
    darkPieces[6].square  = "26"
    darkPieces[7].square  = "28"
    darkPieces[8].square  = "31"
    darkPieces[9].square  = "33"
    darkPieces[10].square = "35"
    darkPieces[11].square = "37"
    litePieces[0].square  = "62"
    litePieces[1].square  = "64"
    litePieces[2].square  = "66"
    litePieces[3].square  = "68"
    litePieces[4].square  = "71"
    litePieces[5].square  = "73"
    litePieces[6].square  = "75"
    litePieces[7].square  = "77"
    litePieces[8].square  = "82"
    litePieces[9].square  = "84"
    litePieces[10].square = "86"
    litePieces[11].square = "88"

    for ( var i = 0; i < 12; i++ ) {
      this.displayPiece( darkPieces[i] )
      this.displayPiece( litePieces[i] )
    }

  },
  displayPiece: function( piece ) {
    var myPiece = document.getElementById( piece.square )
    myPiece.textContent = "o"
    
    if ( piece.color === "dark" ) {
      myPiece.className = "dark darkPiece"
    }
    else if ( piece.color === "lite" ) {
      myPiece.className = "dark litePiece"
    }

  },
  movePiece: function( start, stop ) {

    var oldSpot = document.getElementById(start)
    var newSpot = document.getElementById(stop)

    if ( oldSpot.textContent === "o" ) {
      oldSpot.textContent = ""
      newSpot.textContent = "o"

      newSpot.className = oldSpot.className
      oldSpot.className = "dark"
    }

  }
}

game.initPieces()