const express = require('express');
const os = require('os');
const bodyParser = require('body-parser')
const db = require('./dao')
const svc = require('./svc')

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/balanceItems', db.getBalanceItems)
app.post('/api/balanceItems', db.createBalanceItem)
app.get('/api/net', db.getNet)
app.get('/api/assetTotal', db.getAssetTotal)
app.get('/api/liabilityTotal', db.getLiabilityTotal)
app.delete('/api/balanceItem/:id', db.deleteBalanceItem)


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
