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
import styles from './Post.module.css'

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
  const commentsOnPost = comments.filter((comment) => comment.post === postId)
  const profile = profiles.filter((prof) => prof.userProfile === userPost)
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

  if (title !== '') {
    return (
      <div className={styles.post}>
        <div className={styles.post_header}>
          <Avatar className={styles.post_avatar} src={profile[0]?.img} />
          <h3>{profile[0]?.nickName}</h3>
        </div>
        <img className={styles.post_image} src={imageUrl} alt="" />
        <h4 className={styles.post_text}>
          <Checkbox
            className={styles.post_checkBox}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={liked.some((like) => like === loginId)}
            onChange={patchLikedHandler}
          />
          <strong>{profile[0]?.nickName}</strong>
          {title}
          <AvatarGroup max={7}>
            {liked.map((like) => (
              <Avatar
                className={styles.post_avatarGroup}
                key={like}
                src={profiles.find((prof) => prof.userProfile === like)?.img}
              />
            ))}
          </AvatarGroup>
        </h4>
      </div>
    )
  }
  return null
}

export default Post
