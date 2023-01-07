import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

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
