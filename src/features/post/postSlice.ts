import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { fetchPost } from '../../hooks/fetchPost'

const {
  fetchAsyncGetPosts,
  fetchAsyncNewPost,
  fetchAsyncPatchLiked,
  fetchAsyncGetComments,
  fetchAsyncPostComment,
} = fetchPost()

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLoadingPost: false,
    openNewPost: false,
    posts: [
      {
        id: '',
        title: '',
        userPost: '',
        created_at: '',
        img: '',
        liked: [''],
      },
    ],
    comments: [
      {
        id: '',
        text: '',
        userComment: '',
        post: '',
      },
    ],
  },
  reducers: {
    fetchPostStart(state) {
      state.isLoadingPost = true
    },
    fetchPostEnd(state) {
      state.isLoadingPost = false
    },
    setOpenNewPost(state) {
      state.openNewPost = true
    },
    resetOpenNewPost(state) {
      state.openNewPost = false
    },
  },
})

export default postSlice.reducer
