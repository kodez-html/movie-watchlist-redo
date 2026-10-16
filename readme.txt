Movie Watchlist

GitHub Repository: https://github.com/kodez-html/movie-watchlist-redo.git
My Movie Watchlist is a webpage built using HTML, CSS, and JavaScript. It allows users to add movies by entering a title and selecting a genre. Each movie is stored as an object containing a title, genre, and Boolean watched property.

The watchlist uses an array to store movie objects. JavaScript methods allow users to mark movies as watched or unwatched and remove movies from the list. The page uses renderMovies() to display the movie cards and update the empty-list message.

The application saves the movie array in browser localStorage using JSON.stringify() and loads it using JSON.parse(). This allows the watchlist and watched statuses to remain available after refreshing the page. If no saved data exists, the watchlist starts empty.
