$(document).ready (function(){
  
    $("#run-search").on("click",function(e){
      e.preventDefault();
      var selection =$("#dropdownNews").val()
      if (selection ==="Gardian") {
      
      function buildQueryURL1() {
        // queryURL is the url we'll use to query the API
        var queryURL = "https://content.guardianapis.com/search?";
      
        // Begin building an object to contain our API call's query parameters
        // Set the API key
        var queryParams = { "api-key": "test" };
      
        // Grab text the user typed into the search input, add to the queryParams object
        queryParams.q = $("#search-term").val();
        console.log (queryParams.q);
      
        // If the user provides a startYear, include it in the queryParams object
        var startYear = $("#start-year").val()
      
        if (parseInt(startYear)) {
          queryParams.webPublicationDate = startYear + "0101";
        }
        
        // Logging the URL so we have access to it for troubleshooting
        
        return queryURL + $.param(queryParams);
      }
      var queryURL=buildQueryURL1()
      console.log(queryURL)
    
    
        // if the search value is not empty then pass the url to get the data
        if(queryURL !=="") {
    
          $.ajax({
    
            url : queryURL,
            method : "GET",
            dataType :"json",
    
            beforsend: function (){
              //any condition to be checked before sending
            },
            complete : function (){
              // any condition to checked after this completed
            },
            
            //when it is successfull 
            success :function(news){
            //let the output to be empty at inital state
            let output =""
            // let the result as latest news based on the response received
            let latestNews =news.response.results;
            // looping array for each object
            for (var i in latestNews){
            //append the output with the result
              output +=`
              
              <h4> Title : ${latestNews[i].webTitle}</h4>
              <p>News Type: ${latestNews[i].type}</p>
              <p>Section: ${latestNews[i].sectionName}</p>
              <p><strong>URL: </strong> <a href="${latestNews[i].webUrl}">${latestNews[i].webUrl}</a></p>
              <p>Published on: ${latestNews[i].webPublicationDate}</p>
              <p>Pillar Name: ${latestNews[i].pillarName}</p>
              
              `;
    
              }
              //if the output is not empty
              if (output !==""){
              // append the  article section (id) in html with the result         
                $("#article-section").append( output )
             
              // if the output is empty append this with '"There is no news"
              } else {
                $("#article-section").html("There is no news");
    
              }
            },
            // if any error found 
            error:function() {
              console.log("error");
            }
    
          });
        } else{
          // any condition??
        }
      
      } else{
        function buildQueryURL() {
          // queryURL is the url we'll use to query the API
          var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
        
          // Begin building an object to contain our API call's query parameters
          // Set the API key
          var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };
        
          // Grab text the user typed into the search input, add to the queryParams object
          queryParams.q = $("#search-term").val();
          console.log (queryParams.q);
        
          // If the user provides a startYear, include it in the queryParams object
          var startYear = $("#start-year").val()
        
          if (parseInt(startYear)) {
            queryParams.begin_date  = startYear + "0101";
          }
          
          // Logging the URL so we have access to it for troubleshooting
          
          return queryURL + $.param(queryParams);
        }
        var queryURL=buildQueryURL()
        console.log(queryURL)
      
      
          // if the search value is not empty then pass the url to get the data
          if(queryURL !=="") {
      
            $.ajax({
      
              url : queryURL,
              method : "GET",
              dataType :"json",
      
              beforsend: function (){
                //any condition to be checked before sending
              },
              complete : function (){
                // any condition to checked after this completed
              },
              
              //when it is successfull 
              success :function(news){
              //let the output to be empty at inital state
              let output =""
              // let the result as latest news based on the response received
              let latestNews =news.response.docs;
              // looping array for each object
              for (var i in latestNews){
              //append the output with the result
                output +=`
                
                <h4> Title : ${latestNews[i].abstract}</h4>
                <p>News Type: ${latestNews[i].document_type}</p>
                <p>Section: ${latestNews[i].section_name}</p>
                <p><strong>URL: </strong> <a href="${latestNews[i].web_url}">${latestNews[i].web_url}</a></p>
                <p>Published on: ${latestNews[i].pub_date}</p>
                <p>Pillar Name: ${latestNews[i].type_of_material}</p>
                
                `;
      
                }
                //if the output is not empty
                if (output !==""){
                // append the  article section (id) in html with the result         
                  $("#article-section").append( output )
               
                // if the output is empty append this with '"There is no news"
                } else {
                  $("#article-section").html("There is no news");
      
                }
              },
              // if any error found 
              error:function() {
                console.log("error");
              }
      
            });
          } else{
            // any condition??
          }
      }
  
  
    });
   
    });
  
  
  