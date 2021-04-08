import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { Provider, useSelector } from "react-redux";
import { createStore } from "./redux/store";

import App from "./App";
import { selectUser } from "redux/mainReducer";

const GlobalCSS = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    text-decoration:none;
    list-style:none;
    box-sizing:border-box;
    text-decoration:none;
    outline:none;
  }

  :root{
    --main : #2874f0;
    --buttoncolor: #ff5100
  }
  
  .centering{
    display:flex;
    align-items:center;
    justify-content:center;
  }
  
  .flex {
    display:flex;
  }

  .flex-column{
    display:flex;
    flex-direction:column;
    justify-content:center;
  }

  a{
    color:black;
    text-decoration:none;

    &:hover{
      text-decoration:none;
    }
  }

  button{
    border:none;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalCSS />

    <Provider store={createStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
