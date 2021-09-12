// DISCOMBOBULATOR
// discombobulate --- replace all words with a discombobulated version of that word... 
function discombobulate(sentence) {
    let regex = /(\w+)/g;                                               // regex that finds words
    let output = sentence.replace(regex, (match) => {                   // replace each word with the mix()ed version of itself.
        return mix(match);
    });
    //console.log(output);
    return output;
    
}

// canMix --- can a word be mixed?
function canMix(word) {
    let comp = word[1];
    for(let i = 1; i < word.length - 1; i++) {
        if(word[i] != comp) {
            return true;
        }
    }
    return false;
}

// mix --- scramble all characters in a word except the first and last.
function mix(word) {
    if(word.length < 4) {                                               // if there is less than 4 characters, the result will be the same as the input... end early.
        return word;
    }
    if(!canMix(word)) {
        return word;
    }

    let chars = word.split("");                                         // convert to array
    let indexes = [];                                                   // the list of available indexes.


    for(let i = 1; i < chars.length - 1; i++) {                         // fill the indexes with 1-(2nd to last)
        indexes.push(i);
    }

    let output = [];
    output[0] = chars[0];                                               // replace first char of output[] with first char of chars[].
    output[chars.length - 1] = chars[chars.length - 1];                 // replace final char of output[] with final char of chars[]

    let i = 1;                                                          // tracks the next char in chars[].
    while(indexes.length > 0) {                                         // grabs random entries from the index list, and uses those indexes to add from chars to output.
        let randomInt = Math.floor((Math.random() * indexes.length));   // generate a random integer
        output[indexes[randomInt]] = chars[i];                          // populates the random index of output with the next character in chars.
        indexes.splice(randomInt, 1);
        i++;
    }
    output = output.join("");                                           // convert to string from array

    if(word == output) {    // need to retry.
        return mix(output);
    }
    return output;
}

function darkMode() {   // change css variables
    COLOR_STATE = "light";  // next state
    root.style.setProperty('--backgroundColor', '#333');
    root.style.setProperty('--textColor', '#EEE');
    root.style.setProperty('--buttonColor','#555');
    root.style.setProperty('--buttonFade','#444');
    root.style.setProperty('--linkColor','#AAA');
}
function lightMode() {  // change css variables
    COLOR_STATE = "blue";   // next state
    root.style.setProperty('--backgroundColor', 'white');
    root.style.setProperty('--textColor', 'black');
    root.style.setProperty('--buttonColor','white');
    root.style.setProperty('--buttonFade','#CCC');
    root.style.setProperty('--linkColor','#666');
}
function blueMode() {
    COLOR_STATE = "dark";
    root.style.setProperty('--backgroundColor', '#a9d0db');
    root.style.setProperty('--textColor', '#333');
    root.style.setProperty('--buttonColor','#c4f1ff');
    root.style.setProperty('--buttonFade','#b1d9e6');
    root.style.setProperty('--linkColor','#444');
}

// DECLARATIONS
let COLOR_STATE = "light";
let root = document.documentElement;
let result = document.getElementById("result");
let textArea = document.getElementById("textArea");
let button = document.getElementById("submit");
let link = document.getElementById("link");
let info = document.getElementById("infoBox");
let colorToggle = document.getElementById("colorToggle");

const buttonInitialText = button.innerHTML;
const textAreaPlaceholder = textArea.placeholder;

// BUTTON LISTENERS
button.addEventListener("click", () => {
    let text = textArea.value;
    result.innerHTML = discombobulate(text);  
});
button.addEventListener("mouseover", () => {
    button.innerHTML = discombobulate(button.innerHTML);
});
button.addEventListener("mouseleave", () => {
    button.innerHTML = buttonInitialText;
});

// ColorToggle LISTENERS
colorToggle.addEventListener("click", () => {
    window.event.stopPropagation();
    switch(COLOR_STATE) {
        case "light":
            lightMode();
            break;
        case "dark":
            darkMode();
            break;
        case "blue":
            blueMode();
            break;

    }
});

// // TEXT AREA LISTENERS
// textArea.addEventListener("mouseover",() => {
//     textArea.placeholder = discombobulate(textArea.placeholder);
// });
// textArea.addEventListener("mouseleave", () => {
//     textArea.placeholder = textAreaPlaceholder;
// });

// LINK Listeners
link.addEventListener("click", () => {
    //console.log("display!");
    info.style.display = "flex";
});

// INFO Listener
info.addEventListener("click", () => {
    info.style.display = "none";
});

lightMode();