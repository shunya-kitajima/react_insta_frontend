import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import Modal from 'react-modal'
import { Button, TextField, IconButton } from '@material-ui/core'
import { MdAddAPhoto } from 'react-icons/md'
import { fetchAuth } from '../../hooks/fetchAuth'
import {
  fetchCredStart,
  fetchCredEnd,
  resetOpenProfile,
  editNickName,
  selectProfile,
  selectOpenProfile,
} from '../auth/authSlice'
import { File } from '../types'
import styles from './Core.Module.css'

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

const EditProfile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const openProfile = useSelector(selectOpenProfile)
  const profile = useSelector(selectProfile)
  const [image, setImage] = useState<File | null | undefined>(null)
  const { fetchAsyncUpdateProf } = fetchAuth()

  const updateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    const packet = { id: profile.id, nickName: profile.nickName, img: image }
    dispatch(fetchCredStart())
    await dispatch(fetchAsyncUpdateProf(packet))
    dispatch(fetchCredEnd())
    dispatch(resetOpenProfile())
  }

  const editPictureHandler = (): void => {
    const fileInput = document.getElementById('imageInput')
    fileInput?.click()
  }

  return (
    <>
      <Modal
        isOpen={openProfile}
        onRequestClose={() => dispatch(resetOpenProfile())}
        style={customStyles}
      >
        <form
          className={styles.core_signUp}
          onSubmit={async (e) => await updateProfile(e)}
        >
          <h1 className={styles.core_title}>Insta Clone</h1>
          <br />
          <TextField
            placeholder="nickname"
            type="text"
            value={profile?.nickName}
            onChange={(e) => dispatch(editNickName(e.target.value))}
          />
          <input
            type="file"
            id="imageInput"
            hidden
            onChange={(e) => setImage(e.target.files?.[0])}
          />
          <br />
          <IconButton onClick={editPictureHandler}>
            <MdAddAPhoto />
          </IconButton>
          <br />
          <Button
            disabled={profile?.nickName === ''}
            variant="contained"
            color="primary"
            type="submit"
          >
            Update
          </Button>
        </form>
      </Modal>
    </>
  )
}

export default EditProfile
