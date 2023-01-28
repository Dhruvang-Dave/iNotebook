const express = require('express');
const mongoose = require("mongoose");
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook';

async function main() {
    //Instead of '127.0.0.1' , 'localhost' is not working
    await mongoose.connect(mongoURI);
}
main().catch(err => console.log(err));
const app = express()
const port = 5000

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})