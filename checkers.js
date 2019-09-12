// Odd i = dark piece move while even i = light piece move
var i = 1

var mouseDown = document.getElementById("myTable")
var mouseUp = document.getElementById("myTable")

var start = mouseDown.addEventListener("mousedown", function(e) {
  console.log(e.target.id)
})

var stop = mouseUp.addEventListener("mouseup", function(e) {
  console.log(e.target.id)
})