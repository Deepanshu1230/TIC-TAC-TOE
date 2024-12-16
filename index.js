const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGamebtn=document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

///Let's inisitalise the function for the initial condition

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    //UI par empty dikhana hoga
    boxes.forEach((box,index)=>{
        box.innerHTML="";
        boxes[index].style.pointerEvents="all";
        box.classList.remove("win");
        //one more thing is left
    })
    newGamebtn.classList.remove("active");
    gameInfo.innerText=`Current Player -${currentPlayer}`;
}

initGame();


function swapIn(){

    if(currentPlayer === "X"){
        currentPlayer="O";
        // boxes.innerText=currentPlayer;
    }

    else{
        currentPlayer="X";
        // boxes.innerText=currentPlayer;
    }

    ///UI updating
    gameInfo.innerText=`Current Player-${currentPlayer}`;
}

function checkGameOver(){
    let answer="";


    winningPositions.forEach((position) =>{
        //all the boxes should be the same and non-empty
        if((gameGrid[position[0]] !== "" ||  gameGrid[position[1]] !== ""  || gameGrid[position[2]] !=="")
         && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
          

            //check if the winnner is
            if(gameGrid[position[0]] === "X")
                 answer="X";
            
            else 
            answer="O";

            //disable the movement of he mouse
            boxes.forEach((box) =>{
                box.style.pointerEvents="none";
            })

            //now we know that the X/O is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        
        };
    })

    if(answer !== ""){
        gameInfo.innerText=`Winner is -${answer}`;
        newGamebtn.classList.add("active");
        return;
    }


    //when no one able to win the game so
    let fillCount=0;
    gameGrid.forEach((box) =>{
        if(box !== ""){
            fillCount++;
        }
    })


    //board is filled now
    if(fillCount === 9){
        gameInfo.innerText="Game Tied";
        newGamebtn.classList.add("active");
    }

};

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;//it will show the value in the gameGrid=["",""....]
        boxes[index].style.pointerEvents="none";
        //swap kardo hamari x/o ko
        swapIn();

        //check that ki jo jeet to nhi gya kya
        checkGameOver();


    }
}

boxes.forEach((box,index) =>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});


newGamebtn.addEventListener("click",initGame);