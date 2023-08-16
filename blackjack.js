function deckFactory () {
    return {
        getRandomCard () {
            const index = Math.floor(Math.random() * this.cards.length)

            return this.cards[index]
        },
        getCardValue (card) {
            let value = ''

            for (let index = 0; index < card.length; index++) {
                const element = card[index];

                if (!isNaN(element)) {
                    value += element
                }
                
            }

            return parseInt(value)
        },

        removeCard (oldCard) {
            for (let i = 0; i < this.cards.length; i++) {
                const card = this.cards[i];

                if (card === oldCard) {
                    this.cards.splice(i, 1)
                }
                
            }
        },
         cards: [
            '2C',
            '3C',
            '4C',
            '5C',
            '6C',
            '7C',
            '8C',
            '9C',
            '10C',           
            '2D',
            '3D',
            '4D',
            '5D',
            '6D',
            '7D',
            '8D',
            '9D',
            '10D',          
            '2S',
            '3S',
            '4S',
            '5S',
            '6S',
            '7S',
            '8S',
            '9S',
            '10S',          
            '2H',
            '3H',
            '4H',
            '5H',
            '6H',
            '7H',
            '8H',
            '9H',
            '10H',
         ]
    }
}

function playerFactory (name) {

    return {
        id: 'player-' + String(Math.random()).substring(2),
        name,
        score: 0,
        card: '',
        reset () {
            this.card = ''
            this.score = 0
        },
        updateScore (score) {
            this.score = this.score + score
        },      
        display () {
            playerName.textContent = this.name
            playerScore.textContent = 'score: ' + this.score
            playerCard.textContent = 'card: ' + this.card
        }
    }
}

function blackjack () {
    return {
        deck: deckFactory(),
        players: [],
        currentPlayer: 0,
        activePlayers: [],
        hasCards () {
            return !!deck.cards.length
        },
        addPlayer (name) {
            const newPlayer = playerFactory(name)
            this.players.push(newPlayer)
            this.activePlayers.push(this.players.length -1)
        },
        getPlayer () {
            return this.players[this.currentPlayer]
        },
        startGame () {
            this.currentPlayer = Math.floor(Math.random() * this.activePlayers.length)
        },
        endGame () {
            //...
        },
        restartGame () {
            for (let i = 0; i < this.players.length; i++) {
                const player = this.players[i];

                player.reset()
            }

            for (let i = 0; i < players.length; i++) {
                activePlayers.push(i)
           }

            this.deck = deckFactory()
            this.currentPlayer = 0
        },
        endTurn () {
            if (this.currentPlayer < this.activePlayers.length - 1) {
              return  ++ this.currentPlayer
            } else {
                this.currentPlayer = 0
            }
            
        },

        drawCard () {
         const player = this.getPlayer()
         // get card from deck
         const card = deck.getRandomCard()
         // get card value
         const cardValue = deck.getCardValue(card)
         //update player score
         player.updateScore(cardValue)
         player.card = card
         // remove card from deck
         deck.removeCard(card)
         // change player
         this.endTurn()

         return {
            card,
            cardValue
         }
        },
        hold () {
            const currentPlayer = this.getPlayer()

            for (let i = 0; i < this.players.length; i++) {
                const player = players[i];
                    // find player with the same name
                if (currentPlayer.name === player.name) {
                    const index = this.activePlayers.indexOf(i)
                    // remove active player
                    this.activePlayers.splice(index, 1)
                }   
            }
        },
    }
}
function tableFactory () {
        return {
            pickCardEvent (player, score, card) {
                pickCardBtn.addEventListener('click', () => {
                    if (game.hasCards()) {
                        game.drawCard()
                    } else {
                        pickCardBtn.disabled = true
                    }
                    // display players score                  
                    playerScore = 'score: ' + player.score
                    
                    // display players card
                    playerCard = 'card: ' + player.card
                    
                })
            }
        }
}

//     const playerName = document.createElement('h2')
//     const playerScore = document.createElement('p')
//     const playerCard = document.createElement('p')
//     const playerWinCondition = document.createElement('p')
//     // append elements here
//     document.body.append(playerName, playerScore, playerCard, playerWinCondition)

//             //buttons
//         const pickCardBtn = document.createElement('button')
//         const holdBtn = document.createElement('button')
//         const restartBtn = document.createElement('button')
//         document.body.append(pickCardBtn, holdBtn, restartBtn)
//         pickCardBtn.textContent = 'Pick a card'
//         holdBtn.textContent = 'Hold'
//         restartBtn.textContent = 'Restart Game'

// table.pickCardEvent(player, score, card)


let deck = deckFactory()
let player1 = playerFactory('Tom')
let player2 = playerFactory('Edward')
let game = blackjack([player1, player2])
let people = playerFactory()
let table = tableFactory()

module.exports = {
    deckFactory,
    blackjack,
    playerFactory
}