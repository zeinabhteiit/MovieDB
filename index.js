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

const movies = [   // movie array
    { id: 1, title: 'Jaws', year: 1975, rating: 8 },
    { id: 2, title: 'Avatar', year: 2009, rating: 7.8 },
    { id: 3, title: 'Brazil', year: 1985, rating: 8 },
    { id: 4, title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];

// crud routes // movies/create
app.get('/movies/create', (req, res) => { 
    res.json({ status: 200, message: "Movies create route" });
});

app.get('/movies/read/id/:id', (req, res) => {
    const movieId = parseInt(req.params.id);  //extracts id from url
    const movie = movies.find((m) => m.id === movieId); // find movie by id

    if (movie) {
        res.status(200).json({ status: 200, data: movie });
    } else { // if movie does not exist
        res.status(404).json({
            status: 404,
            error: true,
            message: `The movie ${movieId} does not exist`
        });
    }
});

app.get('/movies/update', (req, res) => {
    res.json({ status: 200, message: "Movies update route" });
});

app.get('/movies/delete', (req, res) => {
    res.json({ status: 200, message: "Movies delete route" });
});

// Route: /movies/read/by-date
app.get('/movies/read/by-date', (req, res) => {
    const moviesByDate = [...movies].sort((a, b) => a.year - b.year);
    res.json({ status: 200, data: moviesByDate });
});

app.get('/movies/read/by-rating', (req, res) => {
    const moviesByRating = [...movies].sort((a, b) => b.rating - a.rating);
    res.json({ status: 200, data: moviesByRating });
});

app.get('/movies/read/by-title', (req, res) => {
    const moviesByTitle = [...movies].sort((a, b) => a.title.localeCompare(b.title));
    res.json({ status: 200, data: moviesByTitle });
});

