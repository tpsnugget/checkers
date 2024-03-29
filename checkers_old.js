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
  var goodTurn = game.checkTurn( start )
  if ( goodTurn ) {
    game.movePiece( start, stop )
    return e.target.id
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
      else {
        var piece = this.litePieces.filter( e => e.square === start )
        if ( piece.length === 0) { return false }
        else if ( piece[0].color === "lite" ) {
          return true
        }
      }
    },
  movePiece: function( start, stop ) {

    //==================== dark pieces =========================================
    // Find the piece at the start location
    // e represents an element of the array
    // e.square is a piece of an array element
    // piece[0] has : square:,
    //                color:,
    //                type:
    var piece = this.darkPieces.filter( e => e.square === start )
    // Find the index in the game.array
    var index = this.darkPieces.findIndex( e => e.square === start )

    //==================== lite pieces =========================================
    if ( piece.length === 0 ) {
      piece = this.litePieces.filter( e => e.square === start )
      index = this.litePieces.findIndex( e => e.square === start )
    }

    //==================== make sure the landing spot is not a lite square =====
    //==================== make sure the landing spot is not already occupied ==
    var newSpot = document.getElementById(stop)
    if ( newSpot.className === "lite" ) {
      console.log("You can't land on a lite spot!")
      return
    }
    else if ( newSpot.textContent === "o" ) {
      console.log("You can't land on an occupied spot!")
      return
    }
    //==================== make sure the landing spot is not already occupied ==
    //==================== make sure the landing spot is not a lite square =====

    var oldSpot = document.getElementById(start)

    if ( oldSpot === null ) { console.log("You selected a blank spot") }

    else if ( oldSpot.textContent === "" ) { console.log("You selected a blank spot") }
    
    else if ( oldSpot.textContent === "o" ) {

      // Check to see if move is legal
      var legalMove = this.checkMove( start, stop, piece )

      if ( legalMove ) {
        // Update location of new spot
        if ( piece[0].color === "dark" ) { this.darkPieces[index].square = stop }
        else if ( piece[0].color === "lite" ) { this.litePieces[index].square = stop }

        // Update old spot and new spot textContent with "" or o
        // if ( piece[0].type === "regPiece" ) {
          // Remove o from previous location
          oldSpot.textContent = ""
          // Add o to new location
          newSpot.textContent = "o"
          
          // Update classNames in the DOM
          newSpot.className = oldSpot.className
          oldSpot.className = "dark"

          // Update i
          this.i++
        // }
      }
    }
  },
  //============================================================================
  //============================================================================
  // The landing square has already been checked and is not occupied

  // The function first checks for single diagonal moves to make sure they are
  // legal

  // The function then checks double moves to see if the jump is legal. If so it
  // calls the removePiece() function to remove the piece from the array and to
  // remove the piece from the DOM
  // piece[0] has : square:,
  //                color:,
  //                type:
  checkMove: function( start, stop, piece ) {
    var pieceColor = piece[0].color
    var pieceType  = piece[0].type


    //======== Square 22 =======================================================
    //======== Square 22 =======================================================

        // Check for legal single move
    if ( (start === "22" && stop === "11") ||
         (start === "22" && stop === "13") ) {
      // Legal moves here are lite piece or dark King
      if ( !(pieceColor === "dark" && pieceType == "regPiece") ) {
        console.log("This is a legal move")
        // Check to King a lite piece
        if ( pieceColor === "lite" && pieceType === "regPiece" ) {
          this.kingPiece( piece )
          return true
        }
        return true
      }
      else {
        console.log("This is not a legal move")
        return false
      }
    }
    else if ( start === "22" ) {
      console.log("This is not a legal move")
      return true
    }




    //======== Square 22 =======================================================
    //======== Square 22 =======================================================


    //======== Square 31 =======================================================
    //======== Square 31 =======================================================

    // Check for legal single move up
    else if ( start === "31" && stop === "42" ) {
      // Legal moves here are dark piece or lite King
      if ( !(pieceColor === "lite" && pieceType == "regPiece") ) {
        console.log("This is a legal move")
        return true
      }
      else {
        console.log("This is not a legal move")
        return false
      }
    }
    // Check for legal single move down
    else if ( start === "31" && stop === "22" ) {
      // Legal moves here are lite piece or dark King
      if ( !(pieceColor === "dark" && pieceType == "regPiece") ) {
        console.log("This is a legal move")
        return true
      }
      else {
        console.log("This is not a legal move")
        return false
      }
    }
    // Check for legal jump up
    else if ( start === "31" && stop === "53" ) {
      // Legal moves here are dark piece or lite King
      if ( !(pieceColor === "lite" && pieceType == "regPiece") ) {
        // Dark pieces
        if ( pieceColor === "dark" ) {
          var jumpSquare = this.litePieces.filter( e => e.square === "42" )
          if ( jumpSquare.length === 0 ) {
            console.log("This is not a legal jump")
            return false
          }
          else if ( jumpSquare[0].square === "42" ) {
            console.log("This is a legal jump")
            return true
          }
          else {
            console.log("This is not a legal jump")
            return false
          }
        }
        // Lite pieces
        if ( pieceColor === "lite" ) {
          var jumpSquare = this.darkPieces.filter( e => e.square === "42" )
          if ( jumpSquare.length === 0 ) {
            console.log("This is not a legal jump")
            return false
          }
          else if ( jumpSquare[0].square === "42" ) {
            console.log("This is a legal jump")
            return true
          }
          else {
            console.log("This is not a legal jump")
            return false
          }
        }
      }
      else { return false }
    }
      // Check for legal jump down
      else if ( start === "31" && stop === "13" ) {
        // Legal moves here are lite piece or dark King
        if ( !(pieceColor === "dark" && pieceType == "regPiece") ) {
          // Dark pieces
          if ( pieceColor === "dark" ) {
            var jumpSquare = this.litePieces.filter( e => e.square === "22" )
            if ( jumpSquare.length === 0 ) {
              console.log("This is not a legal jump")
              return false
            }
            else if ( jumpSquare[0].square === "42" ) {
              console.log("This is a legal jump")
              return true
            }
            else {
              console.log("This is not a legal jump")
              return false
            }
          }
          // Lite pieces
          if ( pieceColor === "lite" ) {
            var jumpSquare = this.darkPieces.filter( e => e.square === "22" )
            if ( jumpSquare.length === 0 ) {
              console.log("This is not a legal jump")
              return false
            }
            else if ( jumpSquare[0].square === "42" ) {
              console.log("This is a legal jump")
              return true
            }
            else {
              console.log("This is not a legal jump")
              return false
            }
          }
        }
        else { return false }
      }
    else if ( start === "31") {
      console.log("This is not a legal move")
      return false
    }
    else {
      return true
    }




    //======== Square 31 =======================================================
    //======== Square 31 =======================================================


    //======== Square 33: dark Piece ===========================================
    //======== Square 33: dark Piece ===========================================
    if ( pieceColor === "dark" && start === "33" && stop === "51" ) {
      var jumpSquare = this.litePieces.filter( e => e.square === "42" )
      if ( jumpSquare.length === 0 ) {
        console.log("This is not a legal jump")
        return false
      }
      else if ( jumpSquare[0].square === "42" ) {
        console.log("This is a legal jump")
        return true
      }
      else {
        console.log("This is not a legal jump")
        return false
      }
    }

    if ( pieceColor === "dark" && start === "33" && stop === "55" ) {
      var jumpSquare = this.litePieces.filter( e => e.square === "44" )
      if ( jumpSquare.length === 0 ) {
        console.log("This is not a legal jump")
        return false
      }
      else if ( jumpSquare[0].square === "44" ) {
        console.log("This is a legal jump")
        return true
      }
      else {
        console.log("This is not a legal jump")
        return false
      }
    }
    //======== Square 33: dark Piece ===========================================
    //======== Square 33: dark Piece ===========================================


    //======== Square 35: dark Piece ===========================================
    //======== Square 35: dark Piece ===========================================
    if ( pieceColor === "dark" && start === "35" && stop === "53" ) {
      var jumpSquare = this.litePieces.filter( e => e.square === "44" )
      if ( jumpSquare.length === 0 ) {
        console.log("This is not a legal jump")
        return false
      }
      else if ( jumpSquare[0].square === "44" ) {
        console.log("This is a legal jump")
        return true
      }
      else {
        console.log("This is not a legal jump")
        return false
      }
    }

    if ( pieceColor === "dark" && start === "35" && stop === "57" ) {
      var jumpSquare = this.litePieces.filter( e => e.square === "46" )
      if ( jumpSquare.length === 0 ) {
        console.log("This is not a legal jump")
        return false
      }
      else if ( jumpSquare[0].square === "46" ) {
        console.log("This is a legal jump")
        this.removePiece("lite", "46")
        return true
      }
      else {
        console.log("This is not a legal jump")
        return false
      }
    }
    //======== Square 35: dark Piece ===========================================
    //======== Square 35: dark Piece ===========================================


    //======== Square 37: dark Piece ===========================================
    //======== Square 37: dark Piece ===========================================
    if ( pieceColor === "dark" && start === "37" && stop === "55" ) {
      var jumpSquare = this.litePieces.filter( e => e.square === "46" )
      if ( jumpSquare.length === 0 ) {
        console.log("This is not a legal jump")
        return false
      }
      else if ( jumpSquare[0].square === "46" ) {
        console.log("This is a legal jump")
        this.removePiece("lite", "46")
        return true
      }
      else {
        console.log("This is not a legal jump")
        return false
      }
    }
    //======== Square 37: dark Piece ===========================================
    //======== Square 37: dark Piece ===========================================
    return true
  },
  removePiece: function( color, square ) {
    if ( color === "lite" ) {
      // Find the index of the piece to remove
      var index = this.litePieces.findIndex( e => e.square === square )
      // Delete the piece from the array
      this.litePieces.splice( index, 1 )
      // Get the square from the DOM
      var removePiece = document.getElementById(square)
      // Delete the piece from the DOM
      removePiece.innerText = ""
    }
  },
  // piece[0] has : square:,
  //                color:,
  //                type:
  kingPiece: function( piece ) {
    console.log("I am Kinging a lite piece on square 11")
    var index = this.litePieces.findIndex( e => e.square === piece[0].square)
    this.litePieces[index].type = "King"
    console.log(this.litePieces[index].type)
  }
}

game.initPieces()