const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res) => {
    res.send('whild Whirl');
})

app.listen(PORT,() => {
    console.log(`the server listening to ${PORT}`);
})