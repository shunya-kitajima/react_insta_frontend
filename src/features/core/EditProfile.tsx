import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import Modal from 'react-modal'
import { Button, TextField, IconButton } from '@material-ui/core'
import { MdAddAPhoto } from 'react-icons/md'
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
  const [image, setImage] = useState<File | null>(null)

  return <div></div>
}

export default EditProfile
