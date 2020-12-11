define({ "api": [
  {
    "type": "get",
    "url": "/manufacturersWithMinPlanes",
    "title": "Manufacturers with minimum planes",
    "group": "Manufacturers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "minPlanes",
            "description": "<p>Minimum number of planes</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n         \"number_of_planes\":1630,\n         \"manufacturer\":\"BOEING\"\n    }\n]",
          "type": "json[]"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Manufacturers",
    "name": "GetManufacturerswithminplanes"
  },
  {
    "type": "get",
    "url": "/noOfFlightsPerManufacter",
    "title": "Number of flights per manufacturer",
    "group": "Manufacturers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "minPlanes",
            "description": "<p>Number of minimum planes a manufacturer must have to be included in the counting.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n         \"manufacturer\": \"AIRBUS\",\n         \"count\": 125\n    }\n]",
          "type": "json[]"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Manufacturers",
    "name": "GetNoofflightspermanufacter"
  },
  {
    "type": "get",
    "url": "/numberOfPlanesOfEachModel",
    "title": "Number of planes of each model",
    "group": "Manufacturers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "manufacturer",
            "description": "<p>The manufacturer whose planes will be counted.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n         \"count\":127,\n         \"model\":\"A320-232\"\n    }\n]",
          "type": "json[]"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Manufacturers",
    "name": "GetNumberofplanesofeachmodel"
  },
  {
    "type": "get",
    "url": "/origins",
    "title": "General Route - Origins - Request origins information",
    "name": "GetOrigins",
    "group": "Route_00",
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
    "groupTitle": "Route_00"
  },
  {
    "type": "get",
    "url": "/noOfFlightsPerMonth?origin={origin}",
    "title": "Flights per Month - Request Numeber of flights per month",
    "name": "GetNumeberOfFlights",
    "group": "Route_01",
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
    "groupTitle": "Route_01"
  },
  {
    "type": "get",
    "url": "/topDestinations?number={number}&origin={origin}",
    "title": "Top Destinations - Request Top Destinations",
    "name": "GetTopDestinations",
    "group": "Route_02",
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
    "groupTitle": "Route_02"
  },
  {
    "type": "get",
    "url": "/meanAirtime?origin={origin}",
    "title": "Mean Air Time - Request Mean Air Time",
    "name": "GetMeanAirTime",
    "group": "Route_03",
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
    "groupTitle": "Route_03"
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
    "url": "/weatherObservations?origin={origin}",
    "title": "Weather Observations - Request Weather Observations",
    "name": "GetWeatherObservations",
    "group": "Weather",
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
    "groupTitle": "Weather"
  },
  {
    "type": "get",
    "url": "/temperature?origin={origin}",
    "title": "All Measured Temperatures at Origin - Request All Measured Temperatures at Origin",
    "name": "Get_Daily_Mean_Temperature",
    "group": "Weather",
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
    "groupTitle": "Weather"
  },
  {
    "type": "get",
    "url": "/dailyMeanTemperature?origin={origin}",
    "title": "Daily Mean Temperature - Request Daily Mean Temperature",
    "name": "Get_Daily_Mean_Temperature",
    "group": "Weather",
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
    "groupTitle": "Weather"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Display Main Page",
    "name": "GetMainPage",
    "group": "Welcome",
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
    "groupTitle": "Welcome"
  }
] });
