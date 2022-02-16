import React from 'react';
import { Grid, CircularProgress } from "@material-ui/core";

import Post from './Post/Post';
import { useSelector } from "react-redux";

import useStyles from './styles'

const Posts = ({ setCurrentId }) => {
    //to acces any redux state need useSelector, the state contains everything
    const posts = useSelector((state) => state.posts.posts);
    const isLoading = useSelector((state) => state.posts.isLoading);
    //cele doua linii de mai sus sunt egale cu:
    //const { posts, isLoading } = useSelector( (state) => state.posts.posts); // [] inainte, acuma: { posts: [] }       - inainte era doar state.posts

    const classes = useStyles();

    if(!posts?.length && !isLoading) {//if there are no posts and we are not loading
        return 'No posts';
    }

    return(
        isLoading ? <CircularProgress /> : (
                <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                    {
                        posts.map((post) => (
                             post._id  &&
                                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                                    <Post post={post} setCurrentId={setCurrentId} />
                                </Grid>

                        ))
                    }
                </Grid>
            )

    )
};

export default Posts;