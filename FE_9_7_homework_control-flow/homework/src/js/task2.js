const rules = {
    prizeMult: 3,
    rangeMult: 2,
    totalAtts: 3
};
Object.freeze(rules);

const gameInfo = {
    prize: 10,
    maxRangeVal: 5,
    totalPrize: 0
};

const info = (maxRangNum, attsLeft, totalPrize, possPrizeCurrAtt) => `
	Enter a number from 0 to ${maxRangNum}
	Attempts left: ${attsLeft}
	Total prize: ${totalPrize}$
	Possible prize on current attempt: ${possPrizeCurrAtt}$`;

function getrandNum(maxRangNum) {
    return Math.floor(Math.random() * ++maxRangNum);
}

let isGameOn = false;

if(confirm('Do you want to play a game?')){
    do {
        isGameOn = false;

        const randNum = getrandNum(gameInfo.maxRangeVal);

        for(
            let currAtt = 0, possPrizeCurrAtt = gameInfo.prize;
            currAtt < rules.totalAtts;
            currAtt++, possPrizeCurrAtt = Math.floor(possPrizeCurrAtt / 2)
        ) {
            const userInput = +prompt(
                info(
                    gameInfo.maxRangeVal,
                    rules.totalAtts - currAtt,
                    gameInfo.totalPrize,
                    possPrizeCurrAtt
                )
            );

            if (userInput === randNum) {
                gameInfo.totalPrize += possPrizeCurrAtt;
                if(confirm(`
                    Congratulation! Your prize is: ${gameInfo.totalPrize}$ 
                    Do you want to continue?`)
                ) {
                    gameInfo.prize *= rules.prizeMult;
                    gameInfo.maxRangeVal *= rules.rangeMult;
                    isGameOn = true;
                    break;
                }

            } else if (currAtt === rules.totalAtts) {
                alert(`Thank you for a game. Your prize is: ${gameInfo.totalPrize}$`);
            }
        }
    } while (isGameOn);
}else{
    alert('You did not become a millionaire, but can.');
}