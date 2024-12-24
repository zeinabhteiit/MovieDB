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
    const now = new Date();  //gets the curr data and time
    const time = `${now.getHours()}:${now.getMinutes()} `; // formats time as hh:mm
    res.json({ status: 200, message: time }); // responds with curr time
});

app.get('/hello/:id?', (req, res) => { //hello /id
    const id = req.params.id || ''; // 
    res.json({ status: 200, message:` Hello, ${id}` });
}); // responds with hello .id. , if no id hello,


app.get('/search', (req, res) => {  //search
    const searchQuery = req.query.s; // Extract query parameter 's'
    if (searchQuery) {
        res.json({ status: 200, message: 'ok', data: searchQuery }); // if s is provided ,respond with its value
    } else {
        res.status(500).json({
            status: 500,
            error: true,
            message: 'you have to provide a search',
        }); // if s is missing ,respond with an error
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

    if (movie) { // if movie exists , respond with its details
        res.status(200).json({ status: 200, data: movie });
    } else { // if movie doesnt exist, respond with a 404 error
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

app.get('/movies/delete/:id', (req, res) => {
    const movieId = parseInt(req.params.id); // Extract the ID from the URL
    const movieIndex = movies.findIndex((m) => m.id === movieId); // Find the index of the movie with the given ID

    if (movieIndex !== -1) {
        // Movie exists, delete it
        movies.splice(movieIndex, 1); // Remove the movie from the array
        res.status(200).json({
            status: 200,
            data: movies, // Return the updated list of movies
        });
    } else {
        // Movie with the given ID does not exist
        res.status(404).json({
            status: 404,
            error: true,
            message:` The movie ${movieId} does not exist` ,
        });
    }
});


// Route /movies/read/by-date
app.get('/movies/read/by-date', (req, res) => {
    const moviesByDate = [...movies].sort((a, b) => a.year - b.year); //sorts year by ascending order
    res.json({ status: 200, data: moviesByDate }); //responds with sorted movie list
});

app.get('/movies/read/by-rating', (req, res) => {
    const moviesByRating = [...movies].sort((a, b) => b.rating - a.rating); //sorts by rating order
    res.json({ status: 200, data: moviesByRating }); 
});

app.get('/movies/read/by-title', (req, res) => {
    const moviesByTitle = [...movies].sort((a, b) => a.title.localeCompare(b.title)); //alphabetically by title
    res.json({ status: 200, data: moviesByTitle });
});

//step 8
// Route: /movies/add
app.get('/movies/add', (req, res) => {
    const { title, year, rating } = req.query;
 // Validation checks
 if (!title || !year || isNaN(year) || year.length !== 4) {
     return res.status(403).json({
         status: 403,
         error: true,
         message: 'You cannot create a movie without providing a title and a valid year'
         });
    }
 // Default rating if not provided
   const newRating = rating ? parseFloat(rating) : 4;
// Create new movie
    const newMovie = {
        id: movies.length + 1, // Auto-generate ID
        title,
        year: parseInt(year),
        rating: newRating
    };
 // Add new movie to the array
    movies.push(newMovie);
// Respond with the updated movies list
    res.status(200).json({ status: 200, data: movies });
})


