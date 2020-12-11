define({ "api": [
  {
    "type": "get",
    "url": "/meanAirtime",
    "title": "Mean air time",
    "group": "Flights",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "origin",
            "description": "<p>If specified, the returned array contains a single object with that origin, otherwise returns for all origins.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n     {\n         \"average\":235.37256315953942,\n         \"faa\":\"ORD\"\n     },\n     ...\n]",
          "type": "json[]"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Flights",
    "name": "GetMeanairtime"
  },
  {
    "type": "get",
    "url": "/meanDepartureArrivalDelay",
    "title": "Mean departure/arrival delay",
    "group": "Flights",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "origin",
            "description": "<p>The origin for which to return data. If not specified, data for all origins is returned.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n         \"mean_Departure_Delay\":8.75507169919908,\n         \"mean_Arrival_Delay\":-0.07456551525203721,\n         \"faa\":\"JFK\"\n    },\n    ...\n]",
          "type": "json[]"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Flights",
    "name": "GetMeandeparturearrivaldelay"
  },
  {
    "type": "get",
    "url": "/noOfFlightsPerMonth",
    "title": "Flights per month",
    "group": "Flights",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "origin",
            "description": "<p>The number of flights per month for that origin. If not specified, returns for all origins.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[3371,3074,3589,3443,3540,3578,3738,3755,3465,3628,3356,3476] //exactly 12 numbers, one for each month",
          "type": "json[]"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Flights",
    "name": "GetNoofflightspermonth"
  },
  {
    "type": "get",
    "url": "/topDestinations",
    "title": "Top destinations",
    "group": "Flights",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "number",
            "description": "<p>The numer of destinatinos to be returned.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "origin",
            "description": "<p>Specify an origin to see how many flights it has to the top destinations. If empty, counts from all origins</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n     {\n         \"count\":13043,\n         \"faa\":\"ORD\"\n     },\n     ...\n]",
          "type": "json[]"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Flights",
    "name": "GetTopdestinations"
  },
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
          "content": "HTTP/1.1 200 OK\n[\n    {\n         \"number_of_planes\":1630,\n         \"manufacturer\":\"BOEING\"\n    },\n    ...\n]",
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
          "content": "HTTP/1.1 200 OK\n[\n    {\n         \"manufacturer\": \"AIRBUS\",\n         \"count\": 125\n    },\n    ...\n]",
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
          "content": "HTTP/1.1 200 OK\n[\n    {\n         \"count\":127,\n         \"model\":\"A320-232\"\n    },\n    ...\n]",
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
    "title": "Get all origins",
    "group": "Origins",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n         \"_id\":\"5fccb4affe083721fcd39450\",\n         \"faa\":\"EWR\",\n         \"name\":\"Newark Liberty Intl\",\n         \"lat\":40.6925,\n         \"lon\":-74.168667,\n         \"alt\":18,\n         \"tz\":-5,\n         \"dst\":\"A\",\n         \"tzone\":\"America/New_York\",\n         \"__v\":0\n     },\n     ...\n]",
          "type": "json[]"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Origins",
    "name": "GetOrigins"
  },
  {
    "type": "get",
    "url": "/dailyMeanTemperature",
    "title": "Daily mean temperature",
    "group": "Weather",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "origin",
            "description": "<p>If not specified, returns data for all origins, otherwise returns only for this origin.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n     {\n         \"origin\":\"JFK\",\n         \"month\":1,\n         \"day\":1,\n         \"average\":3.2999999999999985\n     },\n     ...\n]",
          "type": "json[]"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Weather",
    "name": "GetDailymeantemperature"
  },
  {
    "type": "get",
    "url": "/temperature",
    "title": "Get temperatures",
    "group": "Weather",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "origin",
            "description": "<p>The origin for which to return the data.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n     {\n         \"origin\":\"JFK\",\n         \"month\":1,\n         \"day\":1,\n         \"hour\":0,\n         \"temperature\":3.2999999999999985\n     },\n     ...\n]",
          "type": "json[]"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Weather",
    "name": "GetTemperature"
  },
  {
    "type": "get",
    "url": "/weatherObservations",
    "title": "Weather observations count",
    "group": "Weather",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "origin",
            "description": "<p>If specified, the returned array contains data only for the specified origins, otherwise it contains data for all the origins.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n     {\n         \"count\":8700,\n         \"faa\":\"JFK\"\n     },\n     ...\n]",
          "type": "json[]"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Weather",
    "name": "GetWeatherobservations"
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
