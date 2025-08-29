import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./login";
import Profile from "./Profile";

function App() {
  return (
    <>
      {/* give base name in browser router and this base name is where your applictions root should point to -- all the routing will work relative to this path '/' if '/app' then all the routes should follow '/app/something...'*/}
      {/* routes component is like a wrapper for different routes everyting is imported form react-router-dom */}
      {/* create a route in route  tag put path and then  also give element and this element will decide what will be rendered in out path 
    inside our element you have to give a component you can create a dummy component also*/}
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path="/"
            element={<Body />}
          >
            <Route
              path="/login"
              element={<Login/>}
            />
            <Route
              path="/profile"
              element={<Profile/>}
            />


          </Route>
        </Routes>
      </BrowserRouter>
      {/* <NavBar /> */}
    </>
  );
}

export default App;
