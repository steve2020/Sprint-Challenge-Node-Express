# Review Questions

## What is Node.js?
a framework/cosole/engine for running javascript on a local computer/server as opposed to in the browser
## What is Express?
a node js library to make CRUD operations easier
## Mention two parts of Express that you learned about this week.
get method performs http GET, delete method performs http DELETE 
## What is Middleware?
generally functions that live between the http request and our server, to help the process of retrieving stuff from the database
## What is a Resource?
nouns that live in the database (posts, actions, users etc.) and are manipulated in some way by CRUD
## What can the API return to help clients know if a request was successful?
the result of the promise (res) and/or the error message (using .catch)
## How can we partition our application into sub-applications?
skip
## What is CORS and why do we need it?
middleware to allow access to the server from various clients