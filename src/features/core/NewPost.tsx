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
      ></Modal>
    </>
  )
}

export default NewPost
