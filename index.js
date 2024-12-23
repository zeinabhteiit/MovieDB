const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('ok');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/test', (req, res) => { //TEST
    res.json({ status: 200, message: 'ok' });
});

app.get('/time', (req, res) => { //TIME
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()} `;
    res.json({ status: 200, message: time });
});
