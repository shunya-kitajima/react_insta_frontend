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
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
      }
    })
    builder.addCase(fetchAsyncNewPost.fulfilled, (state, action) => {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }
    })
    builder.addCase(fetchAsyncPatchLiked.fulfilled, (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      }
    })
    builder.addCase(fetchAsyncGetComments.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
      }
    })
    builder.addCase(fetchAsyncPostComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      }
    })
  },
})

export const {
  fetchPostStart,
  fetchPostEnd,
  setOpenNewPost,
  resetOpenNewPost,
} = postSlice.actions

export const selectIsloadingPost = (state: RootState): boolean =>
  state.post.isLoadingPost

export const selectOpenNewPost = (state: RootState): boolean =>
  state.post.openNewPost

export const selectPosts = (
  state: RootState
): Array<{
  id: string
  title: string
  userPost: string
  created_at: string
  img: string
  liked: string[]
}> => state.post.posts

export const selectComments = (
  state: RootState
): Array<{
  id: string
  text: string
  userComment: string
  post: string
}> => state.post.comments

export default postSlice.reducer
