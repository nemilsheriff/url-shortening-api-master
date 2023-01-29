const hamburger = document.querySelector('#hamburger');
const cross = document.querySelector('#cross');
const menu = document.querySelector('menu');
const form = document.querySelector('#form');
const inputUrl = document.querySelector('#input-url');
const errorMessage = document.querySelector('.error-message');
const linkCards = document.querySelector('.link-cards');
const resultSet = [];

const removeExistingCards = () => {
      linkCards.innerHTML = '';
}

document.querySelector('body').addEventListener('click', function (event) {
      console.log(event.srcElement.id)
})

const addCardToPage = (linkObj) => {
      console.log(linkObj)
      const linkCard = document.createElement('div');
      const originalLink = document.createElement('div');
      const hr = document.createElement('hr');
      const shortLink = document.createElement('div');
      const copyButton = document.createElement('button');

      linkCard.classList.add('link-card');
      originalLink.classList.add('original-link');
      shortLink.classList.add('short-link');
      copyButton.classList.add('copy-link-button');
      copyButton.id = linkObj.result.code;

      const maxLength = 35;

      if (linkObj.result.original_link.length < maxLength) {
            originalLink.textContent = linkObj.result.original_link;
      } else {
            originalLink.textContent = linkObj.result.original_link.substr(0, maxLength) + '...';
      }
      shortLink.textContent = linkObj.result.short_link;
      copyButton.textContent = 'Copy';

      linkCard.appendChild(originalLink);
      linkCard.appendChild(hr);
      linkCard.appendChild(shortLink);
      linkCard.appendChild(copyButton);
      linkCards.appendChild(linkCard);
}

const openMenu = () => {
      hamburger.classList.add('hide');
      cross.classList.remove('hide');
      menu.classList.remove('hide');
}

const closeMenu = () => {
      cross.classList.add('hide');
      hamburger.classList.remove('hide');
      menu.classList.add('hide');
}
const requestOptions = {
      method: 'GET',
      redirect: 'follow'
};

const formSubmit = (e) => {
      e.preventDefault()
      const url = inputUrl.value;
      if (url) {
            const apiUrl = `https://api.shrtco.de/v2/shorten?url=${url}`
            if (inputUrl.classList.contains('error')) {
                  inputUrl.classList.remove('error')
            }
            if (!errorMessage.classList.contains('hide')) {
                  errorMessage.classList.add('hide')
            }
            fetch(apiUrl, requestOptions)
                  .then(response => response.json())
                  .then(result => {
                        resultSet.push(result);
                        removeExistingCards();
                        resultSet.forEach(result => addCardToPage(result));
                        form.reset();
                  })
                  .catch(error => console.log('error', error));
      } else {
            inputUrl.classList.add('error')
            errorMessage.classList.remove('hide');
      }
}

hamburger.addEventListener('click', openMenu);
cross.addEventListener('click', closeMenu);
form.addEventListener('submit', formSubmit)
