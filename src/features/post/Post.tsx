import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { makeStyles } from '@material-ui/core'
import { Avatar, Divider, Checkbox } from '@material-ui/core'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { selectProfiles } from '../auth/authSlice'
import { fetchPost } from '../../hooks/fetchPost'
import { fetchPostStart, fetchPostEnd, selectComments } from './postSlice'
import { PROPS_POST } from '../types'
import styles from './Post.modlule.css'

const Post: React.FC<PROPS_POST> = ({
  postId,
  title,
  loginId,
  userPost,
  imageUrl,
  liked,
}) => {
  const { fetchAsyncPostComment, fetchAsyncPatchLiked } = fetchPost()

  return <div></div>
}

export default Post
