const maxNumber = 100;
let cardNumbers = [];
let selected = [];
let matched = [];
let incorrectGuesses = 0;

const gameSizes = {
  small: [5, 2],
  medium: [6, 3],
  large: [7, 4],
  huge: [8, 5],
};

const getRandomNumber = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber);
};

const renderCards = (size, maxNumber) => {
  let id = 0;
  let randomNumbers = [];

  $("#cards").empty();
  for (let row = 0; row < size[1]; row++) {
    for (let column = 0; column < size[0]; column++) {
      $("#cards").append(`<button class='card' id=_${id}></button>`);
      id++;
    }
    $("#cards").append("<br>");
  }

  for (let i = 0; i < (size[0] * size[1]) / 2; i++) {
    let number = getRandomNumber(maxNumber);
    while (randomNumbers.includes(number)) {
      number = getRandomNumber(maxNumber);
    }
    randomNumbers.push(number);
  }

  randomNumbers = [...randomNumbers, ...randomNumbers];
  cardNumbers = [];

  while (randomNumbers.length > 0) {
    const index = getRandomNumber(randomNumbers.length);
    cardNumbers.push(randomNumbers[index]);
    randomNumbers.splice(index, 1);
  }
};

$(document).ready(function () {
  $("#form-select").submit(function (event) {
    event.preventDefault();
    cardNumbers = [];
    selected = [];
    matched = [];
    incorrectGuesses = 0;
    const input = $("input[name='game-size']:checked").val();
    renderCards(gameSizes[input], maxNumber);
    $("#incorrect-guesses").remove();
    $("#container").append(
      "<p id='incorrect-guesses'>Incorrect Guesses: 0</p>"
    );
  });
  $(document).on("click", ".card", function () {
    const cardIdAttr = $(this).attr("id");
    const cardId = Number(cardIdAttr.match(/[0-9]+/g));
    if (!selected.includes(cardId) && !matched.includes(cardId)) {
      if (selected.length < 2) {
        $(this).append(cardNumbers[cardId]);
        selected.push(cardId);
      }
      if (selected.length == 2) {
        setTimeout(() => {
          const id1 = selected[0];
          const id2 = selected[1];
          if (cardNumbers[id1] !== cardNumbers[id2]) {
            $(`#_${id1}`).empty();
            $(`#_${id2}`).empty();
            incorrectGuesses++;
            $("#incorrect-guesses")
              .empty()
              .append(`Incorrect Guesses: ${incorrectGuesses}`);
          } else {
            $(`#_${id1}`).css({ "background-color": "#8ad879" });
            $(`#_${id2}`).css({ "background-color": "#8ad879" });
            matched.push(id1);
            matched.push(id2);
          }
          selected = [];
        }, 600);
      }
    }
  });
});
