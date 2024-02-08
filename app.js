let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let h2 = document.querySelector("h2");

let started = false;
let level = 0;
let highest = 0;


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout( function() {
        btn.classList.remove("flash");
    },250);
}

function highestScore() {
    let Hscore = document.querySelector("h4");
    if(highest < level) {
        highest = level;
    }
    Hscore.innerHTML = `Highest Score = ${highest}`;
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout( function() {
        btn.classList.remove("userflash");
    },250);
}

document.addEventListener("keypress" , function() {
    if( started == false ) {
        started = true;

        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randCol = btns[randIdx];
    let randbtn = document.querySelector(`.${randCol}`);

    gameSeq.push(randCol);
    gameFlash(randbtn);
}

function wrongClick() {
    let bodyCol = document.querySelector("body");
    bodyCol.classList.add("body");
    setTimeout( function() {
        bodyCol.classList.remove("body");
    }, 200);
}

function checkSeq(idx) {
    if( gameSeq[idx] === userSeq[idx]) {
        if( gameSeq.length == userSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! <b>Your score was ${level}</b><br>Press any key to start `;
        highestScore();
        wrongClick();
        reset();
    }
}

function btnpress() {
    let btn1 = this;
    userFlash(btn1);

    userColor = btn1.getAttribute("id");
    userSeq.push(userColor);
    

    checkSeq(userSeq.length-1);
}

let Allbtns = document.querySelectorAll(".btn");
for( Allbtn of Allbtns ) {
    Allbtn.addEventListener("click",btnpress)
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
