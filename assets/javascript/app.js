$(document).ready(function(){

 // array of animals
   var animals = ["squirrel", "dog", "cow", "horse", "platypus", "cat"];
   renderButtons();

     // Function for creating buttons
     function renderButtons() {
        $("#buttons-view").empty();
        // Loops through the array of animals
        for (var i = 0; i < animals.length; i++) {
          var a = $("<button>");
          // Adds a class of animal to our button
          a.addClass("animal");
          // Added a data-attribute
          a.attr("data-name", animals[i]);
          // Provided the initial button text
          a.text(animals[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      };

      // This function handles events where the add animal button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var animal = $("#animal-input").val().trim();

        // The animal from the textbox is then added to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
        $("animal-input").val("");
      });

      // Adding click event listeners to all elements with a class of "animal"
      $(document).on("click", ".animal", displayGifs);
     


   // this displays the gifs when you click on an animal title
$(document.body).on('click', '.animal', function() {
	animal = $(this).attr("data-name");
	$("#animals-view").empty();
	for (i=0; i<10; i++) {
		displayGifs(i, animal);
	};
});


function displayGifs(i, animal) {
	// var title = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=v1H1STdrv7PNS7ufMaJbVnMCXjaua0rS&q=" + animal + "&limit=10&offset=0&rating=PG&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    	}).done(function(response) {
    		var still = response.data[i].images.fixed_width_still.url;
    		var animate = response.data[i].images.fixed_width.url;
    		var gifDiv = $("<div class='gifs panel panel-info'>");
    		var rating = response.data[i].rating;
 	    	var stillImage = $("<img>");
 	    	stillImage.attr({"data-still":still, "data-animate":animate, "data-state":"still", "src":still});
 	    	stillImage.addClass("btn btn-default gifImage");
    		gifDiv.append(stillImage);
    		gifDiv.attr("id", "gif" + i);
    		gifDiv.css({"width":"250px", "display":"inline-grid", "margin":"15px", "padding":"10px", "text-align":"center"})
    		$("#animals-view").append(gifDiv, rating);
	});
};

$(document.body).on('click', '.gifImage', function() {
	var t = $(this);	
	var state = t.attr("data-state");
	if (state === "still") {
	  t.attr("src", t.attr("data-animate"));
	  t.attr("data-state", "animate");
	} else {
	  t.attr("src", t.attr("data-still"));
	  t.attr("data-state", "still");
	 }

});

});