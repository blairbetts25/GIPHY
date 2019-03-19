$(document).ready(function () {
    // my starting movies
    var movies = ["Deadpool", "Star Wars", "Avengers", "Major League", "Harry Potter", "How To Train Your Dragon"];





    // function to create a still giph from button click
    function displayMovieInfo() {
        // Grabbing and storing the ID from the button
        var film = $(this).attr("id");

        // Constructing a queryURL using the movie name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            film + "&api_key=dc6zaTOxFJmzC&limit=10&";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function (response) {
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var movieDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var movieimageRating = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var movieImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    movieImage.attr("src", results[i].images.original_still.url);
                    movieImage.attr("data-still", results[i].images.original_still.url)
                    movieImage.attr("data-animate", results[i].images.original.url)
                    movieImage.attr("class", "gif")
                    movieImage.attr("data-state", "still");

                    // Appending the paragraph and image tag to the movieDiv
                    movieDiv.append(movieimageRating);
                    movieDiv.append(movieImage);

                    // Prependng the movieDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(movieDiv);

                }

                // function to animate and stop the giphys

            });
    };
    function gifsAnimate() {

        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        
    };
    // creates the buttons for the movies to appear on the screen
    function createMovies() {
        $("#movie-button-display").empty();
        // for loop to run through movie array and make buttons
        for (var i = 0; i < movies.length; i++) {
            var movieButtons = $("<button>");
            movieButtons.text(movies[i]);
            // gives the new button an ID equal to the index string of the array
            movieButtons.attr("id", movies[i]);
            movieButtons.attr("class", "allMovieButtons")
            $("#movie-button-display").append(movieButtons);
        }

    }
function reset(){
    $("#gifs-appear-here").empty();
}
    // function for the user to type in a movie and add it to the movies array
    $("#add-movie").on("click", function () {
        // keeps the items on the screen and not do its default coding which is to get ride of the buttons
        event.preventDefault();
        // // // getting the vaule from what the user typed
        var addMovie = $("#newMovie").val().trim();
        // // // takes the value that we got from the user and pushes it into the movies array so a button can be created
        movies.push(addMovie);
        // // // run our button function so that the new button can be seen
        createMovies();
        // // clear the text un the imput box
        $("#newMovie").val("");

    });
    $(document).on("click", ".allMovieButtons", displayMovieInfo);
    $(document).on("click", ".gif", gifsAnimate);
    $(document).on("click", "#reset", reset);
    createMovies();


});


