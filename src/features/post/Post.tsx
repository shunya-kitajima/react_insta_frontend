import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import {
  makeStyles,
  createStyles,
  Theme,
  Avatar,
  Divider,
  Checkbox,
} from '@material-ui/core'

import { Favorite, FavoriteBorder } from '@material-ui/icons'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { selectProfiles } from '../auth/authSlice'
import { fetchPost } from '../../hooks/fetchPost'
import { fetchPostStart, fetchPostEnd, selectComments } from './postSlice'
import { PROPS_POST } from '../types'
import styles from './Post.modlule.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
  })
)

const Post: React.FC<PROPS_POST> = ({
  postId,
  title,
  loginId,
  userPost,
  imageUrl,
  liked,
}) => {
  const dispatch: AppDispatch = useDispatch()
  const [text, setText] = useState('')
  const classes = useStyles()
  const profiles = useSelector(selectProfiles)
  const comments = useSelector(selectComments)
  const commentsOnPost = comments.filter((comment) => (comment.post = postId))
  const profiel = profiles.filter((prof) => prof.userProfile === userPost)
  const { fetchAsyncPostComment, fetchAsyncPatchLiked } = fetchPost()

  const postCommentHandler = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault()
    const packet = { text, post: postId }
    dispatch(fetchPostStart())
    await dispatch(fetchAsyncPostComment(packet))
    dispatch(fetchPostEnd)
    setText('')
  }

  const patchLikedHandler = async (): Promise<void> => {
    const packet = {
      id: postId,
      title,
      current: liked,
      new: loginId,
    }
    dispatch(fetchPostStart())
    await dispatch(fetchAsyncPatchLiked(packet))
    dispatch(fetchPostEnd)
  }

  return <div></div>
}

export default Post
