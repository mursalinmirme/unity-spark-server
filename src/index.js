const express = require('express');
const dbConnect = require('./db/dbConnect');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Unity spark server is running...")
})





app.listen(port, async () => {
    console.log(`The server is running on port ${port}`);
    await dbConnect();
})