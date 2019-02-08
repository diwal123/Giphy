 // Creating array to create button and setting counter as 0. This will help to provide id to differnt tags later on
      // favourit array will just hold the favourites and will be merged with main array
      var array = ["cat", "dog"];
      var favourites = [];
      array = array.concat(favourites);
      var counter = 0;
      var hideout= true;

      //Creating Gifs from AJAX
      //API HuJ0lbbF6StTUNzb0z2q2EGONgkFhug4

      function displayGiphy() {
      // giphyName store the data attribute data-name hich is the inputfield value plus string of array
        var giphyName = $(this).attr("data-name");
        var queryURL =
          "https://api.giphy.com/v1/gifs/search?q=" +
          giphyName +
          "&api_key=HuJ0lbbF6StTUNzb0z2q2EGONgkFhug4&limit=10";
        var image;
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        
          // Making div empty so that we can change with every new click
          $("#gifsHere").empty();
          // Adding Image, rating, title
          for (var i = 0; i < 19; i++) {
            counter++;
            var title = response.data[i].title;
            var imageURL = response.data[i].images.fixed_height_still.url;
            var animeURL = response.data[i].images.fixed_height.url;
            var giphyDiv = $("<div class = 'giphyDiv'>");
            image = $("<img>");
            image.addClass("gif");
            image.attr("src", imageURL);
            image.attr("data-type", "still");
            image.attr("data-anime", animeURL);
            image.attr("data-still", imageURL);
            image.attr("id", "item" + counter);

            var p0 = $("<p>");
            p0.addClass("pImage");
            p0.append(image);
            giphyDiv.append(p0);

            var p1 = $("<p>");
            p1.addClass("title");
            p1.attr("id", "title" + counter);
            p1.append(title);
            giphyDiv.append(p1);
            

            var p = $("<p>");
            p.addClass("rating");
            p.attr("id", "p" + counter);
            var rating = response.data[i].rating;
           
           
            p.append("Rating:  "+rating);
            giphyDiv.append(p);


            var a = $("<a>");
            a.text("Download it");
            a.attr("id", "downloadId");
            a.attr("href", animeURL);
            a.attr("download", animeURL);
            a.click();

           
            $("#gifsHere").append(giphyDiv);
            $("#loadMore").css("display", "block");
          }
         
          function hideout() {
            for (var i = 11; i < 20; i++) {
              $("#item" + i).css("display", "none");
              $("#p" + i).css("display", "none");
              $("#title" + i).css("display", "none");
              
            }
          }
          
    
          hideout();

          function showImage() {
            for (var i = 11; i < 20; i++) {
              $("#item" + i).css("display", "inline-block");
              $("#p" + i).css("display", "inline-block");
              $("#title" + i).css("display", "inline-block");
              $("#loadMore").css("display", "none");
            }
          }

          $("#loadMore").on("click", function(e) {
            e.preventDefault();
            showImage();
            
            

          });
        });
        
      }
// Creating a function when you click on the gif, making it still and anime
      $(document.body).on("click", ".gif", function() {
        console.log("abc");

        if ($(this).attr("data-type") == "still") {
          $(this).attr("data-type", "anime");
          $(this).attr("src", $(this).attr("data-anime"));
        } else {
          $(this).attr("data-type", "still");
          $(this).attr("src", $(this).attr("data-still"));
        }
      });
//creating button for the arrays. Deleting button for every click and recreating buttons. Adding Data-name as its value
      function renderButton() {
        $("#buttonHere").empty();

        for (var i = 0; i < array.length; i++) {
          var a = $("<button>");
          a.addClass("button");
          a.attr("data-name", array[i]);
          a.text(array[i]);
          $("#buttonHere").append(a);
        }
      }
// Takeing the Value of input field to a variable (nameButton and rendering Button function. See above for render function. ALso pushing the input value to array)
      $("#createButton").on("click", function(e) {
        e.preventDefault();
        var nameButton = $("#inputButton")
          .val()
          .trim();
        array.push(nameButton);
        
        renderButton();
      });

      $(document).on("click", ".button", displayGiphy);
      renderButton();