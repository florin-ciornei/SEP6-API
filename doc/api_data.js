define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "Display Main Page",
    "name": "GetMainPage",
    "group": "Main_Page",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "mainPage",
            "description": "<p>Returns the main page to be displayed for our RESTfull API.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Main_Page"
  },
  {
    "type": "get",
    "url": "/origins",
    "title": "General Route - Origins - Request origins information",
    "name": "GetOrigins",
    "group": "Route_0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "origins",
            "description": "<p>Returns an array of json objects containing all origins and their related information.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Route_0"
  },
  {
    "type": "get",
    "url": "/meanDepartureArrivalDelay?origin={origin}",
    "title": "Mean Departure Arrival Delay - Request Mean Departure Arrival Delay",
    "name": "Get_Mean_Departure_Arrival_Delay",
    "group": "Route_10",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "origin",
            "description": "<p>The Mean Departure Arrival Delay for that Origin.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "mean_Dep_Arr_Delay",
            "description": "<p>Returns an array of json objects containing the average Departure and Arrival Delay for each of the three origins</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Route_10"
  },
  {
    "type": "get",
    "url": "/noOfFlightsPerMonth?origin={origin}",
    "title": "Flights per Month - Request Numeber of flights per month",
    "name": "GetNumeberOfFlights",
    "group": "Route_1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "origin",
            "description": "<p>The number of lfights per month for that Origin.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Numebr[]",
            "optional": false,
            "field": "number_Of_Flights",
            "description": "<p>Returns the numebr of flights.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Route_1"
  },
  {
    "type": "get",
    "url": "/topDestinations?number={number}&origin={origin}",
    "title": "Top Destinations - Request Top Destinations",
    "name": "GetTopDestinations",
    "group": "Route_2",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "number",
            "description": "<p>The numer of destinatinos to be returned</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "origin",
            "description": "<p>Top Destinations for that origin number of lfights per month for that Origin.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "top_Destinations",
            "description": "<p>Returns an array of json objects containing the top destination airport codes and the number of flights made for each destination. These are the most frequently visited destinations in a descending order (i.e. Top Destinations).</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Route_2"
  },
  {
    "type": "get",
    "url": "/meanAirtime?origin={origin}",
    "title": "Mean Air Time - Request Mean Air Time",
    "name": "GetMeanAirTime",
    "group": "Route_3",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "origin",
            "description": "<p>The Mean Air Time for that Origin.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "mean_Air_Time",
            "description": "<p>Returns an array of json objects containing the average of the total time spent in air divided by the total number of flights for each origin.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Route_3"
  },
  {
    "type": "get",
    "url": "/weatherObservations?origin={origin}",
    "title": "Weather Observations - Request Weather Observations",
    "name": "GetWeatherObservations",
    "group": "Route_4",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "origin",
            "description": "<p>The total number of Weather Observations for that Origin.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "weather_Observations",
            "description": "<p>Returns an array of json objects containing the total number of weather observations per Origin.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Route_4"
  },
  {
    "type": "get",
    "url": "/temperature?origin={origin}",
    "title": "All Measured Temperatures at Origin - Request All Measured Temperatures at Origin",
    "name": "Get_Daily_Mean_Temperature",
    "group": "Route_7",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "origin",
            "description": "<p>The Daily Mean Temperature for that Origin.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "temperature",
            "description": "<p>Returns an array of json objects containing ALL the temperature measurements registered at that origin.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Route_7"
  },
  {
    "type": "get",
    "url": "/dailyMeanTemperature?origin={origin}",
    "title": "Daily Mean Temperature - Request Daily Mean Temperature",
    "name": "Get_Daily_Mean_Temperature",
    "group": "Route_8_and_9",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "origin",
            "description": "<p>The Daily Mean Temperature for that Origin.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "daily_Mean_Temperature",
            "description": "<p>Returns an array of json objects containing the average daily temperature for each day of the month and for each month of the year for each origin.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Route_8_and_9"
  }
] });
