import React from "react";
import axios, { Axios } from "axios";
import variables from "../src/variables";
import querystring from "querystring"

import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';



const Profile = ({ user }) => {



  React.useEffect(() => {
    console.log(user)
  }, [])




  return <div className="container"><h1>Profile </h1>
    {user ?
      <>
        <img src={user.snoovatar_img} />
        <ul>
          <li>
            Username: {user.subreddit.title}
          </li>
          <li>
            Comment Karma: {user.comment_karma}
          </li>
          <li>
            Link Karma: {user.link_karma}
          </li>
          <li>
            Total Karma: {user.total_karma}
          </li>
        </ul>
      </>
      : (<h4>Please Login</h4>)
    }
  </div>
};

export default Profile;


const getToken = async (body) => {
  const data = await axios.post('https://www.reddit.com/api/v1/access_token', querystring.stringify(body), {
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
      "content-type": "application/x-www-form-urlencoded"
    },

  })
  return data.data
}


const getUser = async (access_token) => {
  const data = await axios.get('https://oauth.reddit.com//api/v1/me', {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "content_type": 'application/json'
    }
  })

  return data.data
}


export const getServerSideProps = async ({ query, req, res }) => {
  const refresh_token = getCookie('refresh_token', { req, res });
  const access_token = getCookie('access_token', { req, res });

  if (refresh_token) {
    if (access_token) {
      const user = await getUser(access_token)
      return { props: { user } }
    } else {
      const token = await getToken({ refresh_token: refresh_token, grant_type: "refresh_token" })
      setCookie('refresh_token', token.refresh_token, { req, res, maxAge: 60 * 60 });
      setCookie('access_token', token.access_token, { req, res, maxAge: 60 * 60 * 24 });
      const user = await getUser(token.access_token)
      return { props: { user } }
    }
  } else if (query.code && query.state === variables.RANDOM_STRING) {
    try {
      const token = await getToken({ code: query.code, grant_type: "authorization_code", redirect_uri: variables.REDIRECT_URI })
      setCookie('refresh_token', token.refresh_token, { req, res, maxAge: 60 * 60 });
      setCookie('access_token', token.access_token, { req, res, maxAge: 60 * 60 * 24 });
      const user = await getUser(token.access_token)
      return { props: { user } }
    } catch (e) {
      console.log(e)
      return { props: { user: null } }
    }
  } else {
    return { props: { user: null } }
  }
}