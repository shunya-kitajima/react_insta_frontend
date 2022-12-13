import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PROPS_AUTHEN, PROPS_NICKNAME, PROPS_PROFILE } from '../features/types'

const apiUrl = process.env.REACT_APP_DEV_API_URL as string

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const fetchAuth = () => {
  const fetchAsyncLogin = createAsyncThunk(
    'auth/post',
    async (authen: PROPS_AUTHEN) => {
      const res = await axios.post(`${apiUrl}authen/jwt/create`, authen, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      return res.data
    }
  )

  const fetchAsyncRegister = createAsyncThunk(
    'auth/register',
    async (authen: PROPS_AUTHEN) => {
      const res = await axios.post(`${apiUrl}api/register/`, authen, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      return res.data
    }
  )

  const fetchAsyncCreateProf = createAsyncThunk(
    'profile/post',
    async (nickName: PROPS_NICKNAME) => {
      const res = await axios.post(`${apiUrl}api/profile`, nickName, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `JWT ${localStorage.localJWT as string}`,
        },
      })
      return res.data
    }
  )

  const fetchAsyncUpdateProf = createAsyncThunk(
    'profile/update',
    async (profile: PROPS_PROFILE) => {
      const uploadData = new FormData()
      uploadData.append('nickName', profile.nickName)
      if (profile.img !== null)
        uploadData.append('img', profile.img, profile.img.name)
      const res = await axios.put(
        `${apiUrl}api/profile/${profile.id}`,
        uploadData,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `JWT ${localStorage.localJWT as string}`,
          },
        }
      )
      return res.data
    }
  )

  const fetchAsyncGetMyProf = createAsyncThunk('profile/get', async () => {
    const res = await axios.get(`${apiUrl}api/myprofile`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT as string}`,
      },
    })
    return res.data[0]
  })

  return {
    fetchAsyncLogin,
    fetchAsyncRegister,
    fetchAsyncCreateProf,
    fetchAsyncUpdateProf,
    fetchAsyncGetMyProf,
  }
}
