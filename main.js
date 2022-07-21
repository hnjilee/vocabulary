'use strict';

loadWords() //
  .then(words => {
    const wordListItems = displayWords(words);
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
    <input type="checkbox" class="word__checkbox" />
    <div class="word__content">
      <span>${word.eng}</span>
      <span>${word.kor}</span>
    </div>
    `;
  return listItem;
}
