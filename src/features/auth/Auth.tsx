import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Modal from 'react-modal'
import { TextField, Button, CircularProgress } from '@material-ui/core'
import { AppDispatch } from '../../app/store'
import { fetchAuth } from '../../hooks/fetchAuth'
import {
  fetchCredStart,
  fetchCredEnd,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  selectOpenSignIn,
  selectOpenSignUp,
  selectIsLoadingAuth,
} from './authSlice'
import styles from './Auth.module.css'

const customStyles = {
  overlay: {
    backgroundColor: '#7777777',
  },
  content: {
    top: '55%',
    left: '50%',
    width: 280,
    height: 350,
    padding: '50px',
    transform: 'translate(-50%, -50%)',
  },
}

const Auth: React.FC = () => {
  Modal.setAppElement('#root')
  const dispatch: AppDispatch = useDispatch()
  const openSignIn = useSelector(selectOpenSignIn)
  const openSignUp = useSelector(selectOpenSignUp)
  const isLoadingAuth = useSelector(selectIsLoadingAuth)
  const {
    fetchAsyncLogin,
    fetchAsyncCreateProf,
    fetchAsyncUpdateProf,
    fetchAsyncGetMyProf,
    fetchAsyncGetProfs,
  } = fetchAuth()

  return <div></div>
}

export default Auth
