let gameSeq=[];
let userSeq=[];
let started=false;
let level=0;
let btns=["red","yellow","green","purple"];
let h4=document.querySelector("h4");
document.addEventListener("keypress",function(){
    if(!started)
        started=true;
    levelUp();
});
function gameBtnFlash(btn)
{
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },250 );
}
function userBtnFlash(btn)
{
    btn.classList.add("userFlash");
    setTimeout(()=>{
        btn.classList.remove("userFlash");
    },250 );
}
function levelUp()
{
    userSeq=[];
    level++;
    h4.innerText=`Level ${level}`;
    let randIndx=Math.floor(Math.random()*3);
    let randColor=btns[randIndx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameBtnFlash(randBtn);
}

let allBtns=document.querySelectorAll(".btn");

for(btn of allBtns)
    btn.addEventListener("click",btnPress);

function btnPress()
{
    let btn=this;
    userBtnFlash(btn);
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}
function checkAns(idx)
{
    if(gameSeq[idx]==userSeq[idx])
    {
        if(gameSeq.length==userSeq.length)
            setTimeout(levelUp,1000);
    }
    else
    {
        if(level==0)
            level++;
        h4.innerHTML=`Game Over! Your score was ${level-1}<br>Refresh to start the new game`;
        reset();
    }
}
function reset()
{
    gameSeq=[];
     userSeq=[];
     started=false;
     level=0;
}