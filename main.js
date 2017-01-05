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
var isGameOver = false;
var winner = 0;
var row = [];
var column = [];
var diagonal = [];

function loadGamePieces () {
  for (var i = 0; i < arrayOfGamePieces.length; i++) {
    $('.game-pieces').append("<div class='game-piece' id='" + arrayOfGamePieces[i].keyid + "'></div>")
    $("#" + arrayOfGamePieces[i].keyid).css({'width': '60px'})
    $("#" + arrayOfGamePieces[i].keyid).prepend("<img src='" + arrayOfGamePieces[i].url + "' id='" + arrayOfGamePieces[i].keyid + "' style='width: 100%;'>")
  }
}

loadGamePieces();

function loadGameBoard() {
  for (var x = 0; x <gameBoard.length; x++) {
    $(".game-board").append("<div class='cell' id='" + gameBoard[x] + "'></div>");
    $("#" + gameBoard[x]).css({'width': '100px', 'height': '100px', 'border': '2px solid grey', 'border-radius': '50%', 'box-sizing': 'border-box', 'display': 'flex', 'justify-content': 'center'})
    var getWidth = $('.cell').width()
  }
}

loadGameBoard()

function playTurn () {
  if (isGameOver === true) { alert("Game Over")}
  else if (activePlayer === 1) {
    $(".instructions").append("<h3>Player 2, please select token for Player 1.</h3>")
  }
  else if (activePlayer === 2) {
    $(".instructions").append("<h3>Player 1, please select token for Player 2.</h3>")
  }
}


function compareCells ([c1, c2, c3, c4], y) {
  if ((typeof c1 === "object") && (typeof c2 === "object") && (typeof c3 === "object") && (typeof c4 === "object")) {
    if ((typeof c1 === 'object') && (c1[y] === c2[y]) && (c2[y] === c3[y]) && (c3[y] === c4[y])) {
      winner = activePlayer;
      isGameOver = true;
      console.log('Match:' + c1[y] + '. Winner is ' + activePlayer);
      $('.game-over').append('<h1>Game Over!</h1><p>Match:' + c1[y] + '. Winner is ' + activePlayer);
      $('.game-over').css("visibility", 'visible')
    } else {
      winner = 0;
      isGameOver = false;
      // console.log("they are not the same.");
    }
  }
}




function mapCells() {
  selectedCell = parseInt(selectedCell)
  if (selectedCell <= 3) {
    row = [gameBoard[0], gameBoard[1], gameBoard[2], gameBoard[3]]
    column = [gameBoard[selectedCell], gameBoard[(selectedCell + 4)], gameBoard[(selectedCell + 8)], gameBoard[(selectedCell + 12)]]
    if (selectedCell === 0) { diagonal = [gameBoard[0], gameBoard[5], gameBoard[10], gameBoard[15]]; }
    if (selectedCell === 3) { diagonal = [gameBoard[3], gameBoard[6], gameBoard[9], gameBoard[12]]}
  }
  else if (selectedCell <= 7) {
    row = [gameBoard[4], gameBoard[5], gameBoard[6], gameBoard[7]];
    column = [gameBoard[(selectedCell - 4)], gameBoard[selectedCell], gameBoard[(selectedCell + 4)], gameBoard[(selectedCell + 8)]]
    if (selectedCell === 5) {diagonal = [gameBoard[0], gameBoard[5], gameBoard[10], gameBoard[15]];}
    if (selectedCell === 6) {diagonal = [gameBoard[3], gameBoard[6], gameBoard[9], gameBoard[12]]}
  }
  else if (selectedCell <= 11) {
    row = [gameBoard[8], gameBoard[9], gameBoard[10], gameBoard[11]];
    column = [gameBoard[(selectedCell - 8)], gameBoard[(selectedCell - 4)], gameBoard[selectedCell], gameBoard[(selectedCell + 4)] ];
    if (selectedCell === 10) {  diagonal = [gameBoard[0], gameBoard[5], gameBoard[10], gameBoard[15]];}
    if (selectedCell === 9) {  diagonal = [gameBoard[3], gameBoard[6], gameBoard[9], gameBoard[12]] }
  }
  else if (selectedCell <= 15) {
    row = [gameBoard[12], gameBoard[13], gameBoard[14], gameBoard[15]];
    column = [gameBoard[(selectedCell - 12)], gameBoard[(selectedCell - 8)], gameBoard[(selectedCell - 4)], gameBoard[selectedCell]];
    if (selectedCell === 15) { diagonal = [gameBoard[0], gameBoard[5], gameBoard[10], gameBoard[15]]; }
    if (selectedCell === 12) {diagonal = [gameBoard[3], gameBoard[6], gameBoard[9], gameBoard[12]]}
  }
}



$('.game-piece').click(function(){
  selectedPiece = $(this).attr('id')
  var selected = $('#' + selectedPiece).contents();
  console.log(selectedPiece);
  console.log(selected);
  selected.detach();
  $('.selected-piece').append(selected)
  $('.selected-piece').css({'width': '50px', 'margin-left': '20px'})
  $(".instructions h3").detach();
})

$('.cell').click(function(){
  selectedCell = $(this).attr('id');

  if ($('.selected-piece').children().length === 0) {
    $('.overlay-msg p').html("Please select a token first.");
    $('.overlay-msg').css("visibility", "visible");
    return;
  }

  var placed = $('.selected-piece').contents()
  if ($("#"+selectedCell).children().length > 0) {
    $('.overlay-msg').css("visibility", "visible")
    $('.overlay-msg p').html("Please select an empty cell.") }
    else {
      placed.detach();
      $('#' + selectedCell).append(placed);
    }

    gameBoard[selectedCell] = window[selectedPiece];
    mapCells();
    compareCells(row, 'animal');
    compareCells(column,'animal');
    compareCells(diagonal, 'animal');
    compareCells(row, 'shape');
    compareCells(column,'shape');
    compareCells(diagonal, 'shape');
    compareCells(row, 'border');
    compareCells(column,'border')
    compareCells(diagonal, 'border')
    compareCells(row, 'ears');
    compareCells(column,'ears')
    compareCells(diagonal, 'ears')


    if(activePlayer === 1) { activePlayer = 2 } else { activePlayer = 1}
    console.log('active player ' + activePlayer);

    playTurn();
  })

  $("#dismissed").click(function(){
    $(".overlay-msg").css('visibility', 'hidden')
  })

  $('#restart').click(function () {
    gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    selectedPiece = '';
    selectedCell = 0;
    activePlayer = 1;
    isGameOver = false;
    winner = 0;
    row = [];
    column = [];
    diagonal = [];
    loadGamePieces ()
    loadGameBoard ()
  })
