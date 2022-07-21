'use strict';

const checked = [];
let i = 0;
loadWords() //
  .then(words => {
    const wordListItems = displayWords(words);

    // Add a checked word to the 'checked' array
    // Remove a unchecked one from the array
    const wordsList = document.querySelector('.words');
    wordsList.addEventListener('change', e =>
      onCheckboxChange(e, wordListItems)
    );

    // Scroll into checked words one by one on button click
    const scroll = document.querySelector('.header__scroll');
    scroll.addEventListener('click', () => onScrollClick());
  })
  .catch(console.log);

async function loadWords() {
  const response = await fetch('data/words.json');
  if (response.ok) {
    const obj = await response.json();
    return obj.words;
  } else {
    throw new Error(`HTTP Error ${response.status}`);
  }
}

function displayWords(words) {
  const list = document.querySelector('.words');
  const listItems = words.map(createListItem);
  list.append(...listItems);
  return listItems;
}

function createListItem(word) {
  const listItem = document.createElement('li');
  listItem.classList.add('word');
  listItem.setAttribute('data-id', word.id);
  listItem.innerHTML = `
    <input type="checkbox" class="word__checkbox" data-id="${word.id}"/>
    <div class="word__content">
      <span>${word.eng}</span>
      <span>${word.kor}</span>
    </div>
    `;
  return listItem;
}

function onCheckboxChange(e, words) {
  const target = e.target;
  const id = target.dataset.id;
  const targetWord = words.filter(word => word.dataset.id === id)[0];

  if (target.checked) {
    onCheck(targetWord);
  } else {
    onUncheck(targetWord);
  }
}

function onCheck(word) {
  checked.push(word);
  checked.sort((a, b) => a.dataset.id - b.dataset.id);
}

function onUncheck(word) {
  const index = checked.indexOf(word);
  checked.splice(index, 1);
}

function onScrollClick() {
  if (i >= checked.length) {
    i = 0;
  }
  checked[i++].scrollIntoView({ block: 'center', behavior: 'smooth' });
}

// Handle the arrow-up button click
const arrowUp = document.querySelector('.arrow-up');
arrowUp.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// Handle the bubble close button click
const speechBubble = document.querySelector('.header__bubble');
const bubbleClose = document.querySelector('.bubble__close');
bubbleClose.addEventListener('click', () => speechBubble.remove());
