import io from "socket.io-client";
import {BASE_URL} from "./constants"
// this function creates a socket connection and returns us the socket object  where we can send events emit events chat send messages and alot more

// export const createSocketConnection = () => {
//     // you need to give it a url where you need to connect your backend url
//     return io(BASE_URL);
// };
//this previous configuration will not work in produciton
export const createSocketConnection = () => {
    if(location.hostname === "localhost"){

        return io(BASE_URL);
    }else{
        //if on production
        //we want our base url to be "/" but path to be "api/socket"
        //whenever we referesh the page this socket conneciton automatically happens on the path localhost:7777/socket.io/
        //this was on local host
        //but on production it will be like devTinder.in/socket.io/lkjj
        
        //but this will not work we want our base path to be api/
        //as our backend is running on /api
        //devtinder.in/api/socket.io/sdf
        //we can configure this using this path variable
        return io("/",{path:"/api/socket.io"});
        
    }
};
//when you will do devTinder.in/socket.io then your nginx will not recognize this path it will give 404 we need api/
//even if you do io("/api") this will also not work


//in socket.io go to 
//options --> search path
// the default value of path is /socket.io/
//for custom path you have to give it in path: url
// used  "/" for devtinder.in