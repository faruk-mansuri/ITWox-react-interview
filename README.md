INSTRUCTIONS FOR COMPLETING THIS TEST

-Create a React or React Native or Expo or NextJS app
-Use Typescript for any of these project types
-Create 3 screens
Home
default landing page
should have a top navigation bar
When user is not signed in: should have a top navigation bar with a "sign in" link, which links to /sign-in
When user is signed in: should have a top navigation bar with a "dashboard" link to "/dashboard" & a "sign out" button which will sign out the user when clicked

     Dashboard
       should have a top navigation bar
       should be accessible only if the user is signed in
       should have a title "Dashboard"
       Should fetch a list of posts & its comments from
        Posts API - https://jsonplaceholder.typicode.com/posts
        Comments API - https://jsonplaceholder.typicode.com/comments

      The list of posts can be displayed either as a table or as a list of cards, with a count of its comments
      List of posts should be paginated to show 10 records with an ability to move to next/previous page
      Ensure the API URLs are stored in proper environment files as required

     Sign In
      should NOT have a top navigation bar
      should allow the user to enter a username & password (both required fields, username should be an email address)
      should validate input
      when user click the "submit" then, it should login & redirect to the "/dashboard" if everything is successful

    State Management
      use Redux or MobX or React Context API to manage state of the user login
      Post sign in, if the screen is refreshed, the user login state should remain
      Unit Testing
      write unit tests using any framework of your choice to test the UI components & the client State
      integrate your test script into the package.json so that it can be triggered from npm test command

UI styling:
use any of the open source CSS toolkits (e.g.: Bootstrap, w3css etc.), if you want to improve the UI or feel free to write your own

live project url : https://itwox-react-interview.netlify.app

source code : https://github.com/faruk-mansuri/fullstack-developer-faruk-mansuri

HOW TO EXECUTE THIS PROJECT-
-In the root of this folder create .env file and add following env variables
MONGO_URL=mongodb+srv://faruk13:faruk13@cluster0.rhc7b1v.mongodb.net/ITWOX_PROJECT?retryWrites=true&w=majority
JWT_SECRET=secret123
JWT_EXPIRES_IN=1d

-npm install (execute this command in terminal to install dependencies)
-npm run dev (execute this command in terminal to run application )
