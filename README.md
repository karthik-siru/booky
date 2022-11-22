# booky
A website to reserve or book a  amenity in NITC developed using MERN stack   with a special authority called Admin. <br />
User can only book the facility iff, he is logged in, and NavBar changes according to his login Status .

# Team :
  
  Siruvalam Karthik <br />
  Putta Suman Rao <br />
  Nelluru Keerthi Bhavan <br />

## Admin Functionalities :

-> Can Create a fctype (Ex: computer / court )<br />
-> Can Manage them <br />
-> Can Create a facility (Ex : OAT )<br />
-> Can Manage them <br />
-> View All Bookings <br />
-> View All Cancellations with Reasons <br />

## User Functionalities : 
-> Can select any computer/court in a facility <br />
-> Add them to a Cart <br />
-> Confirm the Booking <br />
-> Cancel the Booking <br />

---------------

![image](https://user-images.githubusercontent.com/71187119/203306936-56f19a5e-da63-4b0d-a112-75d67dbfa305.png)


----------------
## How to Setup 
This Project was made using MERN tech stack (Mongodb , Expressjs , Reactjs , Node js )


Check whether your system contains node or not using this command : "node --version"

If you get an error download the node from "https://nodejs.org/en/download/" website. Also install npm during installation process of node.

For mongodb download compass app from "https://www.mongodb.com/try/download/compass" website. Once it installed properly connect to mongodb server and create a aollection for your application and remember link to this database.

Once all this is configured follow the below steps to make application up and running.

Steps to Project Setup : 
Backend Setup :
 1. Open the Backend folder in CODE folder 
 2. Open terminal and use the command "npm install"  to install the required node modules
 3. Edit the PORT Number and Database Link in .env file
 4. Use Command "npm run dev" to start the backend 

Frontend Setup :
 1. Open the Frontend folder in CODE folder 
 2. Open terminal and use the command "npm install"  to install the required node modules
 3. Edit the REACT_APP_BACKEND to Backend Link , It will "http://localhost:PORT/"(make sure you keep last backslash) PORT is the port number you mentioned in .env file in backend.
 4. Use Command "npm start" to start the frontend.
 
Admin Setup :
 1. Modify the role of a user in database as 1 and he can be a Admin. 

Home : Once its done you can access your application from "http://localhost:3000/"
