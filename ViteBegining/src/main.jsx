import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Text from "./text.jsx";
import React from "react";

function MyFun() {
  return (
    <b>          
      <p>Hi there I'm Arnab just started to learning React.js</p>
    </b>
  );
}

export default MyFun;

// Function converted to tree structure like this:

// const ReactElement = {
//   type: 'a',
//   props:{
//     href: 'https://www.youtube.com/watch?v=kAOuj6o7Kxs&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=4&t=927s&ab_channel=ChaiaurCode',
//     target: '_blank'
//   },
//   chieldren: 'ClickMe to visit YouTube.'
// }// If i render this this don't work because here render takes another type of argument.

const ReactElements = (
  <a
    href="https://www.youtube.com/watch?v=kAOuj6o7Kxs&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=4&t=927s&ab_channel=ChaiaurCode"
    target="_blank"
  >
    VIsit HC
  </a>
); //This works..

const UserName = "Arnab Aur Chai";

const ReactElem = React.createElement(
  "a",
  { href: "https://google.com", target: "_blank" },
  "ClickMe to view --> ",
  UserName
);

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Text />
    MyFun() This doesnot work
    <MyFun />
    <ReactElement />
  </>

  // ReactElement
  // ReactElements
  // ReactElem
  //MyFun() -> This will work
);
