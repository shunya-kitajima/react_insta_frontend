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

const Auth: React.FC = () => {
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
