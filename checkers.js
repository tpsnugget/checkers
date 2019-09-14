// Odd i = dark piece move while even i = lite piece move
// var i = 1

var mouseDown = document.getElementById("myTable")
var mouseUp = document.getElementById("myTable")

var start
var stop

start = mouseDown.addEventListener("mousedown", function(e) {
  start = e.target.id
})

stop = mouseUp.addEventListener("mouseup", function(e) {
  stop = e.target.id

  // Is the proper color piece being moved
  var goodTurn = game.checkTurn( start )

  // If the proper color piece is being moved then check that the landing square
  // is a dark spot
  if ( goodTurn ) {
    var isDarkLandingSquare = game.isDarkLandingSquare( stop )

    // If the landing square is a dark square check to see if the square is
    // occupied
    if ( isDarkLandingSquare ) {
      var isNotOccupiedSquare = game.isNotOccupiedSquare( stop )

      if ( isNotOccupiedSquare ) {
        
        

      }
      else {
        return false
      }

    }
  }
})

var game = {
  initPieces: function() {

    this.darkPieces  = []
    this.litePieces = []

    // Odd i = dark piece move while even i = lite piece move
    this.i = 1

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
  // This function checks i to see if the proper color piece is being moved
  checkTurn: function( start ) {
    // This allows a dark piece to move
    if ( this.i % 2 !== 0 ) {
      var piece = this.darkPieces.filter( e => e.square === start )
      if ( piece.length === 0) { return false }
      else if ( piece[0].color === "dark" ) {
        return true
      }
    }
    else if ( this.i % 2 === 0 ) {
      var piece = this.litePieces.filter( e => e.square === start )
      if ( piece.length === 0) { return false }
      else if ( piece[0].color === "lite" ) {
        return true
      }
    }
    else { return false }
  }, 
  // This function checks to see if the landing spot it a dark square
  isDarkLandingSquare: function( stop ) {
    if ( document.getElementById( stop ).className === "dark" ||
         document.getElementById( stop ).className === "dark darkPiece" ||
         document.getElementById( stop ).className === "dark litePiece")
         { return true }
    else { return false }
  },
  // This function checks to see if the landing square is occupied
  isNotOccupiedSquare: function( stop ) {
    if ( document.getElementById(stop).innerText === "o" ) { return false }
    else { return true }
  }
}

game.initPieces()