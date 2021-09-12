import axios from 'axios';
import config from '../config/config';

function getPosts({ skip, limit }) {
  return axios({
    method: 'GET',
    withCredentials: true,
    url: `${config.apiUrl}/api/v1/posts/`,
    params: {
      skip,
      limit,
    },
  });
}

function addPost(post) {
  // a post might consist image with caption so multipart form data is sent
  const postData = new FormData();
  postData.append('image', post.image);
  postData.append('caption', post.caption);

  return axios({
    method: 'POST',
    withCredentials: true,
    url: `${config.apiUrl}/api/v1/posts/`,
    data: postData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function addComment({ comment, postId }) {
  return axios({
    method: 'POST',
    withCredentials: true,
    url: `${config.apiUrl}/api/v1/comments/`,
    data: { comment, postId },
  });
}

const postService = { getPosts, addPost, addComment };
export default postService;
