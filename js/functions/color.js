
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

   
export function showColorLetters(word, currentWordArr, color=null) {
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
