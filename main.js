/* global $ */


// constructor for gamepiece
function Gamepiece(keyid, border, ears, shape, animal, url, borderradius) {
  this.keyid = keyid;
  this.border = border;
  this.ears = ears;
  this.shape = shape;
  this.animal = animal;
  this.url = url;
  this.borderradius = borderradius
}

// tokens
var gp1 = new Gamepiece('gp1', 'yes', 'yes', 'square', 'panda', 'img/panda-sq-outline.png', '5px');
var gp2 = new Gamepiece('gp2', 'no', 'yes', 'square', 'panda', 'img/panda_sq.png', '5px');
var gp3 = new Gamepiece('gp3', 'yes', 'no', 'square', 'panda', 'img/panda_sq_formless_outline.png', '5px');
var gp4 = new Gamepiece('gp4', 'no', 'no', 'square', 'panda', 'img/panda_sq_formless.png', '5px');
var gp5 = new Gamepiece('gp5', 'yes', 'yes', 'round', 'panda', 'img/panda_rd_outline.png', '35%');
var gp6 = new Gamepiece('gp6', 'no', 'yes', 'round', 'panda', 'img/panda_rd.png', '35%');
var gp7 = new Gamepiece('gp7', 'yes', 'no', 'round', 'panda', 'img/panda_rd_formless_outline.png', '35%');
var gp8 = new Gamepiece('gp8', 'no', 'no', 'round', 'panda', 'img/panda_rd_formless.png', '35%');
var gp9 = new Gamepiece('gp9', 'yes', 'yes', 'square', 'rabbit', 'img/rabbit_sq_outline.png', '5px');
var gp10 = new Gamepiece('gp10', 'no', 'yes', 'square', 'rabbit', 'img/rabbit_sq.png', '5px');
var gp11 = new Gamepiece('gp11', 'yes', 'no', 'square', 'rabbit', 'img/rabbit_sq_formless_outline.png', '5px');
var gp12 = new Gamepiece('gp12', 'no', 'no', 'square', 'rabbit', 'img/rabbit_sq_formless.png', '5px');
var gp13 = new Gamepiece('gp13', 'yes', 'yes', 'round', 'rabbit', 'img/rabbit_rd_outline.png', '35%');
var gp14 = new Gamepiece('gp14', 'no', 'yes', 'round', 'rabbit', 'img/rabbit_rd.png', '35%');
var gp15 = new Gamepiece('gp15', 'yes', 'no', 'round', 'rabbit', 'img/rabbit_rd_formless_outline.png', '35%');
var gp16 = new Gamepiece('gp16', 'no', 'no', 'round', 'rabbit', 'img/rabbit_rd_formless.png', '35%');


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
  $('#instructions').prepend('<div class="instructions"> <h5><strong>To begin:</strong> Player 2, please select token for Player 1</h5></div>');
  for (var i = 0; i < arrayOfGamePieces.length; i++) {
      $('#game-pieces').append("<div class='game-piece col-sm-4' id='" + arrayOfGamePieces[i].keyid + "' style='margin-bottom: 10px'></div>")
      $("#" + arrayOfGamePieces[i].keyid).prepend("<img src ='" + arrayOfGamePieces[i].url + "' id='" + arrayOfGamePieces[i].keyid + "' style='width: 50px; box-shadow: 5px 5px 3px grey; border-radius:" + arrayOfGamePieces[i].borderradius + "; z-index: 50'>")
  }
}



function loadGameBoard() {
  for (var x = 0; x <gameBoard.length; x++) {
    $("#game-board").append("<div class='cell d-inline-block' id='" + gameBoard[x] + "'></div>");
    $("#" + gameBoard[x]).css({'width': '80px', 'position': 'relative', 'height': '80px', 'border': '2px solid grey', 'border-radius': '50%', 'box-sizing': 'border-box'})
  }
  $('#start-over').css('visibility', 'visible');
}



function playTurn () {
  if (isGameOver === true) { return false; }

  else if (activePlayer === 1) {
    $(".instructions").replaceWith("<h4>Player 2, please select token for Player 1.</h4>")
  }
  else if (activePlayer === 2) {
    $(".instructions").replaceWith("<h4>Player 1, please select token for Player 2.</h4>")
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
      $('#game-over').prepend('<h3>Game Over!Winner is Player ' + activePlayer + '</h3>');
      $('#game-over').css({"visibility":'visible'})
    }
    if (gameBoard.every(isObject) === true) {
      winner = 3;
      console.log('Draw');
      //console.log(gameBoard.every(isObject));
      //$('#game-over').prepend("<h3>Game Over!It's a draw!</h3>");
      //$('#game-over').css("visibility", 'visible')
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

// $('#show-instructions').click(function (){
//   $('#game-info').toggle();
//   })


$('.game-piece').click(function () {
  selectedPiece = $(this).attr('id')
  var selected = $('#' + selectedPiece).contents();
  if ($('.selected-piece').children().length !== 0) {
    $('#overlay-msg').prepend('<p class="alert alert-danger alert-dismissable" role="alert">Illegal Move: Please place selected token.<br/><button class="btn btn-danger" id="dismissed" data-dismiss="alert">Ok</button></p>');
    $('#overlay-msg').css({"visibility":"visible", 'z-index': '100', 'margin-top': '100px', 'position':'absolute'})
  } else {
  selected.detach();
  $('.selected-piece').append(selected)
  $('.selected-piece').css({'width': '50px', 'margin-left': '20px'})
  $(".instructions h2").detach();
}
})

$('.cell').click(function(){

  // checks if user has selected a token
  selectedCell = $(this).attr('id');
  if ($('.selected-piece').children().length === 0) {
    //alert illegal move
    $('#overlay-msg').prepend('<p class="alert alert-danger alert-dismissable" role="alert">Illegal Move: Please select a token first.<br/><button class="btn btn-danger" id="dismissed" data-dismiss="alert">Ok</button></p>');
    $('#overlay-msg').css({"visibility":"visible", 'z-index': '100', 'margin-top': '100px', 'position':'absolute'});
    return;
  }

  // checks if cell user clicks on is empty
  var placed = $('.selected-piece').contents()
  if ($("#"+selectedCell).children().length > 0) {
    //alert illegal move
    $('#overlay-msg').prepend('<p class="alert alert-danger alert-dismissable" role="alert">Illegal Move: Please select an empty cell.<br/><button class="btn btn-danger" id="dismissed" data-dismiss="alert">Ok</button></p>');
    $('#overlay-msg').css({"visibility":"visible", 'z-index': '100', 'margin-top': '100px', 'position':'absolute'})
     }
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
    console.log('button clicked');
    $("#overlay-msg p").alert('close')

  })

  $('#start-over').click(function () {
    $('#instructions').empty()
    $('#game-pieces').empty()
    $('.selected-display').empty()
    $('.cell').empty()
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
    $('#instructions').empty()
    $('#game-pieces').empty()
    $('.selected-display').empty()
    $('.cell').empty()
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
