import React from "react";
import variables from "../src/variables";
const SignIn = (props) => {
  const { DURATION, REDIRECT_URI, SCOPE, RANDOM_STRING, RESPONSE_TYPE, CLIENT_ID } =
    variables

  const URL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;
  return (
    <div className="sign-in">
      <form action={URL} method="post">
        <input
          className="reddit-button"
          type="submit"
          value="Sign In With Reddit"
        />
      </form>
    </div>
  );
};

export default SignIn;

