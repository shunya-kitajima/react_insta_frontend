import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Modal from 'react-modal'
import { TextField, Button, CircularProgress } from '@material-ui/core'
import { AppDispatch } from '../../app/store'
import { fetchAuth } from '../../hooks/fetchAuth'
import { fetchPost } from '../../hooks/fetchPost'
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
    backgroundColor: '#777777',
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

const schema = Yup.object().shape({
  email: Yup.string().email('email format ist wrong').required('email is must'),
  password: Yup.string().required('password is must').min(4),
})

const Auth: React.FC = () => {
  Modal.setAppElement('#root')
  const dispatch: AppDispatch = useDispatch()
  const openSignIn = useSelector(selectOpenSignIn)
  const openSignUp = useSelector(selectOpenSignUp)
  const isLoadingAuth = useSelector(selectIsLoadingAuth)
  const {
    fetchAsyncLogin,
    fetchAsyncRegister,
    fetchAsyncCreateProf,
    fetchAsyncGetMyProf,
    fetchAsyncGetProfs,
  } = fetchAuth()
  const { fetchAsyncGetPosts, fetchAsyncGetComments } = fetchPost()

  return (
    <>
      <Modal
        isOpen={openSignUp}
        onRequestClose={() => {
          dispatch(setOpenSignIn())
          dispatch(resetOpenSignUp())
        }}
        style={customStyles}
      >
        <Formik
          initialErrors={{ email: 'required' }}
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            dispatch(fetchCredStart())
            const resultReg = await dispatch(fetchAsyncRegister(values))

            if (fetchAsyncRegister.fulfilled.match(resultReg)) {
              await dispatch(fetchAsyncLogin(values))
              await dispatch(fetchAsyncCreateProf({ nickName: 'anonymous' }))
              await dispatch(fetchAsyncGetProfs())
              await dispatch(fetchAsyncGetMyProf())
              await dispatch(fetchAsyncGetPosts())
              await dispatch(fetchAsyncGetComments())
            }
            dispatch(fetchCredEnd())
            dispatch(resetOpenSignUp())
          }}
          validationSchema={schema}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <div>
              <form onSubmit={handleSubmit}>
                <div className={styles.auth_signUp}>
                  <h1 className={styles.auth_title}>Insta Clone</h1>
                  <br />
                  <div className={styles.auth_progress}>
                    {isLoadingAuth && <CircularProgress />}
                  </div>
                  <br />
                  <TextField
                    placeholder="email"
                    type="input"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <br />
                  {touched.email === true &&
                  errors.email !== undefined &&
                  errors.email !== '' ? (
                    <div className={styles.auth_error}>{errors.email}</div>
                  ) : null}
                  <TextField
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <br />
                  {touched.password === true &&
                  errors.password !== undefined &&
                  errors.password !== '' ? (
                    <div className={styles.auth_error}>{errors.password}</div>
                  ) : null}
                  <br />
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                  >
                    Register
                  </Button>
                  <span
                    className={styles.auth_text}
                    onClick={() => {
                      dispatch(setOpenSignIn())
                      dispatch(resetOpenSignUp())
                    }}
                  >
                    You already have a account ?
                  </span>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </Modal>

      <Modal
        isOpen={openSignIn}
        onRequestClose={() => {
          dispatch(setOpenSignUp())
          dispatch(resetOpenSignIn())
        }}
        style={customStyles}
      >
        <Formik
          initialErrors={{ email: 'required' }}
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            dispatch(fetchCredStart())
            const resultLog = await dispatch(fetchAsyncLogin(values))

            if (fetchAsyncLogin.fulfilled.match(resultLog)) {
              await dispatch(fetchAsyncGetProfs())
              await dispatch(fetchAsyncGetMyProf())
            }
            dispatch(fetchCredEnd())
            dispatch(resetOpenSignIn())
          }}
          validationSchema={schema}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <div>
              <form onSubmit={handleSubmit}>
                <div className={styles.auth_signUp}>
                  <h1 className={styles.auth_title}>Insta Clone</h1>
                  <br />
                  <div className={styles.auth_progress}>
                    {isLoadingAuth && <CircularProgress />}
                  </div>
                  <br />
                  <TextField
                    placeholder="email"
                    type="input"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <br />
                  {touched.email === true &&
                  errors.email !== undefined &&
                  errors.email !== '' ? (
                    <div className={styles.auth_error}>{errors.email}</div>
                  ) : null}
                  <TextField
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <br />
                  {touched.password === true &&
                  errors.password !== undefined &&
                  errors.password !== '' ? (
                    <div className={styles.auth_error}>{errors.password}</div>
                  ) : null}
                  <br />
                  <br />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                  >
                    Login
                  </Button>
                  <span
                    className={styles.auth_text}
                    onClick={() => {
                      dispatch(setOpenSignUp())
                      dispatch(resetOpenSignIn())
                    }}
                  >
                    You dont have a account ?
                  </span>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default Auth
