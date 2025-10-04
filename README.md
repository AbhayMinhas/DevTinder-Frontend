# DevTinder

- Created a Vite+react project
- Remove unacessary code and create a Hello world app

- Install tailwind CSS
- Install Daisy UI
- Add NavBar component to App.jsx
- Crete a NavBar.jsx seperate Component file
- Install react router dom
//routing can be created on the root level of your application
//done on app.jsx

Body
    NavBar
    Route =/ =>Feed
    Route =/login =>login
    Route =/connections =>Connections
    Route =/profile => Profile
-- >inside
- Create Browser Router > Routes > Route=/Body > RouteChildren
- Create an Outlet in your  Body Component
-Create a footer
-Create a login page
- Install axios
- CORS - install cors in backend => add middleware to app with configurations: origin,cretdentials:true
- Whenever you're making API call so pass axios => {withCredentials: true}
- Install Redux ToolKit - https://redux-toolkit.js.org/tutorials/quick-start

-Install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => add reducer to store

- npm install @reduxjs/toolkit
- npm install react-redux 
- In oneline --> npm install @reduxjs/toolkit react-redux 
install multiple libraries whith space seperation in one go

-Add redux devtools in chrome
-Login and see if your data is coming properly in the store
-NavBar should update as soon as user logs in 
-Refactor out code to add contants file + create a components folder
- You should not be able to access other routes without login
- if token is not present, redirect user to the login page
- Logout Feature
-Get the feed and add the feed in the store
-build the user card on feed
-Edit Profile Feature
-Show Toast Message on save of profile

- New Page - see all my connections 
- New Page - see all my connection requests