// All code should be written in this file.

function rockPaperScissors(move1, move2){
    if(move1 === undefined || move2 === undefined){
        return null;
    }
    if(move1==move2){
        return 'Tie';
    }
    else{
        if((move1 == "rock" && move2 == 'scissors')||(move1 == "scissors" && move2 == 'paper')||(move1 == "paper" && move2 == 'rock')){
            return 'Player One';
        }
        else{
            return 'Player Two';
        }
    }
}

function winningMove(move1, value1, move2, value2){
    var verdict = rockPaperScissors(move1, move2);
    if(value1 === undefined || value2 === undefined){
        return null;
    }
    if(verdict == 'Tie'){
        if(value1>value2){
            return 'Player One';
        }
        if(value1<value2){
            return 'Player Two'
        }
    }
    return verdict;
}

function random(n){
    return Math.floor(Math.random()*n);
}

function ok(text = "ok!"){
    console.log(text);
}

//Step 1: the player move types
//In order to save time in writing the project, we will write the variables in a more condensed format

var playerOneMoveOneType;
var playerOneMoveTwoType;
var playerOneMoveThreeType;

var playerOneMoveOneValue;
var playerOneMoveTwoValue;
var playerOneMoveThreeValue;

var playerTwoMoveOneType;
var playerTwoMoveTwoType;
var playerTwoMoveThreeType;

var playerTwoMoveOneValue;
var playerTwoMoveTwoValue;
var playerTwoMoveThreeValue;

const moves = ['rock', 'paper', 'scissors']

//Step 2: establish the setPlayerMoves function

function setPlayerMoves(player, m1t, m1v, m2t, m2v, m3t, m3v){
    if(!(m1t === undefined || m2t === undefined || m3t === undefined || m1v === undefined || m2v === undefined || m3v === undefined)){
        if(!(moves.indexOf(m1t)<0 || moves.indexOf(m2t)<0 || moves.indexOf(m3t)<0)){
            if(!(m1v<1 || m2v<1 || m3v<1)){
                if(!(m1v>99 || m2v>99 || m3v>99)){
                    if(!(m1v+m2v+m3v>99)){
                        if(player == 'Player One'){
                            playerOneMoveOneType = m1t;
                            playerOneMoveOneValue = m1v;
                            playerOneMoveTwoType = m2t;
                            playerOneMoveTwoValue = m2v;
                            playerOneMoveThreeType = m3t;
                            playerOneMoveThreeValue = m3v;
                        }
                        if(player == 'Player Two'){
                            playerTwoMoveOneType = m1t;
                            playerTwoMoveOneValue = m1v;
                            playerTwoMoveTwoType = m2t;
                            playerTwoMoveTwoValue = m2v;
                            playerTwoMoveThreeType = m3t;
                            playerTwoMoveThreeValue = m3v;
                        };
                    }
                    else{
                        console.log("wrong data");
                    }
                };
            };
        };
    };
};

//Step 3: establish the getRoundWinner function
//In order to make the function a bit less complicated and the code more organized, i wrote the bulk of the checking process in other functions

function getRoundWinner(n){
    switch(n){
        case 1:
            return winningMove(playerOneMoveOneType, playerOneMoveOneValue, playerTwoMoveOneType, playerTwoMoveOneValue);
        case 2:
            return winningMove(playerOneMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoType, playerTwoMoveTwoValue);
        case 3:
            return winningMove(playerOneMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeType, playerTwoMoveThreeValue);
        default:
            return null;
    }
}

//Step 4: getGameWinner

function getGameWinner(){
    var p1=0;
    var p2=0;
    var none=0;

    for(var i=1;i<=3;i++){
        var winner = getRoundWinner(i);
        switch(winner){
            case 'Player One':
                p1++;
                break;
            case 'Player Two':
                p2++;
                break;
            case 'Tie':
                continue;
            default:
                none++;
                break;
        }
    }

    if(none>0){
        return null;
    }

    if(p1>p2){
        return 'Player One';
    }
    if(p2>p1){
        return 'Player Two';
    }
    return 'Tie';
}

//Step 5: computer moves

function setComputerMoves(){
    var m1t = moves[random(3)];
    var m2t = moves[random(3)];
    var m3t = moves[random(3)];

    var m1v = random(98) + 1;
    var m2v = random(98) + 1;
    var m3v = random(98) + 1;

    var sum = m1v+m2v+m3v;
    var values = [m1v, m2v, m3v];

    while(sum != 99){
        if(sum>99){
            var dif = sum-99;  //this is how much we need to get rid of
            var index = random(3);    //we select a random number to reduce
            var redux = random(dif) + 1;  //we select a random quantity to reduce
            var dif2 = values[index] - redux //we make the reduction
            if(dif2<1){
                sum = sum - values[index] + 1;
                values[index] = 1; //since we can't have - numbers if val is 4 and redux is 6 we set val to 1 and redux only 4
            }
            else{
                sum = sum - redux;
                values[index] = dif2;
            }
        }
        if(sum<99){
            var dif = 99-sum;  //this is how much we need to add
            var index = random(3);    //we select a random number to add
            var addon = random(dif) + 1; //we select a random quantity to add
            var dif2 = values[index] + addon //we make the addition
            if(dif2>99){
                sum = sum - 99 + values[index];
                values[index] = 99; //since we can't have >99 numbers if val is 90 and addon is 20 we set val to 99 and addon only 9
            }
            else{
                sum = sum + addon;
                values[index] = dif2;
            }
        }
    }
    setPlayerMoves('Player Two', m1t, values[0], m2t, values[1], m3t, values[2]);
}
