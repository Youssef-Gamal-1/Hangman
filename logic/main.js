const letters = 'abcdefghijklmnopqrstuvwxyz';
let lettersArray = Array.from(letters);

const lettersContainer = document.querySelector('.letters');
// Generate letters
lettersArray.forEach((letter) => {
    let span = document.createElement('span');
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
})

const words = {
    programming: ['php','javascript','go','scala','fortan','python','mysql','c','r'],
    countries: ['Egypt','Algeria','Morrocow','united states','canada','indonesia','palestine','Qatar','Syria','Brazil'],
    movies: ['perstige','inception','paratise','intersteller','whiplash','memento','coco','up'],
    people: ['youssef gamal','ahmed','gamal','mohamed','ibrahim mosad','moses','jesus']
}

// Get random properety
let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber]
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValue = randomPropValue[randomValueNumber];
// set category info
document.querySelector('.category span').textContent = `${randomPropName}`;

let lettersGuessContainer = document.querySelector('.guess-letters');
let lettersAndSpace = Array.from(randomValue);

// Create spans depending on word
lettersAndSpace.forEach((letter) => {
    let emptySpan = document.createElement('span');
    
    if(letter === " ") {
        emptySpan.className = 'has-space';
    }
    lettersGuessContainer.appendChild(emptySpan);
})

let guessSpans = document.querySelectorAll('.guess-letters span');
let wrongAttempts = 0;
let rightAttempts = 0;
let draw = document.querySelector('.hangman-draw');

document.addEventListener('click',(e) => {
    let Status = false;

    if(e.target.className === 'letter-box') {
        e.target.classList.add('clicked');

        let clickedletter = e.target.innerHTML.toLowerCase();

        lettersAndSpace.forEach((letter,wordIndex) => {
            if(clickedletter == letter) {
                Status = true;
                guessSpans[wordIndex].textContent = clickedletter;
            }
        })
        if(Status === false) {
            wrongAttempts++;
            draw.classList.add(`wrong-${wrongAttempts}`);
            document.getElementById('fail').play();

            if(wrongAttempts === 8) {
                lettersContainer.classList.add('finish');
                endGame(Status);
            }
        } else {
            rightAttempts++;
            document.getElementById('success').play();
            if(lettersAndSpace.includes(" ")){
                if(rightAttempts === lettersAndSpace.length - 1) {
                    endGame(Status);
                }
            } else {
                if(rightAttempts === lettersAndSpace.length) {
                    endGame(Status);
                }
            }

        }
    }
})

function endGame(Status){
    let div = document.createElement('div');
    let shadow = document.createElement('div');

    shadow.className = 'shadow';
    div.className = 'pop-up';

    if(Status === true) {
        div.classList.add('success');
        div.appendChild(document.createTextNode("Congratulations!"));
    } else {
        div.classList.add('fail');
        div.appendChild(document.createTextNode("Game Over!"));
    }

    document.body.appendChild(div);
    document.body.appendChild(shadow)
    setTimeout(() => {
        location.reload();
    },5000)
}