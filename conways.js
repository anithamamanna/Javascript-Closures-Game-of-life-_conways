var conways_gameoflife = (function (){
var canvas = document.getElementById("conways_canvas").getContext("2d");

canvas.strokeStyle = '#003366';
canvas.fillStyle = '#7e90ad';

var timer;

const ROWS = 6;
const COLUMNS = 8;
const initCells = ["OOO.....", "OOOOOOO...", "OOOOOO..OO","O..OOOOOOOO",".OOO.OO.O", "O.O...O",".....OO", "OO...O"]

var cells = [];
var k = 0;
return function() {
create_cells();
function create_cells() {
    timer = null;
    var descriptor = 'The live cells with Big \"O" and others with \"." row-wise on each line(i.e. 8 columns on 6 rows).';
    var ln ='';
    for (var i=0; i<ROWS; i++) {
        ln = initCells[i];
        cells[i] = [];
        for (var j=0; j<COLUMNS; j++) {
           cells[i][j] = ln.charAt(j)==='O'?1:0;
        }
    }
    display_cells(descriptor);
}

function update_cells(){

	var updatedCells = [];
  function countAliveNeighbor(x, y) {
        var count = 0;     
        
         function isAlive(x, y) {
            return cells[x] && cells[x][y];
        }
            
        if (isAlive(x-1, y-1)) count++;
        if (isAlive(x-1, y)) count++;
        if (isAlive(x-1, y+1)) count++;
        if (isAlive(x, y-1)) count++;
        if (isAlive(x, y+1)) count++;
        if (isAlive(x+1, y-1)) count++;
        if (isAlive(x+1, y)) count++;
        if (isAlive(x+1, y+1)) count++;
        
        return count;
    }
    
    cells.forEach(function(row, x) {
        updatedCells[x] = [];
        row.forEach(function(cell, y) {
            var count = countAliveNeighbor(x, y);
            var alive = count === 3 ? 1 : count === 2 ? 1 && cell : 0;
            updatedCells[x][y] = alive;
        });
    });
    
    cells = updatedCells;
    display_cells("-----------Stage"+(++k)+"-----------------");
}


function display_cells(separator) {
		console.log(separator);
    var ln;
    canvas.clearRect(0, 0, 350, 250);
    cells.forEach(function(row, x) {
      ln = '';
      row.forEach(function(cell, y) {
        ln += cell?'O':'.';    
        canvas.beginPath();
        canvas.rect(y*30, x*30, 30, 30);
      	cell?canvas.fill():canvas.stroke();     
      });
      console.log(ln);
     });
  
    timer = setTimeout(function(){update_cells();},1500);
}
}
})();