
const express = require('express');
const router = require('./members/members');
const app = express();
const port = 3000
app.use(express.json());
app.set('view engine','pug');
app.set('views','./views');

app.use('/members',router);





//process.env.Node_ENV

app.listen(port, () => console.log(`Example app listening on port ${port}!`))