const express = require('express')
const bodyParser = require('body-parser');
const { enrichZips } = require('./libs/enrich');

const port = process.env.PORT || 3000
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

process.on('unhandledRejection', err => {
    console.log("Caught unhandledRejection");
    console.log(err);
});

app.post('/api/enrich/zips', async (req, res) => {
    let params = JSON.parse(req.body.params);
    let postalCodes = params.postalCodes;
    let collections = params.collections;
    let clientId = params.clientId;
    let clientSecret = params.clientSecret;
    let result = await enrichZips(postalCodes, collections, clientId, clientSecret);
    res.json(result)
})

app.get('/api/example', (req, res) => {
    res.send('<h1>example</h1>')
    res.end()
})

app.use(express.static('src/public', {
    index: "index.html"
}))

app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready On Server http://localhost:${port}`)
})