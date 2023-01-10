import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import Modal from 'react-modal'
import { Button, TextField, IconButton } from '@material-ui/core'
import { MdAddAPhoto } from 'react-icons/md'
import { fetchPost } from '../../hooks/fetchPost'
import {
  fetchPostStart,
  fetchPostEnd,
  selectOpenNewPost,
  resetOpenNewPost,
} from '../post/postSlice'
import { File } from '../types'
import styles from './Core.module.css'

const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    width: 280,
    height: 220,
    padding: '50px',
    transform: 'translate(-50%, -50%)',
  },
}

const NewPost: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { fetchAsyncNewPost } = fetchPost()
  const openNewPost = useSelector(selectOpenNewPost)
  const [image, setImage] = useState<File | null>(null)
  const [title, setTitle] = useState('')

  const newPost = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    const packet = { title, img: image }
    dispatch(fetchPostStart())
    await dispatch(fetchAsyncNewPost(packet))
    dispatch(fetchPostEnd())
    setImage(null)
    setTitle('')
    dispatch(resetOpenNewPost())
  }

  const editPictureHandler = (): void => {
    const fileInput = document.getElementById('imageInput')
    fileInput?.click()
  }

  return (
    <>
      <Modal
        isOpen={openNewPost}
        onRequestClose={() => dispatch(resetOpenNewPost())}
        style={customStyles}
      >
        <form
          className={styles.core_signUp}
          onSubmit={async (e) => await newPost(e)}
        >
          <h1 className={styles.core_title}>Insta Clone</h1>
          <br />
          <TextField
            placeholder="Please enter caption"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            id="imageInput"
            hidden
            onChange={(e) =>
              setImage(
                e.target.files === undefined || e.target.files === null
                  ? null
                  : e.target.files[0]
              )
            }
          />
          <br />
          <IconButton onClick={editPictureHandler}>
            <MdAddAPhoto />
          </IconButton>
          <br />
          <Button
            disabled={title === '' || image === null}
            variant="contained"
            color="primary"
            type="submit"
          >
            New Post
          </Button>
        </form>
      </Modal>
    </>
  )
}

export default NewPost
