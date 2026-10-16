
const form = document.getElementById("movie-form");
const titleInput = document.getElementById("movie-title");
const genreSelect = document.getElementById("movie-genre");
const message = document.getElementById("form-message");
const movieList = document.getElementById("movie-list");
const emptyMessage = document.getElementById("empty-message");


const watchlist = {
    movies: [],

    toggleWatched(index) {
        // Flip the watched status.
        this.movies[index].watched = !this.movies[index].watched;

        // Save and redraw the list.
        saveMovies();
        renderMovies();
    },

    removeMovie(index) {
        // Remove only the selected movie.
        this.movies.splice(index, 1);

        // Save and redraw the list.
        saveMovies();
        renderMovies();
    }
};


function saveMovies() {
    localStorage.setItem(
        "watchlist.movies",
        JSON.stringify(watchlist.movies)
    );
}


function loadMovies() {
    try {
        const savedMovies = localStorage.getItem("watchlist.movies");

        // No saved watchlist? Start with an empty array.
        if (savedMovies === null) {
            watchlist.movies = [];
            return;
        }

        // Convert the saved text back into an array.
        const parsedMovies = JSON.parse(savedMovies);

        // Make sure the saved data is an array.
        if (!Array.isArray(parsedMovies)) {
            watchlist.movies = [];
            return;
        }

        watchlist.movies = parsedMovies;
    } catch (error) {
        // Handle invalid or unreadable saved data.
        console.error("Could not load the watchlist:", error);
        watchlist.movies = [];
    }
}


function renderMovies() {
    // Clear the old cards before drawing the list again.
    movieList.replaceChildren();

    // Show the empty-list message only when there are no movies.
    emptyMessage.hidden = watchlist.movies.length > 0;

    // Create one card for each movie.
    watchlist.movies.forEach((movie, index) => {
        const card = document.createElement("li");
        card.className = "movie-card";

        // Movie title
        const title = document.createElement("h3");
        title.textContent = movie.title;

        // Movie genre and watched status
        const details = document.createElement("p");
        const status = movie.watched ? "Watched" : "Not watched";
        details.textContent = `${movie.genre} · ${status}`;

        // Watched-status button
        const watchedButton = document.createElement("button");
        watchedButton.type = "button";
        watchedButton.textContent = movie.watched
            ? "Mark Unwatched"
            : "Mark Watched";

        // Remove button
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";

        // Add the elements to the card.
        card.append(title, details, watchedButton, removeButton);

        // Add the card to the movie list.
        movieList.appendChild(card);


        watchedButton.addEventListener("click", () => {
            watchlist.toggleWatched(index);
        });

        removeButton.addEventListener("click", () => {
            watchlist.removeMovie(index);
        });

    });
}



form.addEventListener("submit", (event) => {
    // Stop the page from reloading.
    event.preventDefault();

    // Get the title and genre from the form.
    const title = titleInput.value.trim();
    const genre = genreSelect.value;

    // Check whether the title is blank.
    if (title === "") {
        message.textContent = "Enter a movie title.";
        titleInput.focus();
        return;
    }

    // Check whether a genre was selected.
    if (genre === "") {
        message.textContent = "Choose a genre.";
        genreSelect.focus();
        return;
    }

    // Create a new movie object.
    const movie = {
        title: title,
        genre: genre,
        watched: false
    };

    // Add the movie to the array.
    watchlist.movies.push(movie);

    // Save the list and update the page.
    saveMovies();
    renderMovies();

    // Clear the form and any previous error message.
    form.reset();
    message.textContent = "";
    titleInput.focus();
});


loadMovies();
renderMovies();
