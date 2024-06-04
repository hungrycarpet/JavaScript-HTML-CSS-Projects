const typingtext = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time-left b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const button = document.querySelector('button')

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let num_mistakes = 0;
let isTyping = false;


function loadParagraph(){
    const paragraph = ['The only limit to our realization of tomorrow is our doubts of today.',
        'It\'s not the years in your life that count; it\'s the life in your years.',
        'The early bird catches the worm, but the second mouse gets the cheese.',
        'The sun was shining brightly in the clear blue sky. Birds were chirping happily as they flitted from tree to tree. Children played in the park, laughing and shouting with joy. A gentle breeze blew, rustling the leaves and making the flowers sway. It was a perfect day to be outside and enjoy the beauty of nature.',
        'On a warm summer evening, the old town square came to life. Families strolled leisurely, stopping to admire the colorful array of flowers lining the pathways. Street vendors called out, offering a variety of treats, from sweet cotton candy to savory popcorn. Musicians played lively tunes, creating an atmosphere of celebration. As the sun set, casting a golden glow over the scene, the town square felt like a magical place where time stood still.',
        'In the heart of the enchanted forest stood an ancient, towering oak tree. Its gnarled branches reached out like welcoming arms, and its leaves whispered secrets to those who would listen. Beneath its canopy, the ground was covered in a soft carpet of moss, dotted with delicate mushrooms glowing faintly in the twilight. The air was filled with the sweet scent of blooming flowers and the distant hum of a hidden waterfall. It was a place where time seemed to pause, and the magic of the forest wrapped around you like a warm, comforting embrace',
        'The process of photosynthesis in plants is a remarkable demonstration of nature\'s efficiency. In chloroplasts, the pigment chlorophyll captures sunlight and uses its energy to convert carbon dioxide and water into glucose and oxygen. This conversion takes place in two stages: the light-dependent reactions and the Calvin cycle. The former occurs in the thylakoid membranes, producing ATP and NADPH, which are then utilized in the Calvin cycle within the stroma. This cycle synthesizes glucose, providing essential energy for the plant and releasing oxygen as a byproduct, crucial for life on Earth.'
    ]
    const randomIndex = Math.floor(Math.random()*paragraph.length)
    typingtext.innerHTML = '';
    for(const char of paragraph[randomIndex]){
        // console.log(char)
        typingtext.innerHTML+= `<span>${char}</span>`;
    }
    typingtext.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', ()=>input.focus())
    typingtext.addEventListener("click", ()=>input.focus())
}

function initTyping(){
    const char = typingtext.querySelectorAll('span')
    const typedChar = input.value.charAt(charIndex)
    if(charIndex < char.length && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }
        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct')
            // console.log('correct')
        }
        else{
            num_mistakes++;
            char[charIndex].classList.add('incorrect')
            // console.log('incorrect')
        }
        charIndex++;
        char[charIndex].classList.add('active')
        mistakes.innerText = num_mistakes;
        cpm.innerText = charIndex - num_mistakes;
    }
    else{
        clearInterval(timer);
        input.value = '';
    }
}

function initTime(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft;
        const wpmVal = Math.round(((charIndex - num_mistakes)/5)/(maxTime - timeLeft)*60)
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    num_mistakes = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
    time.innerText = timeLeft;
    input.value = '';
}

input.addEventListener("input", initTyping)
button.addEventListener("click", reset);
loadParagraph();