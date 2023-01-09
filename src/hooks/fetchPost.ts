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

  const fetchAsyncNewPost = createAsyncThunk(
    'post/post',
    async (newPost: PROPS_NEWPOST) => {
      const uploadData = new FormData()
      uploadData.append('title', newPost.title)
      if (newPost.img !== null)
        uploadData.append('img', newPost.img, newPost.img.name)
      const res = await axios.post(postApiUrl, uploadData, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `JWT ${localStorage.localJWT as string}`,
        },
      })
      return res.data
    }
  )

  const fetchAsyncPatchLiked = createAsyncThunk(
    'post/patch',
    async (liked: PROPS_LIKED) => {
      const currentLiked = liked.current
      const likedArray: string[] = []
      let uploadData = {}

      let isOverlapped = false
      currentLiked.forEach((current) => {
        if (current === liked.new) {
          isOverlapped = true
        } else {
          likedArray.push(current)
        }
      })

      if (!isOverlapped) {
        likedArray.push(liked.new)
      } else if (currentLiked.length === 1) {
        uploadData = {
          title: liked.title,
          liekd: [],
        }
        const res = await axios.put(`${postApiUrl}${liked.id}/`, uploadData, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `JWT ${localStorage.localJWT as string}`,
          },
        })
        return res.data
      }
      uploadData = {
        liekd: likedArray,
      }
      const res = await axios.patch(`${postApiUrl}${liked.id}/`, uploadData, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `JWT ${localStorage.localJWT as string}`,
        },
      })
      return res.data
    }
  )

  const fetchAsyncGetComments = createAsyncThunk('comment/get', async () => {
    const res = await axios.get(commentApiUrl, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT as string}`,
      },
    })
    return res.data
  })

  const fetchAsyncPostComment = createAsyncThunk(
    'comment/post',
    async (comment: PROPS_COMMENT) => {
      const res = await axios.post(commentApiUrl, comment, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `JWT ${localStorage.localJWT as string}`,
        },
      })
      return res.data
    }
  )

  return {
    fetchAsyncGetPosts,
    fetchAsyncNewPost,
    fetchAsyncPatchLiked,
    fetchAsyncGetComments,
    fetchAsyncPostComment,
  }
}
