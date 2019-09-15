# checkers
Build my own checkers game
The initial build will be text based as far as the checker pieces are
concerned. This is quirky when selecting and moving pieces, but it reduces
initial complications of using something else to represent the game pieces.

# Version 1
- Generate blank files
- Done

# Version 2
- Generate blank 8 x 8 board
- Done

# Version 3
- Add classes to the dark and light squares and color them with default colors
- Done

# Version 4
- Match <hr> colors to light and dark colored squares
- Done

# Version 5
- Add event listener to table with mousedown and mouseup cells
- Remember that these returns strings
- Use Number() to conver to numbers if needed
- Done

# Version 6
- Setup game piece arrays and gave each a starting position

# Version 7
- Display each piece based on its position
- Color each side
- Currently the pieces are letters and not pictures
- Done

# Version 8
- Pieces move and colors remain the same after a move
- Done

# Version 9
- Limit movement by piece color and location
- Limit trying to move a blank spot
- Limit trying to move to a lite spot
- Done

# Version 10
- Limit moving to an occupied spot
- A dark piece on squares 31 and 33 check for a good jump
- Done

# Version 11
- A dark piece on square 35 check for a good jump
- Done

# Version 12
- A dark piece on square 37 check for a good jump
- Done

# Version 13
- Changed the var that checks for a jumped square so they have a single name
-     e.g., square31 to jumpSquare, etc.
- Current list of dark squares good for a single or jump move:
- 31  33  35  37
- Work on removing a lite piece if good jump from a dark piece
- Done

# Version 14
- Current list of dark squares good for a single or jump move:
- 31  33  35  37
- Current list of dark squares good to remove a jumped piece
- 35  37
- Did some work on pairing legal moves together:
-  Dark pieces moving up and lite Kings moving up
-  Same for the other direction
- Did some work on Kinging a lite piece moving to square 11 or 13 from square 22
- Done with lots of work now being needed to clean all this up

# Version 15
- Add the i counter to the mix so pieces must be moved in order
- Done

# Version 16
- Landing on an illegal spot causes i to be updated when it should'nt be
- Moving two spaces when it is not a legal jump does the same thing
- Fixed

# Version 17
- RESET
- The level of complication was starting to get hard to control, so I am
- resetting after doing an algorithm diagram
- It might result in more lines of code, but the flow will be simpler to
- understand, modify and support
- Remove everything from .js file except initial board and piece setup
- Done

# Version 18
- Add back in checkPiece() function
- Create isDarkLandingSquare() function, it is a method
- Create isNotOccupiedSquare() function, it is a method
- Done

# Version 19
- Create isLegalSingleMove() function, it is a method
- Did all 8 rows moving from row 1 to row 8
- Did not add in the King() function yet
- Done

# Version 20
- Add in the logic that will call the King() function for dark pieces moving
- from row 7 to row 8
- Done

# Version 21
- Create isLegalSingleMove() function that moves from row 8 to row 1
- Done

# Version 22
- Add in the King() function for lite pieces moving from row 2 to row 1
- Done

# Version 23
- Add in movePiece() function
- Added in game.i++
- Done

# Version 24
- Add in erasePiece() function
- Well, that was easy
- Done

# Version 25
- Add in deletePiece() function
- Have only added in the dark piece jump from square 31 to 53, but it works and
- properly deletes the jumped piece from this.litePieces array
- Done

# Version 26
- Create jumpPiece = getJumpPiece() function
-     This will return either jumpPiece[0].square, .color, .type or false
-     Boolean( jumpPiece[0] ) evaluates as true
- Done



# Version x
- Bottom-left square is dark with each row alternatiing patterns
- Give color picker so user can choose dark and light square coloring
- Give color picker so user can cnoose colors for checkers

# Version x
- Populate board with 12 checkers per side