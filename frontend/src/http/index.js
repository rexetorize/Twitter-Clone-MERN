import axios from 'axios';
import {setAuth} from '../AuthRedux/AuthAction';
import authStore from '../AuthRedux/AuthStore';

export const URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

export const GOOGLELOGINURL = `${URL}/auth/google`;
export const GITHUBLOGINURL = `${URL}/auth/github`;

export const getOTP = (email) => api.post('/auth/OTP', {email});


export const getUser =  () =>  api.get(`${URL}/user`);
export const logout =  () =>  api.get(`${URL}/auth/logout`);
export const activate =  (data) =>  api.post(`${URL}/user/activate`, data );
export const postTweet = (data) =>  api.post(`${URL}/tweet`, data );
export const updateUser = (data) =>  api.post(`${URL}/update-profile`, data );
export const getTweets =  () =>  api.get(`${URL}/tweet`);
export const getTweetById =  (id) =>  api.get(`${URL}/tweet/${id}`);
export const getAllTweets =  () =>  api.get(`${URL}/alltweets`);
export const getAllUsers =  () =>  api.get(`${URL}/allusers`);
export const getUserById =  (id) =>  api.get(`${URL}/user/${id}`);
export const getTweetsByUserId =  (id) =>  api.get(`${URL}/tweet/user/${id}`);

export const followUnfollowUser =  (id) =>  api.get(`${URL}/follow-unfollow-toggle/${id}`);
export const isFollowing =  (id) =>  api.get(`${URL}/is-following/${id}`);

export const replyTweet =  (data) =>  api.post(`${URL}/reply-tweet`, data );
export const getReplies =  (id) =>  api.get(`${URL}/get-replies/${id}`);

export const getData =  (id) =>  api.get(`${URL}/get-data/${id}`);

export const likeUnlikeTweet =  (id) =>  api.get(`${URL}/like-unlike-toggle/${id}`);

export const test = () =>  api.get(`${URL}/test-redirect`);

api.interceptors.response.use(response => {
    return response;
    }, error => {
        console.log(error.message);
      if (error.response.status === 401) {
           console.log("UNAUTHORIZED");
           authStore.dispatch(setAuth(false));
      }
      return error;
    });


