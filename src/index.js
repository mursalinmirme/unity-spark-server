const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Unity spark server is running...")
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})