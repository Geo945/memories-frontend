import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })

//this is gonna be a function that is going to happen on every request we send
API.interceptors.request.use((req) => {
    //we want to send the token before any request we make
    //so the middleware from the backend can check it and allow us to make requests
    if( localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    //with interceptors we have to return the actual req so we can make all the future requests
    return req;
});

//const url = 'https://geo-memories-project.herokuapp.com/posts/'
//const url = 'http://localhost:5000/posts/'; old
export const fetchPosts = (page) => {
    //return axios.get(url);   old
    return API.get(`/posts?page=${page}`);
};

export const fetchPost = (id) => {
    return API.get(`/posts/${id}`);
};

export const fetchPostsBySearch = (searchQuery) => {
    return API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
};

export const createPost = (newPost) => {
    return API.post('/posts', newPost)
};

export const updatePost = (id, updatedPost) => {
    return API.patch(`/posts/${id}`, updatedPost);
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};

export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`);
};

export const comment = (value, id) => {
  return API.post(`/posts/${id}/commentPost`, { value });
};

export const signIn = (formData) => {
    return API.post('/user/signin', formData);
};

export const signUp = (formData) => {
    return API.post('/user/signup', formData);
};

