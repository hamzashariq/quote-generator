import localQuotes from "./quotes.js";

let quotes = [];

const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const tweetButton = document.getElementById('tweet');
const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-container');

async function getQuotes() {
  showLoader();
  const quotesUrl = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(quotesUrl);
    quotes = localQuotes.concat(await response.json());
    newQuote();
  } catch (error) {
    alert('Something went wrong, please try again later.');
    console.error(error);
  }

  hideLoader();
}

async function newQuote() {
  showLoader();
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  quoteText.textContent = quote.text;
  
  // Determine styling based on quote length
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  hideLoader();
}

function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, '_blank');
}

function showLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoader() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Event Listeners
newQuoteButton.addEventListener('click', newQuote);
tweetButton.addEventListener('click', tweetQuote);

getQuotes();