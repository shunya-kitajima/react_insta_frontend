import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { Theme, withStyles, createStyles } from '@material-ui/core/styles'
import {
  Button,
  Grid,
  Avatar,
  Badge,
  CircularProgress,
} from '@material-ui/core'
import { MdAddAPhoto } from 'react-icons/md'
import { fetchAuth } from '../../hooks/fetchAuth'
import { fetchPost } from '../../hooks/fetchPost'
import {
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  setOpenProfile,
  resetOpenProfile,
  editNickName,
  selectProfile,
  selectIsLoadingAuth,
} from '../auth/authSlice'
import {
  setOpenNewPost,
  resetOpenNewPost,
  selectIsloadingPost,
  selectPosts,
} from '../post/postSlice'
import Auth from '../auth/Auth'
import styles from './Core.module.css'

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  })
)(Badge)

const Core: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const profile = useSelector(selectProfile)
  const posts = useSelector(selectPosts)
  const isLoadingAuth = useSelector(selectIsLoadingAuth)
  const isLoadingPost = useSelector(selectIsloadingPost)
  const { fetchAsyncGetMyProf, fetchAsyncGetProfs } = fetchAuth()
  const { fetchAsyncGetPosts, fetchAsyncGetComments } = fetchPost()

  useEffect(() => {
    const fetchBootLoader = async (): Promise<void> => {
      if (localStorage.localJWT !== undefined) {
        dispatch(resetOpenSignIn())
        const result = await dispatch(fetchAsyncGetMyProf())
        if (fetchAsyncGetMyProf.rejected.match(result)) {
          dispatch(setOpenSignIn())
        }
        await dispatch(fetchAsyncGetProfs())
        await dispatch(fetchAsyncGetPosts())
        await dispatch(fetchAsyncGetComments())
      }
    }
    void fetchBootLoader()
  }, [dispatch])

  return (
    <div>
      <Auth />
      <div className={styles.core_header}>
        <h1 className={styles.core_title}>Insta Clone</h1>
        {profile?.nickName !== '' ? (
          <>
            <button
              className={styles.core_btnModal}
              onClick={() => {
                dispatch(setOpenNewPost())
                dispatch(resetOpenProfile())
              }}
            >
              <MdAddAPhoto />
            </button>
            <div className={styles.core_logout}>
              {(isLoadingAuth || isLoadingPost) && <CircularProgress />}
              <Button
                onClick={() => {
                  localStorage.removeItem('localJWT')
                  dispatch(editNickName(''))
                  dispatch(resetOpenProfile())
                  dispatch(resetOpenNewPost())
                  dispatch(setOpenSignIn())
                }}
              >
                Logout
              </Button>
              <button
                className={styles.core_btnModal}
                onClick={() => {
                  dispatch(setOpenProfile())
                  dispatch(resetOpenNewPost())
                }}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant="dot"
                >
                  <Avatar alt="who?" src={profile.img} />
                </StyledBadge>
              </button>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default Core
