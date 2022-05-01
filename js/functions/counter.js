export function updateCounter(number) {

    const counter = document.getElementById('counter');
    const c = +counter.innerText;
    counter.innerText = c + number;
    
}