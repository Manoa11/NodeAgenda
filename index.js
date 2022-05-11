const express = require('express');
const fetch = require('node-fetch');
const app = express();
// require('./models/dbConfig');
// const postsRoutes = require('./routes/postsController');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');

// mongoose.set('useFindAndModify', false);

// app.use(bodyParser.json());
// app.use(cors());
// app.use('/posts', postsRoutes);


async function fetchSort() {
    return await fetch("https://api.openagenda.com/v2/agendas/35589352/events?oaq%5Bpassed%5D=1&key=09bde54b6c0144ba9bcd2c754e73d804")
    .then(res => res.json())
    .then(json => {
            // console.log("aty ////////////////////////////////",json)
            const dataJson = json.events
            dataJson.sort(function (a, b) {
                var dateA = new Date(a.lastTiming.begin), dateB = new Date(b.lastTiming.begin)
                return dateA - dateB
                });
                
            // console.log("****************************************",dataJson)
            return dataJson
        }
    );
}

async function getData() {
    return await fetch("https://api.openagenda.com/v2/agendas/35589352/events?oaq%5Bpassed%5D=1&key=09bde54b6c0144ba9bcd2c754e73d804")
    .then(res => res.json())
    .then(json => { return json } );
}







app.get('/evenementTriDate', (req,res) => {
    // console.log(data)
    fetchSort().then(data => res.status(200).json(data))
})

app.get('/evenement', (req,res) => {
    // console.log(data)
    getData().then(data => res.status(200).json(data))
})

// app.get('/triDate', (req,res) => {
//     res.send("Liste des evenment trié par date")
// })

app.get('/evenementTriAutor', (req,res) => {
    res.send("Liste des evenment trié par Auteur")
})

app.listen(8080, () => console.log('Server started: 8080'));