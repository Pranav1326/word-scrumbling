// Elements
const wordEl = document.getElementById('word');
const hintEl = document.getElementById('hint');
const timeEl = document.getElementById('time');
const refreshBtn = document.getElementById('refresh');
const checkBtn = document.getElementById('check');
const input = document.getElementById('guess');
let inputAnswer = "";

// Word array with hints
const words = [
    {
        word: "hello",
        hint: "word for greeting",
        time: 10
    },
    {
        word: "steering",
        hint: "by which direction change of a car",
        time: 30
    },
    {
        word: "mouse",
        hint: "a mammal and computer device",
        time: 15
    },
    {
        word: "keyboard",
        hint: "standard typing device",
        time: 30
    },
    {
        word: "monitor",
        hint: "standard output device",
        time: 30
    },
    {
        word: "pi",
        hint: "Important for calculate diameter",
        time: 10
    },
    {
        word: "flute",
        hint: "Musical breathing instrument",
        time: 20
    },
    {
        word: "fridge",
        hint: "It's very cold",
        time: 20
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
refreshBtn.addEventListener('click', () => {
    init();
    stopCount();
    counter=words[randForArr].time;
    onLoad();
    randWord = words[randForArr].word;
    seprateWord();
    input.focus();
});

// Check Button function
const checkAnswer = () => {
    inputAnswer = input.value.toLowerCase();
    if (inputAnswer === words[randForArr].word){
        alert(`Correct.`);
        init();
        stopCount();
        counter=words[randForArr].time;
        onLoad();
        input.focus();
    } 
    else{
        alert(`Wrong!`);
        input.focus();
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
