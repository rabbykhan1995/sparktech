# commands for setup the project after get the repository from github.

1) npm init -y
2) npm install
3) node .\app.js or node app.js
 # it will hosted on localhost:3000 
 # no additional database required bacause it already integrated into mongodb atlas.
 
 # admin payload  -
  Method: POST
  Route : localhost:3000/auth/login
  Payload: {"email":"pokar@gmail.com",
   "password": 123456789}
 <!-- it will make you admin and you can be authorized for making bus and ticket -->

 # create a bus - 
  Method: POST
  Route : localhost:3000/admin/bus
  Payload: {
    "busType":"AC" or "NON-AC",
    "model" : "any",
    "operator" : "any like Hanif, desh travels etc",
    "stoppage" : ["any stoppage","any stoppage"] or no need to add this field,
    "totalSeats": 50,
    "route":{
        "startFrom":"A",
        "endTo":"B"
    },
    "travelTime":{
        "from" : "10 AM",
        "to" : "2 PM"
    },
    "ticketPrice":1400 or any ,

  }

  # Edit a bus -
  Method: PUT
  Route: localhsot:3000/admin/bus/<Id of bus>
  Payload: {
    <!-- any of field you can edit by changing by "property":"value" or change maultiple property at once -->
    "model":"model b"
    "route":{
        "startFrom":"Bcd"
    }
  } etc

  # Delete a bus - 
  Method: DELETE
  Route: localhost:3000/admin/bus/<busId>

  # Create a Ticket - 
  Method: POST
  Route: localhost:3000/admin/ticket
  Payload: {
    "busId":"a bus _id",
    "travelDate: "YEAR-MONTH-DAY" / eg - 2024-12-31
  }

  # Edit a Ticket -
  Method:PUT
  Route:localhost:3000/admin/ticket/<ticketId>
  Payload:{
    
  }

 # For register a new user:

 Method: POST
 Route : localhost:3000/auth/register
 payload : {
    "name": "any name",
    "email" : "any@gmail.com",
    "password" : "any but minimum length is 8"
 }
<!-- after registration jwt token will store in your cookie and header -->

 # For login - 
 Method: POST
 Route: localhost:3000/auth/login
 payload : {
    "email":"your email",
    "password": "your password"
 }
 <!-- after login jwt token will store in your cookie and header -->

 # For Logout -
 Method: POST
 Route : localhost:3000/auth/logout
 <!-- it will automatically remove headers and cookies named - token, from your browser or postman -->

# to get the available bus -
Method: GET
Route : localhost:3000/user/buses
<!-- it will provide you the available buses array of objects -->

# to get the available tickets -
Method: GET
Route: localhost:3000/user/tickets
<!-- it will provide you the array of objects of tickets which are currently available -->

