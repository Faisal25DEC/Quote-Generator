// we will interact with html container and 
// change their behaviours using our js
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hide laoding 
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// format of data will be diff with
// different APIs(application programming interface)
// Current API->returns an array of quotes
// breaking it up into objects within objects
// use correct syntax with data u have
//---------GET QUOTES FROM API--------
//____we will use asynchronous fetch request
// within a try-catch statement 
// asnyc function can run at anytime and 
// won't stop browser from fetching any data
// #----function showing new quote

function newQuote(){
    loading();
    //Math.random()->math function that returns a no
    //between 0 and 1(decimal)
    //we can use this function to multiply a random
    //decimal no with our apiQuotes array length
    //also we will combine it with math.floor() which
    //will return largest no small than x
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is empty so we can set it to unknown
    if(!quote.author) {
        authorText.textContent = "Unknown";
    }else {
        authorText.textContent = quote.author;
    }
    //Check Quote length to determine styling
    if(quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
       
    }
    //Set Quote, hide Loader
    quoteText.textContent = quote.text;
    complete();
}

let apiQuotes = [];
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        //this means response will not be populated until the data is fetched
        //if we try another variable other than const it will 
        // try to populate response which is not good

        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    }catch(error){
        //handle error here
    }
}
function tweetQuotes() {
    // we use a backtick for this reason is we have a question-mark after url
    //to show its a query and then we write text=${quoteText.textContent} - ${authorText.textContent}
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); //_black allow twitter url to open in a new tab
}
//Event Listener
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click', tweetQuotes);

// On load
getQuotes();