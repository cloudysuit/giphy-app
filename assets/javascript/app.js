//*****************VARIABLES***************
var reactionsArray = ["Shade", "Ugh", "Excited", "Really", "Tell Me More", "Duh", "Eww"];





function renderButtons() {

//empties display box so we don't get repeated buttons every time a new search is entered

	$("#buttonBox").empty();


//loop through array of reactions and create buttons for each

	for (var i = 0; i < reactionsArray.length; i++){

		var dynamicButton = $("<button>");

		dynamicButton.addClass("reaction");

		dynamicButton.attr("data-name", reactionsArray[i]);

		dynamicButton.text(reactionsArray[i]);

		$("#buttonBox").append(dynamicButton);
	}

	

}



function displayGIFs(){

		$("#gifResults").empty();

	var gif = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=128";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(queryURL);
		console.log(response);

		var results = response.data;

		for (var i = 0; i < results.length; i++){

			var gifDiv = $("<div class='col-md-3 text-center'>");

			var p = $("<p>").addClass("row").text("Rating: " + results[i].rating);
			var a = $("<a>").attr("href", results[i].images.original.url).attr("target", "_blank").addClass("row").text("Click for full size!");

			var reactionImage = $("<img>");

			reactionImage.attr("src", results[i].images.fixed_height_small_still.url).attr("data-still", results[i].images.fixed_height_small_still.url).attr("data-animate", results[i].images.fixed_height_small.url).attr("data-state", "still").addClass("gif");
			

			gifDiv.append(a);
			gifDiv.append(reactionImage);
			gifDiv.append(p);

			$("#gifResults").append(gifDiv);


		}


		$(".gif").on("click", function(){

			var state = $(this).attr("data-state");

			if (state === "still"){
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state", "animate");
			}

			else{
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
			}

		});


	});
}



$(document).on("click", ".reaction", displayGIFs);



$("#addReaction").on("click", function(event){

	event.preventDefault();

	var newReaction = $("#reactInput").val().trim();

	reactionsArray.push(newReaction);

	renderButtons();
});

renderButtons();

// $(".gif").on("click", function(){
// 	var state = $(this).attr()
// });
