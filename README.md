# This is MetUp a Meetup clone

## Introduction
  This webisite is intended to replicate a few key features and general look and feel of the website Meetup
  
  Site Link: https://meetup-project-aa.herokuapp.com/
  
## Tech Stack
  Frameworks, Libraries, and Platform:
  
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 	![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  
  Database:
  
  ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
  
  Hosting:
  
  ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Preview Image

### Home/Landing Page
   ![Landing Page](https://user-images.githubusercontent.com/87671074/187111702-5dead7cf-cd17-49ff-b7bb-b2a178877e8c.png)

### Events Page
  ![Event-roll](https://user-images.githubusercontent.com/87671074/192171583-8a7a8981-9fc9-4ef2-8c36-9ecaca42eb49.png)

### Event Details
  ![Event Details](https://user-images.githubusercontent.com/87671074/187112549-1f742195-710b-479f-a262-8bb82853604f.png)


### Groups Page
  ![Group-roll](https://user-images.githubusercontent.com/87671074/192171598-c4ba83e6-c2ca-4bb7-ad82-7237fc3944ae.png)

### Group Details
   ![Group Details](https://user-images.githubusercontent.com/87671074/187112441-e7594465-7f47-4375-96e4-23a12e07b53d.png)

### Create Group
  ![Create-Group-Page](https://user-images.githubusercontent.com/87671074/192171719-dea953d2-520e-4b28-abdb-3ab45cf26c8c.png)

### Create Event
  ![Create-Event-Page](https://user-images.githubusercontent.com/87671074/192171723-047d11ae-a17b-4b4c-b841-388c33ee8f4b.png)

### Database Schema
  ![meetup_dbdiagram](https://user-images.githubusercontent.com/87671074/187113115-6eb9a70c-afce-4f68-8972-71cbae96a505.png)

## Run On Local Machine
  - Clone/download the repo
  
  - Open two terminals, in one <code>cd</code> into the backend and the other <code>cd</code> into the frontend
  
  - In the backend run <code>npm install</code> and run <code>npm start</code>

  - In the frontend run <code>npm install</code> and run <code>npm start</code>

### Environment Info
  ```
  PORT=8000
  DB_FILE=db/dev.db
  JWT_SECRET=«generate_strong_secret_here»  
  JWT_EXPIRES_IN=604800
  ```
  
### Database Setup
  ```
   npx dotenv sequelize db:migrate
   npx dotenv sequelize db:seed:all
  ```
  
## Features To Add
 - View Images
 
 - Get Event Attendees
 
 - Get Group Members
 
 - Search For Group/Events
 
 - Venues Feature

## Challenges
 - The biggest challenge on the backend was getting the table relationships properly associated with one another

 - The biggest challenge on the frontend was getting the creates and updates to properly behave in tandem with one another

## Things To Improve
 - Optimize some of the backend code

 - Clean up my CSS and class naming
