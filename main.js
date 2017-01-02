function Gamepiece(keyid, border, ears, shape, animal, url) {
  this.keyid = keyid;
  this.border = border;
  this.ears = ears;
  this.shape = shape;
  this.animal = animal;
  this.url = url;
}

var gp1 = new Gamepiece('gp1', 'yes', 'yes', 'square', 'panda', 'img/panda-sq-outline.png');
var gp2 = new Gamepiece('gp2', 'no', 'yes', 'square', 'panda', 'img/panda_sq.png');
var gp3 = new Gamepiece('gp3', 'yes', 'no', 'square', 'panda', 'img/panda_sq_formless_outline.png');
var gp4 = new Gamepiece('gp4', 'no', 'no', 'square', 'panda', 'img/panda_sq_formless.png');
var gp5 = new Gamepiece('gp5', 'yes', 'yes', 'round', 'panda', 'img/panda_rd_outline.png');
var gp6 = new Gamepiece('gp6', 'no', 'yes', 'round', 'panda', 'img/panda_rd.png');
var gp7 = new Gamepiece('gp7', 'yes', 'no', 'round', 'panda', 'img/panda_rd_formless_outline.png');
var gp8 = new Gamepiece('gp8', 'no', 'no', 'round', 'panda', 'img/panda_rd_formless.png');
var gp9 = new Gamepiece('gp9', 'yes', 'yes', 'square', 'rabbit', 'img/rabbit_sq_outline.png');
var gp10 = new Gamepiece('gp10', 'no', 'yes', 'square', 'rabbit', 'img/rabbit_sq.png');
var gp11 = new Gamepiece('gp11', 'yes', 'no', 'square', 'rabbit', 'img/rabbit_sq_formless_outline.png');
var gp12 = new Gamepiece('gp12', 'no', 'no', 'square', 'rabbit', 'img/rabbit_sq_formless.png');
var gp13 = new Gamepiece('gp13', 'yes', 'yes', 'round', 'rabbit', 'img/rabbit_rd_outline.png');
var gp14 = new Gamepiece('gp14', 'no', 'yes', 'round', 'rabbit', 'img/rabbit_rd.png');
var gp15 = new Gamepiece('gp15', 'yes', 'no', 'round', 'rabbit', 'img/rabbit_rd_formless_outline.png');
var gp16 = new Gamepiece('gp16', 'no', 'no', 'round', 'rabbit', 'img/rabbit_rd_formless.png');

var arrayOfGamePieces = [gp1, gp2, gp3, gp4, gp5, gp6, gp7, gp8, gp9, gp10, gp11, gp12, gp13, gp14, gp15, gp16];

var gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

var selectedPiece = '';
var selectedCell = 0;
var activePlayer = 1;


function loadGamePieces () {
for (var i = 0; i < arrayOfGamePieces.length; i++) {
  $('.game-pieces').append("<div class='game-piece' id='" + arrayOfGamePieces[i].keyid + "'></div>")
  $("#" + arrayOfGamePieces[i].keyid).css({'width': '40px'})
  $("#" + arrayOfGamePieces[i].keyid).prepend("<img src='" + arrayOfGamePieces[i].url + "' id='" + arrayOfGamePieces[i].keyid + "' style='width: 100%;'>")
}
}

loadGamePieces();

function loadGameBoard() {
  for (var x = 0; x <gameBoard.length; x++) {
    $(".game-board").append("<div class='cell' id='" + gameBoard[x] + "'></div>" );
    $("#" + gameBoard[x]).css({'width': '25%', 'padding-top': '25%', 'border': '2px solid grey', 'border-radius': '50%', 'box-sizing': 'border-box'})
  }
}

loadGameBoard()

function playTurn () {
// if activePlayer is 1
// prompt 'Player 2, please select token for Player 1.'
// else promt 'Player 1, please select token for Player 2.'
}


//function winByRows() {}
//if (win by row 1) || (win by row 2) || (win by row 3) \\ (win by row 4) {
// declare winner
// declare gameOver
//}
//else {
// gameOver is false
// winner is false
//}

//function winByColumns () {}


$('.game-piece').click(function(){
  selectedPiece = $('.game-piece').index(this);
  console.log(selectedPiece);
  console.log(arrayOfGamePieces[selectedPiece].url);
  $('.selected-piece').append("<img src='" + arrayOfGamePieces[selectedPiece].url + "' style='width:40px;'>'")
})

$('.cell').click(function(){
  selectedCell = $(this).attr('id');
  console.log(selectedCell);
})
