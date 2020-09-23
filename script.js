$(document).ready(function () {

  $("#submit").on("click", function (e) {
    e.preventDefault();

    //get the news source selected
    let selection = $('#dropdownNews :selected').val();

    //get the image for the selected news source
    let img = document.createElement("img");

    (selection === "guardian") ? img.src = " assets/The_Guardian_logo.png" : img.src = " assets/The_New_York_Times_logo.png";

    // clear the logo and append
    $("#newsLogo").empty().html(img);

    // clear the previous contents displayed
    clear();

    // get the query URL
    let queryURL = buildQueryURL()

    // build the query URL
    function buildQueryURL() {

      let queryURL;
      // Set the URL based on the news source selected

      (selection === "guardian") ? queryURL = "https://content.guardianapis.com/search?" :
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

      // Begin building an object to contain our API call's query parameters
      // Set the API key based on the news source selected
      let queryParams;
      (selection === "guardian") ? queryParams = { "api-key": "test" } : queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };

      // Grab text the user typed into the search input, add to the queryParams object
      queryParams.q = $("#search-text")
        .val()
        .trim();

      // get the start year
      var startYear = $("#start-year")
        .val()
        .trim();
      // set the begin date and end date to the queryParams
      if (parseInt(startYear)) {
        queryParams.begin_date = startYear + "0101";
        queryParams.end_date = startYear + "1231";
      }
      // get the url with queryParams - date range only applied to nytimes
      (selection === "nytimes") ? (queryParams.begin_date, queryParams.end_date) : "";
      return queryURL + $.param(queryParams);

    }

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);

    function updatePage(data) {
      //let the output to be empty at inital state

      let output = ""
      // if nytimes is selected
      if (selection === "nytimes") {

        let result = data.response.docs;

        // looping array for each object

        for (let i in result) {

          //append the output with the result
          output += `
        <div class="w3-card-4">
        <header class="w3-container w3-blue">
        <h4>Title : ${result[i].abstract}</h4>
        </header>

        <div class="w3-container">
        <p>News Type: ${result[i].document_type}</p>
        <p>Section: ${result[i].section_name}</p>
        <p><strong>URL: </strong> <a href="${result[i].web_url}">${result[i].web_url}</a></p>
        <p>Published on: ${result[i].pub_date}</p>
        <p>Pillar Name: ${result[i].type_of_material}</p>
        </div>

        <footer class="w3-container w3-grey" style ="height:10px">
        </footer>
        </div>

        `;

        }

      }
      //if guardian is selected
      if (selection === "guardian") {
        let result = data.response.results;

        // looping array for each object
        for (let i in result) {
          //append the output with the result
          output += `


        <div class="w3-card-4">
        <header class="w3-container w3-blue">
        <h4>Title : ${result[i].webTitle}</h4>
        </header>

        <div class="w3-container">
        <p>News Type: ${result[i].type}</p>
        <p>Section: ${result[i].sectionName}</p>
        <p><strong>URL: </strong> <a href="${result[i].webUrl}"target="_blank">${result[i].webUrl}</a></p>
        <p>Published on: ${result[i].webPublicationDate}</p>
        <p>Pillar Name: ${result[i].pillarName}</p>
        </div>

        <footer class="w3-container w3-grey" style ="height:10px">
        </footer>
        </div>
        
        
        `;

        }
      }
      //append the output
      (output !== "") ? $("#article-section").append(output) : $("#article-section").html("There is no news");

    }


  });

  // Function to empty out the articles
  function clear() {
    $("#article-section").empty();
  }

});


