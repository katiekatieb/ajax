var animals = ['cat', 'dog', 'penguin']
showButtons();

function showButtons(){
  $('#buttons').empty();
  for(var i = 0; i < animals.length; i++){
    $('#buttons').append("<button value= " + animals[i] + ">" + animals[i] + "</button>")
  }
}



$("#addButton").on("click", function(event) {
  event.preventDefault();
  var value = $('#addButtonField').val();
  animals.push(value);

  showButtons();
  $('#addButtonField').val("");
});


$(document.body).on("click", "button", function() {
  $('#images').empty();
  var animal = $(this).val();

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";


  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    imageArray = response.data
    console.log(response)

    for(var i = 0; i < imageArray.length; i++){
      var stillImageUrl = response.data[i].images.original_still.url
      var animatedImageUrl = response.data[i].images.original.url
      console.log(stillImageUrl)
      var image = $("<img>");
      var rating = response.data[i].rating;
      image.attr("src", stillImageUrl);
      image.attr("alt", "'" + animal + " image'");
      image.attr("data-state", "still");
      image.addClass('gif')
      image.attr("data-still", stillImageUrl);
      image.attr("data-animated", animatedImageUrl);


      $("#images").append(image);
      $('#images').append('<p>RATING: ' + rating + '</p>')

    };
  });

});

$(document.body).on("click", ".gif", function() {

  var state = $(this).attr('data-state');
  var src;

  if(state === 'still'){
    console.log('hi')
    src = $(this).attr('data-animated');
    $(this).attr('data-state', 'animate');
  } else{
    src = $(this).attr('data-still');
    $(this).attr('data-state', 'still');
  }

  $(this).attr('src', src);

});

