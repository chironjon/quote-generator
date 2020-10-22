const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

displaySpinner = () => {loader.hidden = false}

removeSpinner = () => {loader.hidden = true}

randomBGColor = () => {
  let colors = [];
  for (let i = 0; i < 3; i++) {
    colors[i] = Math.floor(Math.random() * 256);
  }
  let randColor = "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";
  console.log(randColor);
  document.body.style.background = randColor;
  return null;
}

fadeIn = () => {
  newQuoteBtn.disabled = true;
  randomBGColor();
  quoteContainer.classList.add('fade-in');
  setTimeout(function(){quoteContainer.classList.remove('fade-in');}, 2000);
}

fadeOut = () => {
  newQuoteBtn.disabled = true;
  quoteContainer.classList.add('fade-out'); // add fade out class then remove after 1.8s
  setTimeout(() => quoteContainer.classList.remove('fade-out'), 2000);
  setTimeout(() => getQuotes(), 1600) // run get quotes right as animation clears
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
  setTimeout(() => newQuoteBtn.disabled = false, 2000);
  removeSpinner();
}

// Get quote from API
getQuotes = async () => {
  displaySpinner();
  fadeIn();
  const proxyUrl = 'https://mysterious-savannah-75912.herokuapp.com/'
  const apiUrl = 'http://type.fit/api/quotes';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    apiQuotes = await response.json();
    showNewQuote();
  } catch (error) {
    console.log(error);
  }
}

// Tweet Quote
tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} = ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', fadeOut);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();