const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const characters = [
  "beth",
  "jerry",
  "jessica",
  "morty",
  "pessoa-passaro",
  "pickle-rick",
  "rick",
  "summer",
  "meeseeks",
  "scroopy",
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled_card");

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(
      `Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`
    );
  }
};

const checkCard = () => {
  const firstCharacter = firstCard.getAttribute("data_character");
  const secondCharacter = secondCard.getAttribute("data_character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled_card");
    secondCard.firstChild.classList.add("disabled_card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal_card");
      secondCard.classList.remove("reveal_card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal_card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal_card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal_card");
    secondCard = target.parentNode;

    checkCard();
  }
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url(../assets/images/${character}.png)`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data_character", character);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];
  const shuffledArry = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArry.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  startTimer();
  loadGame();
};
