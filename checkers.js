// The game is managed inside the mouseUp.addEvenListener

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
  //============================================================================
  // If you are here then the proper color piece is attempting to move        ==
  //============================================================================

    var isDarkLandingSquare = game.isDarkLandingSquare( stop )

    // If the landing square is a dark square check make sure the landing square
    // is not occupied
    if ( isDarkLandingSquare ) {
    //==========================================================================
    // If you are here then the attempted landing square is a dark square     ==
    //==========================================================================
      var isNotOccupiedSquare = game.isNotOccupiedSquare( stop )

      if ( isNotOccupiedSquare ) {
      //========================================================================
      // If you are here then the chosen landing square is not occupied by a  ==
      // playing piece                                                        ==
      //========================================================================

        // Find the game piece being moved
        // piece[0].square
        // piece[0].color
        // piece[0].type
        var piece = game.getPiece( start )

        var isLegalSingleMove = game.isLegalSingleMove( start, stop, piece )

        if ( isLegalSingleMove ) {
        //======================================================================
        // If you are here then the move is a proper single move              ==
        //======================================================================
          game.i++
          game.movePiece( stop, piece )
          game.displayPiece( piece[0] )
          game.erasePiece( start )
        }
        else {
        //======================================================================
        // If you are here the attempted move is not a legal single move.     ==
        // Need to check for a legal jump move                                ==
        //======================================================================  
          var jumpPiece = game.getJumpPiece( start, stop, piece )
          //====================================================================
          // This will return either jumpPiece[0].square, .color, .type or    ==
          // false.                                                           ==
          //====================================================================
          // Boolean( jumpPiece[0] evaluates as true )                        ==
          //====================================================================

          if ( jumpPiece ) {
          //====================================================================
          // If you are here then there is a proper color piece between the   ==
          // start and stop squares. That does not mean that the jump move    ==
          // is legal though.                                                 ==
          //====================================================================
            game.i++
            game.movePiece( stop, piece )
            game.displayPiece( piece[0] )
            game.erasePiece( start )
            game.erasePiece( jumpPiece[0].square )
            game.deletePiece( jumpPiece )
          }
        }
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
    // This allows a lite piece to move
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
  },
  // The purpose of this function is to encapsulate a large function that checks
  // if a starting square and landing square are a legal combination
  isLegalSquare: function( start, stop ) {
    if ( start === "11" && ( stop === "22" || stop === "33" )) {
      return true
    }
    else if ( start === "31" &&
            ( stop  === "42" || stop === "53" || stop === "22" || stop === "13") ) {
      return true
    }
    else { return false }
  },
  // This method finds the piece at the start location and returns
  // piece[0].square
  // piece[0].color
  // piece[0].type
  getPiece: function( start ) {
    // Identifies a dark piece
    if ( this.i % 2 !== 0 ) {
      var piece = this.darkPieces.filter( e => e.square === start )
      return piece
    }
    // Identifies a lite piece
    else if ( this.i % 2 === 0 ) {
      var piece = this.litePieces.filter( e => e.square === start )
      return piece
    }
  },
  //
  isLegalSingleMove: function( start, stop, piece ) {

    var pieceColor = piece[0].color
    var pieceType  = piece[0].type

    //==========================================================================
    //== Moving from Row 1 to Row 2 ============================================
    //==========================================================================
    // If the piece starts at square 11 then it has to either be a dark peice or
    // be a lite piece that has been Kinged
    // Square 11 to 22
    if ( start === "11" && stop === "22" ) {
      return true
    }
    // Square 13 to 22
    else if ( start === "13" && stop === "22" ) {
      return true
    }
    // Square 13 to 24
    else if ( start === "13" && stop === "24" ) {
      return true
    }
    // Square 15 to 24
    else if ( start === "15" && stop === "24" ) {
      return true
    }
    // Square 15 to 26
    else if ( start === "15" && stop === "26" ) {
      return true
    }
    // Square 17 to 26
    else if ( start === "17" && stop === "26" ) {
      return true
    }
    // Square 17 to 28
    else if ( start === "17" && stop === "28" ) {
      return true
    }
    //==========================================================================
    //== Moving from Row 2 to Row 3 ============================================
    //==========================================================================
    // Square 22 to 31
    else if ( start === "22" && stop === "31" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 22 to 33
    else if ( start === "22" && stop === "33" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 24 to 33
    else if ( start === "24" && stop === "33" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 24 to 35
    else if ( start === "24" && stop === "35" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 26 to 35
    else if ( start === "26" && stop === "35" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 26 to 37
    else if ( start === "26" && stop === "37" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 28 to 37
    else if ( start === "28" && stop === "37" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    //==========================================================================
    //== Moving from Row 3 to Row 4 ============================================
    //==========================================================================
    // Square 31 to 42
    else if ( start === "31" && stop === "42" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 33 to 42
    else if ( start === "33" && stop === "42" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 33 to 44
    else if ( start === "33" && stop === "44" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 35 to 44
    else if ( start === "35" && stop === "44" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 35 to 46
    else if ( start === "35" && stop === "46" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 37 to 46
    else if ( start === "37" && stop === "46" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 37 to 48
    else if ( start === "37" && stop === "48" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    //==========================================================================
    //== Moving from Row 4 to Row 5 ============================================
    //==========================================================================
    // Square 42 to 51
    else if ( start === "42" && stop === "51" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 42 to 53
    else if ( start === "42" && stop === "53" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 44 to 53
    else if ( start === "44" && stop === "53" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 44 to 55
    else if ( start === "44" && stop === "55" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 46 to 55
    else if ( start === "46" && stop === "55" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 46 to 57
    else if ( start === "46" && stop === "57" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 48 to 57
    else if ( start === "48" && stop === "57" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    //==========================================================================
    //== Moving from Row 5 to Row 6 ============================================
    //==========================================================================
    // Square 51 to 62
    else if ( start === "51" && stop === "62" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 53 to 62
    else if ( start === "53" && stop === "62" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 53 to 64
    else if ( start === "53" && stop === "64" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 55 to 64
    else if ( start === "55" && stop === "64" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 55 to 66
    else if ( start === "55" && stop === "66" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 57 to 66
    else if ( start === "57" && stop === "66" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 57 to 68
    else if ( start === "57" && stop === "68" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    //==========================================================================
    //== Moving from Row 6 to Row 7 ============================================
    //==========================================================================
    // Square 62 to 71
    else if ( start === "62" && stop === "71" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 62 to 73
    else if ( start === "62" && stop === "73" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 64 to 73
    else if ( start === "64" && stop === "73" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 64 to 75
    else if ( start === "64" && stop === "75" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 66 to 75
    else if ( start === "66" && stop === "75" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 66 to 77
    else if ( start === "66" && stop === "77" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    // Square 68 to 77
    else if ( start === "68" && stop === "77" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      return true
    }
    //==========================================================================
    //== Moving from Row 7 to Row 8 ============================================
    //==========================================================================
    // Square 71 to 82
    else if ( start === "71" && stop === "82" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      if ( pieceColor === "dark" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 71 to 82")
      }
      return true
    }
    // Square 73 to 82
    else if ( start === "73" && stop === "82" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      if ( pieceColor === "dark" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 73 to 82")
      }
      return true
    }
    // Square 73 to 84
    else if ( start === "73" && stop === "84" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      if ( pieceColor === "dark" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 73 to 84")
      }
      return true
    }
    // Square 75 to 84
    else if ( start === "75" && stop === "84" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      if ( pieceColor === "dark" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 75 to 84")
      }
      return true
    }
    // Square 75 to 86
    else if ( start === "75" && stop === "86" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      if ( pieceColor === "dark" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 75 to 86")
      }
      return true
    }
    // Square 77 to 86
    else if ( start === "77" && stop === "86" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      if ( pieceColor === "dark" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 77 to 86")
      }
      return true
    }
    // Square 77 to 88
    else if ( start === "77" && stop === "88" && ( pieceColor === "dark" || pieceType === "King" ) ) {
      if ( pieceColor === "dark" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 77 to 88")
      }
      return true
    }
    //==========================================================================
    //==========================================================================
    //==========================================================================










    //==========================================================================
    //== Moving from Row 8 to Row 7 ============================================
    //==========================================================================
    // If the piece starts at square 82 then it has to either be a lite peice or
    // be a dark piece that has been Kinged
    // Square 82 to 71
    else if ( start === "82" && stop === "71" ) {
      return true
    }
    // Square 82 to 73
    else if ( start === "82" && stop === "73" ) {
      return true
    }
    // Square 84 to 73
    else if ( start === "84" && stop === "73" ) {
      return true
    }
    // Square 84 to 75
    else if ( start === "84" && stop === "75" ) {
      return true
    }
    // Square 86 to 75
    else if ( start === "86" && stop === "75" ) {
      return true
    }
    // Square 86 to 77
    else if ( start === "86" && stop === "77" ) {
      return true
    }
    // Square 88 to 77
    else if ( start === "88" && stop === "77" ) {
      return true
    }
    //==========================================================================
    //== Moving from Row 7 to Row 6 ============================================
    //==========================================================================
    // Square 71 to 62
    else if ( start === "71" && stop === "62" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 73 to 62
    else if ( start === "73" && stop === "62" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 73 to 64
    else if ( start === "73" && stop === "64" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 75 to 64
    else if ( start === "75" && stop === "64" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 75 to 66
    else if ( start === "75" && stop === "66" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 77 to 66
    else if ( start === "77" && stop === "66" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 77 to 68
    else if ( start === "77" && stop === "68" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    //==========================================================================
    //== Moving from Row 6 to Row 5 ============================================
    //==========================================================================
    // Square 62 to 51
    else if ( start === "62" && stop === "51" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 62 to 53
    else if ( start === "62" && stop === "53" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 64 to 53
    else if ( start === "64" && stop === "53" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 64 to 55
    else if ( start === "64" && stop === "55" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 66 to 55
    else if ( start === "66" && stop === "55" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 66 to 57
    else if ( start === "66" && stop === "57" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 68 to 57
    else if ( start === "68" && stop === "57" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    //==========================================================================
    //== Moving from Row 5 to Row 4 ============================================
    //==========================================================================
    // Square 51 to 42
    else if ( start === "51" && stop === "42" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 53 to 42
    else if ( start === "53" && stop === "42" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 53 to 44
    else if ( start === "53" && stop === "44" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 55 to 44
    else if ( start === "55" && stop === "44" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 55 to 46
    else if ( start === "55" && stop === "46" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 57 to 46
    else if ( start === "57" && stop === "46" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 57 to 48
    else if ( start === "57" && stop === "48" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    //==========================================================================
    //== Moving from Row 4 to Row 3 ============================================
    //==========================================================================
    // Square 42 to 31
    else if ( start === "42" && stop === "31" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 42 to 33
    else if ( start === "42" && stop === "33" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 44 to 33
    else if ( start === "44" && stop === "33" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 44 to 35
    else if ( start === "44" && stop === "35" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 46 to 35
    else if ( start === "46" && stop === "35" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 46 to 37
    else if ( start === "46" && stop === "37" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 48 to 37
    else if ( start === "48" && stop === "37" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    //==========================================================================
    //== Moving from Row 3 to Row 2 ============================================
    //==========================================================================
    // Square 31 to 22
    else if ( start === "31" && stop === "22" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 33 to 22
    else if ( start === "33" && stop === "22" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 33 to 24
    else if ( start === "33" && stop === "24" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 35 to 24
    else if ( start === "35" && stop === "24" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 35 to 26
    else if ( start === "35" && stop === "26" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 37 to 26
    else if ( start === "37" && stop === "26" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    // Square 37 to 28
    else if ( start === "37" && stop === "28" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      return true
    }
    //==========================================================================
    //== Moving from Row 2 to Row 1 ============================================
    //==========================================================================
    // Square 22 to 11
    else if ( start === "22" && stop === "11" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      if ( pieceColor === "lite" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 22 to 11")
      }
      return true
    }
    // Square 22 to 13
    else if ( start === "22" && stop === "13" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      if ( pieceColor === "lite" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 22 to 13")
      }
      return true
    }
    // Square 24 to 13
    else if ( start === "24" && stop === "13" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      if ( pieceColor === "lite" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 24 to 11")
      }
      return true
    }
    // Square 24 to 15
    else if ( start === "24" && stop === "15" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      if ( pieceColor === "lite" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 24 to 15")
      }
      return true
    }
    // Square 26 to 15
    else if ( start === "26" && stop === "15" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      if ( pieceColor === "lite" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 26 to 15")
      }
      return true
    }
    // Square 26 to 17
    else if ( start === "26" && stop === "17" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      if ( pieceColor === "lite" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 26 to 17")
      }
      return true
    }
    // Square 28 to 17
    else if ( start === "28" && stop === "17" && ( pieceColor === "lite" || pieceType === "King" ) ) {
      if ( pieceColor === "lite" && pieceType === "regPiece" ) {
        console.log("King the dark piece moving from square 28 to 17")
      }
      return true
    }
    //==========================================================================
    //==========================================================================
    //==========================================================================
    else {
      return false
    }
  },
  // This function updates piece.square only. displayPiece() is called upon
  // return.
  movePiece: function( stop, piece ) {

    var index = ""

    if ( piece[0].color === "dark" ) {
      index = this.darkPieces.findIndex( e => e.square === piece[0].square )
      this.darkPieces[index].square = stop
    }
    else if ( piece[0].color === "lite" ) {
      index = this.litePieces.findIndex( e => e.square === piece[0].square )
      this.litePieces[index].square = stop
    }

  },
  //
  erasePiece: function( start ) {

    document.getElementById( start ).innerText = ""

  },
  //
  getJumpPiece: function( start, stop, piece ) {
  //============================================================================
  // If you are here then a single move has been checked and the attempted    ==
  // move was not a legal single move.                                        ==
  //                                                                          ==
  // Here we check to see if there is an opposite color piece in between the  ==
  // start and stop positions                                                 ==
  //============================================================================


    //==========================================================================
    //== Jumping up from Row 1 to Row 3 ========================================
    //==========================================================================
    if ( start === "11" && stop === "33" ) {
      if ( document.getElementById("22").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "22" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "22" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "13" && stop === "31" ) {
      if ( document.getElementById("22").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "22" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "22" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "13" && stop === "35" ) {
      if ( document.getElementById("24").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "24" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "24" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "15" && stop === "33" ) {
      if ( document.getElementById("24").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "24" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "24" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "15" && stop === "37" ) {
      if ( document.getElementById("26").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "26" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "26" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "17" && stop === "35" ) {
      if ( document.getElementById("26").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "26" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "26" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    //==========================================================================
    //== Jumping up from Row 2 to Row 4 ========================================
    //==========================================================================
    else if ( start === "22" && stop === "44" ) {
      if ( document.getElementById("33").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "33" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "33" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "24" && stop === "42" ) {
      if ( document.getElementById("33").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "33" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "33" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "24" && stop === "46" ) {
      if ( document.getElementById("35").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "35" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "35" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "26" && stop === "44" ) {
      if ( document.getElementById("35").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "35" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "35" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "26" && stop === "48" ) {
      if ( document.getElementById("37").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "37" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "37" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    //==========================================================================
    //== Jumping up from Row 3 to Row 5 ========================================
    //==========================================================================
    else if ( start === "31" && stop === "53" ) {
      if ( document.getElementById("42").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "42" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "42" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "33" && stop === "51"  ) {
      if ( document.getElementById("42").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "42" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "42" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "33" && stop === "55"  ) {
      if ( document.getElementById("44").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "44" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "44" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "35" && stop === "53"  ) {
      if ( document.getElementById("44").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "44" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "44" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "35" && stop === "57"  ) {
      if ( document.getElementById("46").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "46" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "46" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "37" && stop === "55"  ) {
      if ( document.getElementById("46").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "46" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "46" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    //==========================================================================
    //== Jumping up from Row 4 to Row 6 ========================================
    //==========================================================================
    else if ( start === "42" && stop === "64"  ) {
      if ( document.getElementById("53").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "53" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "53" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "44" && stop === "62"  ) {
      if ( document.getElementById("53").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "53" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "53" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "44" && stop === "66"  ) {
      if ( document.getElementById("55").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "55" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "55" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "46" && stop === "64"  ) {
      if ( document.getElementById("55").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "55" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "55" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "46" && stop === "68"  ) {
      if ( document.getElementById("57").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "57" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "57" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    //==========================================================================
    //== Jumping up from Row 5 to Row 7 ========================================
    //==========================================================================
    else if ( start === "51" && stop === "73"  ) {
      if ( document.getElementById("62").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "62" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "62" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "53" && stop === "71"  ) {
      if ( document.getElementById("62").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "62" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "62" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "53" && stop === "75"  ) {
      if ( document.getElementById("64").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "64" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "64" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "55" && stop === "73"  ) {
      if ( document.getElementById("64").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "64" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "64" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "55" && stop === "77"  ) {
      if ( document.getElementById("66").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "66" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "66" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "57" && stop === "75"  ) {
      if ( document.getElementById("66").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "66" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "66" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    //==========================================================================
    //== Jumping up from Row 6 to Row 8 ========================================
    //==========================================================================
    else if ( start === "62" && stop === "84"  ) {
      if ( document.getElementById("73").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "73" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "73" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "64" && stop === "82"  ) {
      if ( document.getElementById("73").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "73" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "73" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "64" && stop === "86"  ) {
      if ( document.getElementById("75").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "75" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "75" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "66" && stop === "84"  ) {
      if ( document.getElementById("75").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "75" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "75" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    else if ( start === "66" && stop === "88"  ) {
      if ( document.getElementById("77").innerText === "o" ) {
        if ( piece[0].color === "dark" ) {
          jumpPiece = this.litePieces.filter( e => e.square === "77" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
        else if ( piece[0].color === "lite" ) {
          jumpPiece = this.darkPieces.filter( e => e.square === "77" )
          if ( jumpPiece.length === 0 ) {
            return false
          }
          else { return jumpPiece }
        }
      }
      else { return false }
    }
    //==========================================================================
    //==========================================================================
    //==========================================================================















    //==========================================================================
    //== Jumping down from Row 8 to Row 6 ======================================
    //==========================================================================







    //==========================================================================
    //==========================================================================
    //==========================================================================

  },
  // This deletes a piece after it has been jummped
  deletePiece: function( jumpPiece ) {

    if ( jumpPiece[0].color === "dark" ) {
      var index = this.darkPieces.findIndex( e => e.square === jumpPiece[0].square )
      this.darkPieces.splice( index, 1 )
    }
    else {
      var index = this.litePieces.findIndex( e => e.square === jumpPiece[0].square )
      this.litePieces.splice( index, 1 )
    }
  }
}

game.initPieces()