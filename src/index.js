const player01 = {
    name: "Mario",
    speed: 4,
    maneuverability: 3,
    power: 3,
    score: 0
}

const player02 = {
    name: "Luigi",
    speed: 3,
    maneuverability: 3,
    power: 4,
    score: 0
}

async function rollDice() {
    return Math.floor(Math.random() * 6 + 1);
}

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "STRAIGHT-LINE"            
            break;
        case random < 0.66:
            result = "CURVE"
            break;   
        default:
            result = "FIGHT"
    }
    return result;
}

async function getSurpriseElement() {
            let random = Math.random();
            let surpriseElement = random < 0.5? "casco!": "bomba!";
            return surpriseElement;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}


async function playRaceEngine(character01, character02) {
    for (let round = 1; round <= 5; round++) {

        console.log(`🏁 Rodada ${round}`)
        //sortear block
        let block = await getRandomBlock();  
        console.log(`Bloco: ${block}`)
        //rolar os dados
        let diceResult01 = await rollDice();
        let diceResult02 = await rollDice();
        //teste de habilidade
        let totalTestSkill01 = 0;
        let totalTestSkill02 = 0;

        //verificando o vencedor do bloco
        function checkBlockWinner() {
            if (totalTestSkill01 > totalTestSkill02) {
                console.log(`${character01.name} marcou 1 ponto!"`);
                character01.score++;
            } else if (totalTestSkill02 > totalTestSkill01) {
                console.log(`${character02.name} marcou 1 ponto!`);
                character02.score++;
            } else if (totalTestSkill01 === totalTestSkill02) {
                console.log("Empate: nenhum ponto foi marcado nesta rodada!");
            }
        }

        if (block === "STRAIGHT-LINE") {
            totalTestSkill01 = diceResult01 + character01.speed
            totalTestSkill02 = diceResult02 + character02.speed

            await logRollResult(character01.name, "velocidade", diceResult01, character01.speed);
            await logRollResult(character02.name, "velocidade", diceResult02, character02.speed);

            checkBlockWinner();
        }
    
        if (block === "CURVE") {
            totalTestSkill01 = diceResult01 + character01.maneuverability
            totalTestSkill02 = diceResult02 + character02.maneuverability

            await logRollResult(character01.name, "manobrabilidade", diceResult01, character01.maneuverability);
            await logRollResult(character02.name, "manobrabilidade", diceResult02, character02.maneuverability);
            
            checkBlockWinner();
        }
    
        if (block === "FIGHT") {
            
            let powerResult01 = diceResult01 + character01.power
            let powerResult02 = diceResult02 + character02.power
            let surpriseElement = await getSurpriseElement()

            console.log(`${character01.name} confrontou ${character02.name}! 🥊`);
            console.log("Se elemento supresa = 🐢 (casco) -> perdedor perde 1 ponto")
            console.log("Se elemento supresa = 💣 (bomba) -> perdedor perde 2 pontos")

            await logRollResult(character01.name, "poder", diceResult01, character01.power);
            await logRollResult(character02.name, "poder", diceResult02, character02.power);

            console.log(`Elemento supresa: ${surpriseElement}`);

            //verificando o vencedor do confronto
            if (powerResult01 > powerResult02) {
                if (character02.score > 0 && surpriseElement === "casco!") {
                    console.log(`${character01.name} venceu o confronto e ganhou bônus de 1 ponto! ${character02.name} perdeu 1 ponto! 🐢`);
                    character01.score++;
                    character02.score--;
                } else if (character02.score > 1 && surpriseElement === "bomba!") {
                    console.log(`${character01.name} venceu o confronto e ganhou bônus de 1 ponto! ${character02.name} perdeu 2 pontos! 🐢`);
                    character01.score++;
                    character02.score -= 2;
                } else if (character02.score === 0) {
                    console.log(`${character01.name} venceu o confronto e ganhou bônus de 1 ponto! Contudo, ${character02.name} não tem pontos para perder! 🐢`);
                    character01.score++;
                }            
            }

            if (powerResult02 > powerResult01) {
                if (character01.score > 0 && surpriseElement === "casco!") {
                    console.log(`${character02.name} venceu o confronto e ganhou bônus de 1 ponto! ${character01.name} perdeu um ponto! 🐢`);
                    character02.score++;
                    character01.score--;
                }else if (character01.score > 1 && surpriseElement === "bomba!") {
                    console.log(`${character02.name} venceu o confronto e ganhou bônus de 1 ponto! ${character01.name} perdeu 2 pontos! 🐢`);
                    character02.score++;
                    character01.score -= 2;
                }else if (character01.score === 0) {
                    console.log(`${character02.name} venceu o confronto e ganhou bônus de 1 ponto! Contudo, ${character01.name} não tem pontos para perder! 🐢`);
                    character02.score++;
                }
            }

            if (powerResult01 === powerResult02) {
                console.log("Confronto empatado! Nenhum ponto foi perdido!");
            }
        }
        

        console.log("__________________________________")
    }
}

//declarando o vencedor da corrida
async function declareWinner (character01, character02) {
    console.log("Resultado final:");
    console.log(`${character01.name}: ${character01.score} ponto(s)`);
    console.log(`${character02.name}: ${character02.score} ponto(s)`);

    if (character01.score > character02.score)
        console.log(`\n${character01.name} venceu a corrida, parabéns! 🏆`);
    else if (character02.score > character01.score)
        console.log(`\n${character02.name} venceu a corrida, parabéns! 🏆`);
    else
        console.log("A corrida terminou empatada! Nenhum vencedor!");
    
}

//função principal que inicia a corrida
(async function main () {
    console.log(`🏁🚨 Corrida emtre ${player01.name} e ${player02.name} começando... \n`);
    await playRaceEngine(player01, player02);
    declareWinner(player01, player02);
}
)();