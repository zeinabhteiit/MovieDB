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

app.get('/hello/:id?', (req, res) => { //hello /id
    const id = req.params.id || ''; // Optional ID
    res.json({ status: 200, message:` Hello, ${id}` });
});


app.get('/search', (req, res) => {  //search
    const searchQuery = req.query.s; // Extract query parameter 's'
    if (searchQuery) {
        res.json({ status: 200, message: 'ok', data: searchQuery });
    } else {
        res.status(500).json({
            status: 500,
            error: true,
            message: 'you have to provide a search',
        });
    }
});
