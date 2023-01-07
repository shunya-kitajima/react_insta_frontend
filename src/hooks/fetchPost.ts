import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PROPS_NEWPOST, PROPS_LIKED, PROPS_COMMENT } from '../features/types'

const postApiUrl = `${process.env.REACT_APP_DEV_API_URL as string}/api/post/`
const commentApiUrl = `${
  process.env.REACT_APP_DEV_API_URL as string
}/api/comment/`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const fetchPost = () => {
  const fetchAsyncGetPosts = createAsyncThunk('post/get', async () => {
    const res = await axios.get(postApiUrl, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT as string}`,
      },
    })
    return res.data
  })

  return { fetchAsyncGetPosts }
}
