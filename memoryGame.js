const versos = document.querySelectorAll('.verso');
const rectos = document.querySelectorAll('.recto');
let emojiArray = [];


const fetchEmojis = (arr) => {
  // select uninterrupted emoji range to generate random number from
  let randNum = Math.floor(Math.random() * (127891 - 127744 + 1)) + 127744;
  // make sure emoji pairs are unique
  while (arr.indexOf('&#' + randNum + ';') !== -1) {
    randNum = Math.floor(Math.random() * (127891 - 127744 + 1)) + 127744;
  }
  return ['&#' + randNum.toString() + ';', '&#' + randNum.toString() + ';'];
}

const shuffleArray = (arr) => {
  arr.forEach((item, index) => {
    let randNumber = Math.floor(Math.random() * 11);
    let toMove = arr[randNumber];
    arr.splice(randNumber, 1, item);
    arr.splice(index, 1, toMove);
  })
  return arr
}

const handleClick = (event) => {
 // card is closed, but about to be opened
 if (event.target.nextElementSibling) {
   // close cards when pair is already opened
   if (document.querySelectorAll('.verso.open').length === 2) {
     versos.forEach(function(item) {
       item.setAttribute('style', 'display:none');
       item.classList.remove('open');
       item.previousElementSibling.setAttribute('style', 'display:block');
     })
   }
   event.target.setAttribute('style', 'display:none');
   event.target.classList.remove('open');
   event.target.nextElementSibling.setAttribute('style', 'display:block');

   // check if there is a pair among the open cards
   let openCards = document.querySelectorAll('.open');
   openCards.forEach(item => {
     if (item.innerHTML === event.target.nextElementSibling.innerHTML) {
       // let both cards disappear
       event.target.parentElement.classList.add('out');
       item.parentElement.classList.add('out');
       // check if game has ended
       if (document.querySelectorAll('.out').length === rectos.length) {
         addSuccessMessage();
       }
     }
   })
   event.target.nextElementSibling.classList.add('open');

 }
 // card is open, but about to be closed
 else {
   event.target.setAttribute('style', 'display:none');
   event.target.classList.remove('open');
   event.target.previousElementSibling.setAttribute('style', 'display:block');
 }
}


const addSuccessMessage = () => {
    const message = `
    <div id="messageFrame">
    <div class="successMessage">
      Good Job!
    </div>
    </div>
    `;
    // remove field
    document.querySelector("body").removeChild(document.getElementById('field'));
    // insert message
    document.querySelector('button').insertAdjacentHTML('beforebegin', message);
}

// attach event listeners to front and back of the card
rectos.forEach((item, index) => {
   item.addEventListener('click', handleClick)
 });
 versos.forEach((item, i) => {
   item.addEventListener('click', handleClick)
 });
 // add event listener to button
 document.querySelector('button').addEventListener( 'click', _ => window.location.reload())

// build array of randomly chosen emojis
for (let i = 0; i < 6; i++) {
  emojiArray.push(...fetchEmojis(emojiArray))
}

shuffleArray(emojiArray);

// distibute emoji pairs over set of cards
versos.forEach((item, index) => {
  item.innerHTML = emojiArray[index];
})
