const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//panggil routes
const routes = require('./router');
routes(app)

app.listen(8080, () => {
    console.log(`Server start on port 8080`);
});