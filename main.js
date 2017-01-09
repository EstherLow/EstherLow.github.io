/* global $ */

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
  $('.instructions').prepend('<h2>Player 2, please select token for Player 1</h2>');
  $('.selected-display').prepend('<h2>The selected piece is: </h2>');
  for (var i = 0; i < arrayOfGamePieces.length; i++) {
    $('.game-pieces').append("<div class='game-piece' id='" + arrayOfGamePieces[i].keyid + "'></div>")
    $("#" + arrayOfGamePieces[i].keyid).css({'width': '40px'});
    $("#" + arrayOfGamePieces[i].keyid).prepend("<img src ='" + arrayOfGamePieces[i].url + "' id='" + arrayOfGamePieces[i].keyid + "' style='width: 40px;'>");
  }
}



function loadGameBoard() {
  for (var x = 0; x <gameBoard.length; x++) {
    $(".game-board").append("<div class='cell' id='" + gameBoard[x] + "'></div>");
    $("#" + gameBoard[x]).css({'width': '80px', 'height': '80px', 'border': '2px solid grey', 'border-radius': '50%', 'box-sizing': 'border-box', 'display': 'flex', 'justify-content': 'center'})
  }
  $('#start-over').css('visibility', 'visible');
}



function playTurn () {
  if (isGameOver === true) { return false; }

  else if (activePlayer === 1) {
    $(".instructions").append("<h2>Player 2, please select token for Player 1.</h2>")
  }
  else if (activePlayer === 2) {
    $(".instructions").append("<h2>Player 1, please select token for Player 2.</h2>")
  }
}
function isObject (arr) {
  return typeof arr === 'object'
}


function compareCells ([c1, c2, c3, c4]) {
  if ((typeof c1 === "object") && (typeof c2 === "object") && (typeof c3 === "object") && (typeof c4 === "object")) {
    if ((typeof c1 === 'object') &&
        ((c1['border'] === c2['border']) && (c2['border'] === c3['border']) && (c3['border'] === c4['border']) ||
        (c1['animal'] === c2['animal']) && (c2['animal'] === c3['animal']) && (c3['animal'] === c4['animal']) ||
        (c1['ears'] === c2['ears']) && (c2['ears'] === c3['ears']) && (c3['ears'] === c4['ears']) ||
        (c1['shape'] === c2['shape']) && (c2['shape'] === c3['shape']) && (c3['shape'] === c4['shape']))) {
      winner = activePlayer;
      isGameOver = true;
      console.log(isGameOver);
      console.log('Player ' + activePlayer + ' won.');
      $('.game-over').prepend('<h3>Game Over!Winner is Player ' + activePlayer + '</h3>');
      $('.game-over').css("visibility", 'visible')
    }
    if (gameBoard.every(isObject) === true) {
      winner = 3;
      console.log('Draw');
      //console.log(gameBoard.every(isObject));
      //$('.game-over').prepend("<h3>Game Over!It's a draw!</h3>");
      //$('.game-over').css("visibility", 'visible')
    } else {
      console.log('not game over.');
      winner = 0;
      isGameOver = false;
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

loadGameBoard();
loadGamePieces()

$('.start-game').click(function (){
  $('.introduction').css('display', 'none');
  })


$('.game-piece').click(function () {
  selectedPiece = $(this).attr('id')
  var selected = $('#' + selectedPiece).contents();
  console.log(selectedPiece);
  console.log(selected);
  if ($('.selected-piece').children().length !== 0) {
    $('.overlay-msg p').html("Token is already selected.");
    $('.overlay-msg').css("visibility", "visible");
  } else {
  selected.detach();
  $('.selected-piece').append(selected)
  $('.selected-piece').css({'width': '50px', 'margin-left': '20px'})
  $(".instructions h2").detach();
}
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
    compareCells(row);
    compareCells(column);
    if (selectedCell === 0 || 3 || 5 || 6 || 10 || 9 || 12 || 15) { compareCells(diagonal);}

    if(activePlayer === 1) { activePlayer = 2 } else { activePlayer = 1}

    console.log('active player ' + activePlayer);

    playTurn();
  })

  $("#dismissed").click(function(){
    $(".overlay-msg").css('visibility', 'hidden')
  })

  $('#start-over').click(function () {
    $('.cell').remove();
    $('.game-piece').remove();
    $('h2').remove();
    $(".game-over").css('visibility', 'hidden')
    gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    selectedPiece = '';
    selectedCell = 0;
    activePlayer = 1;
    isGameOver = false;
    winner = 0;
    row = [];
    column = [];
    diagonal = [];
    loadGameBoard();
    loadGamePieces();
  })

  $('#play-again').click(function () {
    $('h2').remove();
    $('.cell').remove();
    $('.game-piece').remove();
    $(".game-over").css('visibility', 'hidden')

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
