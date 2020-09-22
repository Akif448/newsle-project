$(document).ready(function () {

  $("#run-search").on("click", function (e) {
    e.preventDefault();

    //get the selected news source
    var selection = $('#dropdownNews :selected').val();

    //clear the news source images 
    $("#newsSource").empty();

    //get the image for the selected news source
    var img = document.createElement("img");
    if (selection === "Gardian") {
      img.src = " assets/The_Guardian_logo.png";
    } else {
      img.src = " assets/The_New_York_Times_logo.png";
    }
    var src = document.getElementById("newsSource");
    src.appendChild(img);

    // clear the previous contents displayed
    clear();

    // get the result 
    if (selection === "Gardian") {

      function buildQueryURL1() {
        // queryURL is the url we'll use to query the API
        var queryURL = "https://content.guardianapis.com/search?";

        // Begin building an object to contain our API call's query parameters
        // Set the API key
        var queryParams = {
          "api-key": "test"
        };

        // Grab text the user typed into the search input, add to the queryParams object
        queryParams.q = $("#search-term").val().trim();
        console.log(queryParams.q);

        // If the user provides a startYear, include it in the queryParams object
        var startYear = $("#start-year").val()
        // it does not work due to the free vesion of API
        if (parseInt(startYear)) {
          // queryParams["from-date"] = startYear + "0101";
        }


        return queryURL + $.param(queryParams);
      }
      var queryURL = buildQueryURL1()
      console.log(queryURL)


      // if the search value is not empty then pass the url to get the data
      if (queryURL !== "") {

        $.ajax({

          url: queryURL,
          method: "GET",
          dataType: "json",

          beforsend: function () {
            //any condition to be checked before sending
          },
          complete: function () {
            // any condition to checked after this completed
          },

          //when it is successfull 
          success: function (news) {
            //let the output to be empty at inital state
            let output = ""
            // let the result as latest news based on the response received
            let latestNews = news.response.results;
            // looping array for each object
            for (var i in latestNews) {
              //append the output with the result
              output += `


              <div class="w3-card-4" style="width 270%;">
              <header class="w3-container  w3-blue">
              <h4>Title : ${latestNews[i].webTitle}</h4>
              </header>

              <div class="w3-container ">
              <p>News Type: ${latestNews[i].type}</p>
              <p>Section: ${latestNews[i].sectionName}</p>
              <p><strong>URL: </strong> <a href="${latestNews[i].webUrl}"target="_blank">${latestNews[i].webUrl}</a></p>
              <p>Published on: ${latestNews[i].webPublicationDate}</p>
              <p>Pillar Name: ${latestNews[i].pillarName}</p>
              </div>

              <footer class="w3-container w3-grey" style ="height:10px">
              </footer>
              </div>
              
              
              `;

            }
            //if the output is not empty
            if (output !== "") {
              // append the  article section (id) in html with the result         
              $("#article-section").append(output)

              // if the output is empty append this with '"There is no news"
            } else {
              $("#article-section").html("There is no news");

            }
          },
          // if any error found 
          error: function () {
            console.log("error");
          }

        });
      } else {
        // any condition??
      }

    } else {
      function buildQueryURL() {
        // queryURL is the url we'll use to query the API
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

        // Begin building an object to contain our API call's query parameters
        // Set the API key
        var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };

        // Grab text the user typed into the search input, add to the queryParams object
        queryParams.q = $("#search-term").val().trim();;
        console.log(queryParams.q);

        // If the user provides a startYear, include it in the queryParams object
        var startYear = $("#start-year").val()

        if (parseInt(startYear)) {
          queryParams.begin_date = startYear + "0101"
        }

        if (parseInt(startYear)) {
          queryParams.end_date = startYear + "1231"
        }
        console.log(startYear + "0101");
        return queryURL + $.param(queryParams);
      }
      var queryURL = buildQueryURL()
      console.log(queryURL)


      // if the search value is not empty then pass the url to get the data
      if (queryURL !== "") {

        $.ajax({

          url: queryURL,
          method: "GET",
          dataType: "json",

          beforsend: function () {
            //any condition to be checked before sending
          },
          complete: function () {
            // any condition to checked after this completed
          },

          //when it is successfull 
          success: function (news) {
            //let the output to be empty at inital state
            let output = ""
            // let the result as latest news based on the response received
            let latestNews = news.response.docs;
            // looping array for each object
            for (var i in latestNews) {
              //append the output with the result
              output += `
                

              <div class="w3-card-4" style="width 270%;">
              <header class="w3-container  w3-blue">
                <h4>Title : ${latestNews[i].abstract}</h4>
                </header>
  
                <div class="w3-container">
                <p>News Type: ${latestNews[i].document_type}</p>
                <p>Section: ${latestNews[i].section_name}</p>
                <p><strong>URL: </strong> <a href="${latestNews[i].web_url}""target="_blank">${latestNews[i].web_url}</a></p>
                <p>Published on: ${latestNews[i].pub_date}</p>
                <p>Pillar Name: ${latestNews[i].type_of_material}</p>
                </div>
  
                <footer class="w3-container w3-grey" style ="height:10px">
                </footer>
                </div>
                
                                                              
                `;

            }
            //if the output is not empty
            if (output !== "") {
              // append the  article section (id) in html with the result         
              $("#article-section").append(output)

              // if the output is empty append this with '"There is no news"
            } else {
              $("#article-section").html("There is no news");

            }
          },
          // if any error found 
          error: function () {
            console.log("error");
          }

        });
      } else {
        // any condition??
      }
    }


  });

  // Function to empty out the articles
  function clear() {
    $("#article-section").empty();
  }

});


