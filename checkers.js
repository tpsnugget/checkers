// Odd i = dark piece move while even i = lite piece move
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
    this.darkPieces  = []
    this.litePieces = []

    // Create 9 generic game pieces for each side
    for ( var i = 0; i < 12; i++ ) {
      this.darkPieces.push({
        square: "0",
        color: "dark",
        type: "regPiece"
      })
      this.litePieces.push({
        square: "0",
        color: "lite",
        type: "regPiece"
      })
    }

    // Position each piece in a starting position
    this.darkPieces[0].square  = "11"
    this.darkPieces[1].square  = "13"
    this.darkPieces[2].square  = "15"
    this.darkPieces[3].square  = "17"
    this.darkPieces[4].square  = "22"
    this.darkPieces[5].square  = "24"
    this.darkPieces[6].square  = "26"
    this.darkPieces[7].square  = "28"
    this.darkPieces[8].square  = "31"
    this.darkPieces[9].square  = "33"
    this.darkPieces[10].square = "35"
    this.darkPieces[11].square = "37"
    this.litePieces[0].square  = "62"
    this.litePieces[1].square  = "64"
    this.litePieces[2].square  = "66"
    this.litePieces[3].square  = "68"
    this.litePieces[4].square  = "71"
    this.litePieces[5].square  = "73"
    this.litePieces[6].square  = "75"
    this.litePieces[7].square  = "77"
    this.litePieces[8].square  = "82"
    this.litePieces[9].square  = "84"
    this.litePieces[10].square = "86"
    this.litePieces[11].square = "88"

    for ( var i = 0; i < 12; i++ ) {
      this.displayPiece( this.darkPieces[i] )
      this.displayPiece( this.litePieces[i] )
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

    // Find the piece at the start location
    // e represents the entire array
    // e.square is a piece of an array element
    var piece = this.darkPieces.filter( e => e.square === start )

    // Find the index in the 
    var index = this.darkPieces.findIndex( e => e.square === start )

    if ( piece.length === 0 ) {
      piece = this.litePieces.filter( e => e.square === start )
      index = this.litePieces.findIndex( e => e.square === start )
    }

    // Check the stop location
    var stopLocation = document.getElementById(stop)

    if ( stopLocation.className === "lite" ) {
      return
    }

    var oldSpot = document.getElementById(start)
    var newSpot = document.getElementById(stop)

    if ( oldSpot === null ) { console.log("You selected a blank spot") }

    else if ( oldSpot.textContent === "" ) { console.log("You selected a blank spot") }
    
    else if ( oldSpot.textContent === "o" ) {

      // Update location of new spot
      if ( piece[0].color === "dark" ) { this.darkPieces[index].square = stop }
      else if ( piece[0].color === "lite" ) { this.litePieces[index].square = stop }

      if ( piece[0].type === "regPiece" ) {
        // Remove o from previous location
        oldSpot.textContent = ""
        // Add o to new location
        newSpot.textContent = "o"
        
        // Update classNames in the DOM
        newSpot.className = oldSpot.className
        oldSpot.className = "dark"
      }
      else if ( oldSpot.type === "King" ) {
        console.log("Kimg Me!!")
      }

    }

  }
}

game.initPieces()