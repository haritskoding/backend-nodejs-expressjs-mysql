const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'))

//panggil routes
const routes = require('./router');
routes(app)

//daftarkan menu routes dari index
app.use('/auth', require('./middleware'))

app.listen(8080, () => {
    console.log(`Server start on port 8080`);
});