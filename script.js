// Elements
const wordEl = document.getElementById('word');
const hintEl = document.getElementById('hint');
const timeEl = document.getElementById('time');
const refreshBtn = document.getElementById('refresh');
const checkBtn = document.getElementById('check');
const input = document.getElementById('guess');
const playerNameVal = document.getElementById('playerNameValue');
const scoreVal = document.getElementById("scoreValue");
const guessCounterVal = document.getElementById("guessCounter");
let inputAnswer = "";
let playerName;
let score = 0;
let guessCounter = 3;

playerName = prompt("Please enter your name: ");
playerNameVal.innerText = playerName;

// Word array with hints
const words = [
    {
        word: "hello",
        hint: "word for greeting",
        time: 100,
        score: 5
    },
    {
        word: "steering",
        hint: "by which direction change of a car",
        time: 300,
        score: 15
    },
    {
        word: "mouse",
        hint: "a mammal and computer device",
        time: 150,
        score: 10
    },
    {
        word: "keyboard",
        hint: "standard typing device",
        time: 300,
        score: 20
    },
    {
        word: "monitor",
        hint: "standard output device",
        time: 300,
        score: 20
    },
    {
        word: "pi",
        hint: "Important for calculate diameter",
        time: 100,
        score: 5
    },
    {
        word: "flute",
        hint: "Musical breathing instrument",
        time: 200,
        score: 10
    },
    {
        word: "fridge",
        hint: "It's very cold",
        time: 200,
        score: 10
    }
];

const wordArrLength = words.length;

// Variables
let randForArr;
let random;
let randWord;
let newword;

// Initializing variables
const init = () => {
    randForArr = null;
    random = Math.floor(Math.random()*wordArrLength);
    randForArr = random;
    randWord = words[randForArr].word;
    newword = randWord.split("");
}

// Refresh Button
const refresher = () => {
    init();
    stopCount();
    counter=words[randForArr].time;
    onLoad();
    randWord = words[randForArr].word;
    seprateWord();
    input.focus();
}
refreshBtn.addEventListener('click', refresher);

const inputValidator = () => {
    if(input.value == ""){
        alert(`Please enter the input properly!`);
        return false;
    }
    return true;
}

// Check Button function
const checkAnswer = () => {
    inputAnswer = input.value.toLowerCase();
    let validator = inputValidator();
    console.log(validator);
    if(!validator){
        return;
    }
    if (validator && (inputAnswer === words[randForArr].word)){
        alert(`Correct. +${words[randForArr].score} points`);
        score = score + words[randForArr].score;
        scoreVal.innerText = score;
        init();
        stopCount();
        counter=words[randForArr].time;
        onLoad();
        input.focus();
    } 
    else{
        guessCounter--;
        if(guessCounter <= 0){
            alert(`Ah ohh! You lost your score of ${score}. but you can always try again 😃`);
            score = 0;
            scoreVal.innerText = score;
            guessCounter = 3;
            guessCounterVal.innerText = guessCounter;
            refresher();
        }
        else{
            alert(`Wrong! ${guessCounter} guesses remains.`);
            guessCounterVal.innerText = guessCounter;
            input.focus();
        }
    }
}

// Check Button Event
checkBtn.addEventListener('click', checkAnswer);

// Checking answer by "Enter" key
input.addEventListener("keypress", (e) => {
    if(e.keyCode === 13){
        e.preventDefault();
        checkAnswer();
    }
});

// Calling function to initialize the global variables.
init();

// Counter (Timer)
let counter = words[randForArr].time;
let timeout;
let timer_on = false;
function timedCount() {
    if(counter === 0){
        alert(`Timeout!!`);
        navigation.reload();
    }
    else{
        timeEl.textContent = `Time: ${counter}`;
        counter--;
        timeout = setTimeout(timedCount, 1000);
    }
}
// Function to start Timer
function startCount() {
    if (!timer_on) {
        timer_on = true;
        timedCount();
    }
}
// Function to stop Timer
function stopCount() {
    clearTimeout(timeout);
    timer_on = false;
}

const onLoad = () => {
    input.value = null;
    hintEl.textContent = `Hint: ${words[random].hint}`;
    let s = seprateWord();
    wordEl.textContent = "";
    s.forEach(e => {
        wordEl.textContent += e.toUpperCase();
    });
    input.focus();
    startCount();
};
onLoad();

// Function to seperate and suffle each character of the random word
function seprateWord (){
    let suffledWord = [];
    let count = [];
    for(let i=0;i<newword.length;i++){
        let ran = Math.floor(Math.random()*newword.length);
        if(count.includes(ran)){
            ran = Math.floor(Math.random()*newword.length);
            i--;
        }
        else{
            count.push(ran);
            suffledWord.push(newword[ran]);
        }
    }
    return suffledWord;
}
