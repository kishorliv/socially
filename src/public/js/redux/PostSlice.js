/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setNotification } from './NotificationSlice';
import postService from '../services/postService';

const createPost = createAsyncThunk(
  'post/createPost',
  async ({ caption, image }, { rejectWithValue, dispatch }) => {
    try {
      const response = await postService.addPost({ caption, image });
      const { data } = response.data;

      return data;
    } catch (err) {
      const { message } = err.response.data.error;

      dispatch(
        setNotification({
          message,
          isError: true,
        }),
      );

      return rejectWithValue(message);
    }
  },
);

const getPosts = createAsyncThunk(
  'post/getPosts',
  async ({ skip, limit }, { rejectWithValue, dispatch }) => {
    try {
      const response = await postService.getPosts({ skip, limit });
      const { data } = response.data;

      console.log('data: ', data);

      return data;
    } catch (err) {
      const { message } = err.response.data.error;

      dispatch(
        setNotification({
          message,
          isError: true,
        }),
      );

      return rejectWithValue(message);
    }
  },
);

const PostSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    totalPostsCount: -1, // post not fetched from api, will be 0 if fetched with 0 posts
    loading: false,
    error: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.rejected]: (state, { payload }) => {
      state.error = true;
      state.errorMessage = payload;
      state.loading = false;
    },
    [createPost.fulfilled]: (state, { payload }) => {
      state.posts.unshift(payload);
      state.loading = false;
      state.error = false;
      state.errorMessage = null;
    },

    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.rejected]: (state, { payload }) => {
      state.error = true;
      state.errorMessage = payload;
      state.loading = false;
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts.push(...payload.posts);
      state.totalPostsCount =
        payload.posts.length === 0 ? state.totalPostsCount + 1 : payload.count;
      state.loading = false;
      state.error = false;
      state.errorMessage = null;
    },
  },
});

export { createPost, getPosts };
export default PostSlice.reducer;