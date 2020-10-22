const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

displaySpinner = () => {loader.hidden = false; quoteContainer.hidden = true}

removeSpinner = () => {loader.hidden = true; quoteContainer.hidden = false}

buttonDsblAbl = () => {newQuoteBtn.disabled = !newQuoteBtn.disabled}

randomBGColor = () => {
  let colors = [];
  for (let i = 0; i < 3; i++) {
    colors[i] = Math.floor(Math.random() * 256);
  }
  let randColor = "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";
  document.body.style.background = randColor;
  return null;
}

fadeIn = () => {
  quoteContainer.classList.add('fade-in');
  setTimeout(() => {
    quoteContainer.classList.remove('fade-in');
    buttonDsblAbl();
  }, 980);
}

fadeOut = () => {
  buttonDsblAbl();
  quoteContainer.classList.add('fade-out');
  setTimeout(() => {
    randomBGColor(); 
    quoteContainer.classList.remove('fade-out'); 
    getQuotes();
  }, 900);
}

showNewQuote = () => {
  displaySpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  removeSpinner();
}

getQuotes = async () => {
  displaySpinner();
  const proxyUrl = 'https://mysterious-savannah-75912.herokuapp.com/'
  const apiUrl = 'http://type.fit/api/quotes';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    apiQuotes = await response.json();
    showNewQuote();
  } catch (error) {
    console.log(error);
  }
  fadeIn();
}

tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} = ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', fadeOut);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
randomBGColor();
buttonDsblAbl();
getQuotes();