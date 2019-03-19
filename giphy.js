$(document).ready(function () {
    // my starting videoGames
    var videoGames = ["Madden", "NBA 2k", "Call of Duty Black Opps", "Fortnite", "Halo", "Sonic The Hedgehog", "Minecraft", "Super Smash Bros"];





    // function to create a still giph from button click
    function displayvideoGameInfo() {
        // Grabbing and storing the ID from the button
        var film = $(this).attr("id");

        // Constructing a queryURL using the videoGame name
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
                    var videoGameDiv = $("<div>");
                    videoGameDiv. attr("class", "new-entry")
                    // Creating and storing an image tag
                    var videoGameImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    videoGameImage.attr("src", results[i].images.original_still.url);
                    videoGameImage.attr("data-still", results[i].images.original_still.url)
                    videoGameImage.attr("data-animate", results[i].images.original.url)
                    videoGameImage.attr("class", "gif")
                    videoGameImage.attr("data-state", "still");
                    // Creating a paragraph tag with the result item's rating
                    var videoGameimageRating = $("<p>").text("Rating: " + results[i].rating);

                    // Appending the paragraph and image tag to the videoGameDiv
                    videoGameDiv.append(videoGameimageRating);
                    videoGameDiv.append(videoGameImage);

                    // Prependng the videoGameDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(videoGameDiv);
                    
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
    // creates the buttons for the videoGames to appear on the screen
    function createvideoGames() {
        $("#videoGame-button-display").empty();
        // for loop to run through videoGame array and make buttons
        for (var i = 0; i < videoGames.length; i++) {
            var videoGameButtons = $("<button>");
            videoGameButtons.text(videoGames[i]);
            // gives the new button an ID equal to the index string of the array
            videoGameButtons.attr("id", videoGames[i]);
            videoGameButtons.attr("class", "allvideoGameButtons")
            $("#videoGame-button-display").append(videoGameButtons);
        }

    }
function reset(){
    $("#gifs-appear-here").empty();
}
    // function for the user to type in a videoGame and add it to the videoGames array
    $("#add-videoGame").on("click", function () {
        // keeps the items on the screen and not do its default coding which is to get ride of the buttons
        event.preventDefault();
        // // // getting the vaule from what the user typed
        var addvideoGame = $("#newvideoGame").val().trim();
        // // // takes the value that we got from the user and pushes it into the videoGames array so a button can be created
        videoGames.push(addvideoGame);
        // // // run our button function so that the new button can be seen
        createvideoGames();
        // // clear the text un the imput box
        $("#newvideoGame").val("");

    });
    $(document).on("click", ".allvideoGameButtons", displayvideoGameInfo);
    $(document).on("click", ".gif", gifsAnimate);
    $(document).on("click", "#reset", reset);
    createvideoGames();


});


