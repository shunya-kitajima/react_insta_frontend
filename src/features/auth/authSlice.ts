import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store'
import { File, PROPS_AUTHEN, PROPS_PROFILE, PROPS_NICKNAME } from '../types'

const apiUrl = process.env.REACT_APP_DEV_API_URL

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    openSignIn: true,
    openSignUp: false,
    openProfile: false,
    isLoadingAuth: false,
    myprofile: {
      id: '',
      nickName: '',
      userProfile: '',
      img: '',
      created_at: '',
    },
    profiles: [
      {
        id: '',
        nickName: '',
        userProfile: '',
        img: '',
        created_at: '',
      },
    ],
  },
  reducers: {},
  extraReducers: (builder) => {},
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export default authSlice.reducer
