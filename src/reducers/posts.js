import { FETCH_ALL, CREATE, FETCH_POST, DELETE, UPDATE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, COMMENT} from "../constants/actionTypes";

//a reducer is a function
//state always need to be equals to something so we set the default value to []
export default (state = { post: {}, isLoading: true, posts: [] }, action) => {
    switch(action.type){
        case START_LOADING:
            return { ...state, isLoading: true}
        case END_LOADING:
            return { ...state, isLoading: false}
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload
            };
        case COMMENT:
            return {
              ...state,
              posts: state.posts.map((post) => {
                  if(post._id === action.payload._id) return action.payload;
                  return post;
              }),
            };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
};