const hamburger = document.querySelector('#hamburger');
const cross = document.querySelector('#cross');
const menu = document.querySelector('menu');
const form = document.querySelector('#form');
const inputUrl = document.querySelector('#input-url');
const errorMessage = document.querySelector('.error-message');
const linkCards = document.querySelector('.link-cards');
const resultSet = []
//       {
//             "code": "qEAPeE",
//             "short_link": "shrtco.de\/qEAPeE",
//             "full_short_link": "https:\/\/shrtco.de\/qEAPeE",
//             "short_link2": "9qr.de\/qEAPeE",
//             "full_short_link2": "https:\/\/9qr.de\/qEAPeE",
//             "short_link3": "shiny.link\/qEAPeE",
//             "full_short_link3": "https:\/\/shiny.link\/qEAPeE",
//             "share_link": "shrtco.de\/share\/qEAPeE",
//             "full_share_link": "https:\/\/shrtco.de\/share\/qEAPeE",
//             "original_link": "http:\/\/example.org\/very\/long\/link.html"
//       },
//       {
//             "code": "qEAPeE",
//             "short_link": "shrtco.de\/qEAPeE",
//             "full_short_link": "https:\/\/shrtco.de\/qEAPeE",
//             "short_link2": "9qr.de\/qEAPeE",
//             "full_short_link2": "https:\/\/9qr.de\/qEAPeE",
//             "short_link3": "shiny.link\/qEAPeE",
//             "full_short_link3": "https:\/\/shiny.link\/qEAPeE",
//             "share_link": "shrtco.de\/share\/qEAPeE",
//             "full_share_link": "https:\/\/shrtco.de\/share\/qEAPeE",
//             "original_link": "http:\/\/example.org\/very\/long\/link.html"
//       }
// ]

{/* <div class="link-card">
            <div class="original-link">https://www.frontendmentor.io</div>
            <hr />
            <div class="short-link">https://rel.ink/k4lKyk</div>
            <button class="copy-link-button">Copy</button>
          </div> */}

const addCardToPage = (linkObj) => {
      const linkCard = document.createElement('div');
      const originalLink = document.createElement('div');
      const hr = document.createElement('hr');
      const shortLink = document.createElement('div');
      const copyButton = document.createElement('button');

      linkCard.classList.add('link-card');
      originalLink.classList.add('original-link');
      shortLink.classList.add('short-link');
      copyButton.classList.add('copy-link-button');

      originalLink.textContent = linkObj.original_link;
      shortLink.textContent = linkObj.short_link;
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
      if (inputUrl.value) {
            if (inputUrl.classList.contains('error')) {
                  inputUrl.classList.remove('error')
            }
            if (!errorMessage.classList.contains('hide')) {
                  errorMessage.classList.add('hide')
            }
            fetch("https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html", requestOptions)
                  .then(response => response.text())
                  .then(result => {
                        console.log(result)
                        resultSet.push(result);
                        console.log(resultSet)
                        resultSet.forEach(result => addCardToPage(result));
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