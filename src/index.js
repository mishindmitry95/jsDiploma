import React from "react";
import { render } from "react-dom";
import Root from "./containers/Root.js";
import Unsplash from "unsplash-js";
import AsyncApp from "./containers/AsyncApp.js";
import Photo from "./components/photo.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const unsplash = new Unsplash({
  applicationId:
    "348a251e78af97fd68b979ae0ffc0dfaaca29d02c922838f70448147cf331d81",
  secret: "70a86a0045e3e2f4fc3461a6a8ea41e599f9cf66b17632a318e84cbf8cb62ceb",
  callbackUrl: "https://mishindmitry.site/auth"
});

if (!sessionStorage.getItem("tokenCode")) {
  const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "write_likes"
  ]);

  location.assign(authenticationUrl);
}

render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.querySelector(".fixed-container")
);
