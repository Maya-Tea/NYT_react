// Include the axios package for performing HTTP requests (promise based alternative to request)
const axios = require("axios");

// Geocoder API
const api="b100c460a85d4ecb8b93963819e180e5";
// Helper functions for making API Calls
const helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(search) {


    // var search=$("#text").val().trim();
    // var startYear=$("#startYear").val().trim();
    // var endYear=$("#endYear").val().trim();
    // var numResults=$("#recordNumber").val();

     let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+search+"&api-key="+api;
    //
    // if (startYear!==""){
    //     queryURL = queryURL+"&begin_date="+startYear+"0101";
    //   }
    // else if(endYear!==""){
    //   queryURL= queryURL+"&end_date="+endYear+"0101";
    // }
    // else{
    //   queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+search+"&api-key="+api;
    // }
    // Figure out the geolocation
    //var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;
    return axios.get(queryURL).then(function(response) {
      const articleArray=response.data.response.docs;
      // If get get a result, return that result's formatted address property
      console.log(search,"!!!!", response);
      if (articleArray) {
        //return articleArray;

       return response;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getSaved: function() {
    return axios.get("/api/saved");
  },

  // This function posts new searches to our database.
  postSaved: function(savedArticle) {
    return axios.post("/api/saved", {article: savedArticle });
  },
  postDelete: function(article) {
    return axios.post("/api/delete", {articleId: article });
  }
};

// We export the API helper
module.exports = helper;
