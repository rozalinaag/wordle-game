
document.addEventListener("DOMContentLoaded", () => {

    createSquares();
    
    let guesseWords = [[]];
    let availableSpace = 1; //ячейки от 1 до 5
    let word = "dairy";
    let counterWord = 0;
    let guessedWordCount = 0;
    let music = false;
    let first_shufle = false;

    const keys = document.querySelectorAll('.keyboard-row button');

    var space = new Audio();
    var whoosh = new Audio();
    var right = new Audio();
    var notright = new Audio();
    space.src = "audio/space.mp3";
    whoosh.src = "audio/whoosh.mp3";
    right.src = "audio/right.mp3";
    notright.src = "audio/notright.mp3";
    space.play(); 
    
    function musicPlay(){ 
        space.play();
    }

    hint.onclick = function() {
        let isBoss = confirm("Подсказка стоит 1 балл. Первоначально введите слово и затем нажмите <Подсказка>. Желтый - такая буква есть, но стоит не правильно, зеленый - буква в правильном месте");
        if (isBoss){
            const currentWordArr = getCurrentWordArr();
            if (currentWordArr.length == 0){
                alert("Сделайте попытку ввести слово, а затем нажимайте подсказку.");
            }
            showColorLetters(word, currentWordArr);
            updateCounter(-1);
            whoosh.play();
        }
    };

    next.onclick = function() {
        let isBoss = confirm("Поменять слово стоит 1 балл");
        if (isBoss){
            if (availableSpace>=2){
                deleteAllLetters();
            }
            
            updateWord(counterWord);
            availableSpace = 1;
            updateCounter(-1);
        }
        
    };
    ok.onclick = function() {  
        handleSubmitWord();
    };
    
    function updateCounter(number) {

        const counter = document.getElementById('counter');
        const c = +counter.innerText;
        counter.innerText = c + number;
        
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");
    
        for (let index = 0; index < 5; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }
    
    function getCurrentWordArr() {
        const numberOfGuessWords = guesseWords.length;

        return guesseWords[numberOfGuessWords - 1]
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace)); //текущая ячейка

            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr()
        if (currentWordArr.length !== 5) {
            window.alert("Word must be 5 letters");
        }

        const currentWord = currentWordArr.join('');

        if (currentWord === word) {
            //window.alert("Поздравляю! Это правильное слово");
            right.play();
            showColorLetters(word, currentWordArr);
            updateWord(counterWord);
            updateCounter(5);
        }
        else {
            showColorLetters(word, currentWordArr, "rgb(58, 58, 60)");
            //window.alert("Не правильно!");
            notright.play();
        }

        setTimeout(deleteAllLetters, 1000);
        showColorLetters(word, currentWordArr, "rgb(58, 58, 60)");
    }

    function deleteAllLetters() {
        const currentWordArr = getCurrentWordArr();
        const lenWord = currentWordArr.length; 
        for (let i = 0; i < lenWord ; i++) {
            handleDeleteLetter();
        }
        availableSpace = 1;
    }


    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();


        const lastLetterEl = document.getElementById(String(availableSpace - 1));
        lastLetterEl.textContent = ''
        availableSpace = availableSpace - 1;
    }

    updateWord(counterWord);

    function updateWord(counter){
        let words = ['happy', 'about', 'black', 'dairy', 'enter', 'board', 'panic', 'noise', 'radar', 'radio', 'under', 'zebra', 'chaos'];
        
        if (!first_shufle){
            words.sort(() => Math.random() - 0.5);
        }
        
        word = words[counter];

        counterWord++;
        if (counterWord == words.length){
            counterWord=0;
        }
        whoosh.play();
        inputShuffleLetters (words[counter]);
    }

    function shuffleLetters(word){
        let shuffled = word.split('').sort(function(){return 0.5-Math.random()}).join('');
        console.log(shuffled);
        console.log(word)
        if (shuffled == word){
            return shuffleLetters(word)
        }
        else{
            return shuffled;
        }
    }

    function inputShuffleLetters(word){
        let shuffleWord = shuffleLetters(word);

        let id='letter';

        for (let i =0; i<5; i++){
            const letter = document.getElementById(id + (i+1));
            letter.innerHTML = shuffleWord[i].toUpperCase();
        }

    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (!music){
                musicPlay();
                music=false;
            }

            if (letter == 'enter') {
                handleSubmitWord();
                return;
            }

            if (letter === 'del') {
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(letter);
        }
    }

        //если буква на правильном месте, то красив в зеленый цвет
    function getTileColor(word, letter, index) {
        
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }


    function showColorLetters(word, currentWordArr, color=null) {
    const firstLetterId = 1;

    const interval = 200;
    let tileColor;
    currentWordArr.forEach((letter, index) => {
        setTimeout(() => {
            if (color == null){
                tileColor = getTileColor(word, letter, index);
            }
            else{
                tileColor = color;
            }
            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);
            letterEl.classList.add("animate__flipInX");
            letterEl.style = `background-color: ${tileColor}; border-color:${tileColor}`;
        }, interval * index)
    });
    }

})