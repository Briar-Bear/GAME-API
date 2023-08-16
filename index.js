// all the view functions, make in a seperate directory (in the vite directory)

const express = require('express');
const blackjack = require('./blackjack.js')
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


let deck
const players = []

function generateId() {
   return Math.floor(Math.random() * 100)
}

const rooms = {}

function getRoomId () {
    let id = generateId()
    let keepLooking = true

    while (keepLooking) {
        if (!rooms[id]) {
            return id
        } else {
            id = generateId()
        }
    }
}



/// endpoint to create a room
app.get('/room/create', function(request, response) {
    const roomId = getRoomId()
    rooms[roomId] = blackjack.blackjack([])
    response.send({roomId})

    
})

// endpoint to get players to join the room
app.post('/room/join', function(request, response) {
    const game = rooms[request.body.roomId]
    
    
    game.addPlayer(request.body.playerName)

    response.sendStatus(201)
})

// endpoint to get players to start the game
app.post('/room/start', function(request, response) {
    const game = rooms[request.body.roomId]

    game.startGame()

    response.send({currentPlayer: game.currentPlayer})
})

// endpoint to get cards from the card api
app.get('/room/:id/card/draw', (request, response) => {
    const game = rooms[request.params.id]
    const card = game.drawCard()
    const player = game.getPlayer()


    response.send({card, player})
});

// endpoint to get players
app.get('/room/:id/players', function (request, response) {
    const game = rooms[request.params.id]
    response.send(game.players)
})

// home player score
app.get('/room/:id/player/score/:playerId', function (request, response) {
    const game = rooms[request.params.id]
    response.send(`${game.players[request.params.playerId].score}`)
})

// end point to hold
app.get('/room/:id/player/hold', (request, response) => {
    const game = rooms[request.params.id]
    game.hold()

    response.send({player: game.getPlayer()})
})

// end point to reset game
app.get('/room/:id/restart', (request, response) => {
    const game = rooms[request.params.id]
    game.restartGame()

    response.send({player: game.getPlayer()})
})

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));