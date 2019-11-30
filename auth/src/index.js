import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
  applicationId:
    "348a251e78af97fd68b979ae0ffc0dfaaca29d02c922838f70448147cf331d81",
  secret: "70a86a0045e3e2f4fc3461a6a8ea41e599f9cf66b17632a318e84cbf8cb62ceb",
  callbackUrl: "https://mishindmitry.site/auth"
});

const code = location.search.split("code=")[1];

if (code) {
  unsplash.auth
    .userAuthentication(code)
    .then(toJson)
    .then(json => {
      sessionStorage.setItem("tokenCode", json.access_token);
      unsplash.auth.setBearerToken(json.access_token);
      location.assign("https://mishindmitry.site");
    });
}
