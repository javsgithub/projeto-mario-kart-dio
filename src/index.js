const player01 = {
    name: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
}

const player02 = {
    name: "Luigi",
    velocidade: 3,
    manobrabilidade: 3,
    poder: 4,
    pontos: 0
}

async function rollDice() {
    return Math.floor(Math.random() * 6 + 1);
}

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA"            
            break;
        case random < 0.66:
            result = "CURVA"
            break;   
        default:
            result = "CONFRONTO"
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
                character01.pontos++;
            } else if (totalTestSkill02 > totalTestSkill01) {
                console.log(`${character02.name} marcou 1 ponto!`);
                character02.pontos++;
            } else if (totalTestSkill01 === totalTestSkill02) {
                console.log("Empate: nenhum ponto foi marcado nesta rodada!");
            }
        }

        if (block === "RETA") {
            totalTestSkill01 = diceResult01 + character01.velocidade
            totalTestSkill02 = diceResult02 + character02.velocidade

            await logRollResult(character01.name, "velocidade", diceResult01, character01.velocidade);
            await logRollResult(character02.name, "velocidade", diceResult02, character02.velocidade);

            checkBlockWinner();
        }
    
        if (block === "CURVA") {
            totalTestSkill01 = diceResult01 + character01.manobrabilidade
            totalTestSkill02 = diceResult02 + character02.manobrabilidade

            await logRollResult(character01.name, "manobrabilidade", diceResult01, character01.manobrabilidade);
            await logRollResult(character02.name, "manobrabilidade", diceResult02, character02.manobrabilidade);
            
            checkBlockWinner();
        }
    
        if (block === "CONFRONTO") {
            
            let powerResult01 = diceResult01 + character01.poder
            let powerResult02 = diceResult02 + character02.poder
            let surpriseElement = await getSurpriseElement()

            console.log(`${character01.name} confrontou ${character02.name}! 🥊`);
            console.log("Se elemento supresa = 🐢 (casco) -> perdedor perde 1 ponto")
            console.log("Se elemento supresa = 💣 (bomba) -> perdedor perde 2 pontos")

            await logRollResult(character01.name, "poder", diceResult01, character01.poder);
            await logRollResult(character02.name, "poder", diceResult02, character02.poder);

            console.log(`Elemento supresa: ${surpriseElement}`);

            //verificando o vencedor do confronto
            if (powerResult01 > powerResult02) {
                if (character02.pontos > 0 && surpriseElement === "casco!") {
                    console.log(`${character01.name} venceu o confronto e ganhou bônus de 1 ponto! ${character02.name} perdeu 1 ponto! 🐢`);
                    character01.pontos++;
                    character02.pontos--;
                } else if (character02.pontos > 1 && surpriseElement === "bomba!") {
                    console.log(`${character01.name} venceu o confronto e ganhou bônus de 1 ponto! ${character02.name} perdeu 2 pontos! 🐢`);
                    character01.pontos++;
                    character02.pontos -= 2;
                } else if (character02.pontos === 0) {
                    console.log(`${character01.name} venceu o confronto e ganhou bônus de 1 ponto! Contudo, ${character02.name} não tem pontos para perder! 🐢`);
                    character01.pontos++;
                }            
            }

            if (powerResult02 > powerResult01) {
                if (character01.pontos > 0 && surpriseElement === "casco!") {
                    console.log(`${character02.name} venceu o confronto e ganhou bônus de 1 ponto! ${character01.name} perdeu um ponto! 🐢`);
                    character02.pontos++;
                    character01.pontos--;
                }else if (character01.pontos > 1 && surpriseElement === "bomba!") {
                    console.log(`${character02.name} venceu o confronto e ganhou bônus de 1 ponto! ${character01.name} perdeu 2 pontos! 🐢`);
                    character02.pontos++;
                    character01.pontos -= 2;
                }else if (character01.pontos === 0) {
                    console.log(`${character02.name} venceu o confronto e ganhou bônus de 1 ponto! Contudo, ${character01.name} não tem pontos para perder! 🐢`);
                    character02.pontos++;
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
    console.log(`${character01.name}: ${character01.pontos} ponto(s)`);
    console.log(`${character02.name}: ${character02.pontos} ponto(s)`);

    if (character01.pontos > character02.pontos) // quando tenho vários ifs concatenados, posso excluir os blocos "{}" que os encapsulam.
        console.log(`\n${character01.name} venceu a corrida, parabéns! 🏆`);
    else if (character02.pontos > character01.pontos)
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