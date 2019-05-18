
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 * Open issue, how do you restart?
 * TODO: Implement the window function.
 */

// Get the startTime for the timer.
let startTime = new Date().getTime();

let runTimer = true;

// Update the counter every 1 second
setInterval(function() {
    if (runTimer) {
        // Get todays date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const timeElapsed = now-startTime;


        const minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

        // Allow two minutes for them to finish the game
        if (timeElapsed > 1000*120) {
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }
}, 1000);


/*
 * Create a list that holds all of your cards
 */
// <li class="card open show">
function makeCard(c_class) {
    return `<li class="card">
            <i class="fa fa-${c_class}"></i>
            </li>`;

}

function makeStar() {
    return `<li>
            <i class="fa fa-star" style="font-size:2rem"></i>
            </li>`;

}

function initGrid() {
    const syms = ['diamond','paper-plane-o','anchor','bolt','bomb','cube','leaf','bicycle'];
    let cards = shuffle([...syms,...syms]);
    let cardHTML = cards.map(function(card) {
        return makeCard(card);
    });

    deck.innerHTML =cardHTML.join(' ');

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function initGame() {
    // Initiate the game .
    initGrid();
    stars.innerHTML = makeStar()+' '+makeStar()+' '+makeStar();
    moves.innerHTML=n_moves+' Moves';
}

// Initial initialization
let deck = document.querySelector('.deck');

//  Make a counter to track the number matches.
let n_matches=0;

//  Make a counter for the number of moves.
moves = document.querySelector('.moves');

let n_moves=0;

//  Initiate The Stars
stars = document.querySelector('.stars');
let n_stars=3;

// Add the shuffled cards and initiate the star rating.
initGame();
// Reset how many openCards exist.
let openCard = [];

// Get the modal
let modal = document.getElementById('myModal');
// modal.style.display = "none";

document.querySelectorAll('.restart')[0].addEventListener('click',function () {
    n_matches=0;
    n_moves=0;
    n_stars=3;
    initGame();
    openCard = [];
    startTime = new Date().getTime();
});

deck.addEventListener('click', function(event) {

    if (event.target.className==='card') {
        // Update the move counter.
        n_moves+=1;
        if (n_moves===1) {moves.innerHTML=n_moves+' Move'}
        else {moves.innerHTML=n_moves+' Moves'}

        //document.querySelectorAll('.card');
        if (event.target.classList.contains('open'))
            {event.target.classList.remove('open','show')}
        else if (openCard.length===0)
            {openCard.push(event.target);
                event.target.classList.add('open','show');
            }
        // Another Open Card Exists
        else {
            //Card Matches, But Is Not Exactly The Same Card.
            if ((openCard[0].firstElementChild.className === event.target.firstElementChild.className)
                && (openCard[0]!==event.target))
            {
                event.target.classList.add('match');
                openCard[0].classList.add('match');
                n_matches += 1;
                openCard = [];
            }
            // Card Click does not match, show the card
            else
            {event.target.classList.add('open', 'show');
                openCard.push(event.target);

                openCard.forEach(function (card) {
                    card.classList.add('wrong')
                });
                //push it to the stack, wait 100 ms for it to disappear.
                setTimeout(function () {
                    openCard.forEach(function (card) {
                        card.classList.remove('open', 'show','wrong')
                    });

                    openCard = [];
                }, 500);
            }}

        //Update the star counter.
        if (((n_moves-10)/2 > n_matches) && n_stars===3 )
        {n_stars=2;
            stars.innerHTML = makeStar()+' '+makeStar();
        }
        else if (((n_moves-14)/2 > n_matches) && n_stars===2 )
        {n_stars=1;
            stars.innerHTML = makeStar();
        }

        //n_matches
        if (n_matches===8) {
            runTimer = false;
            cards = Array.from(deck.getElementsByClassName('card'));
            cards.forEach(function (card) {
                card.classList.remove('match');
                card.classList.add('open');
                card.classList.add('show');
                return card
            });
            moves.innerHTML+=' (You Win!)';
            // Wait a little bit before showing the modal.
            setTimeout(function () {
                modal.style.display = "block";
                //
                let timeRun = document.getElementById("timer").innerHTML;
                document.getElementById("modal-html").innerHTML = 'You won the game in: '+timeRun+'. Would you like to play again?';

                //You Win!!! Would You Like To Play Again?
            },700);


            // Get the <span> element that closes the modal
            let span = document.getElementsByClassName("close")[0];

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            };

            // Yes Button.
            let yes_btn = document.getElementById("yesBtn");

            // No Button.
            let no_btn = document.getElementById("noBtn");

            // When the user clicks on the yes button, restart the game;
            yes_btn.onclick = function() {
                modal.style.display = "none";
                n_matches=0;
                n_moves=0;
                n_stars=3;
                initGame();
                openCard = [];
                runTimer = true;
                startTime = new Date().getTime();
            };

            // When the user clicks on the no button, simply close the modal.
            no_btn.onclick = function() {
                modal.style.display = "none";
            };

        }
    }});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
