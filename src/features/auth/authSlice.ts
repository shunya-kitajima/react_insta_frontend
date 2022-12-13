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
  reducers: {
    fetchCredStart(state) {
      state.isLoadingAuth = true
    },
    fetchCredEnd(state) {
      state.isLoadingAuth = false
    },
    setOpenSignIn(state) {
      state.openSignIn = true
    },
    resetOpenSignIn(state) {
      state.openSignIn = false
    },
    setOpenSignUp(state) {
      state.openSignUp = true
    },
    resetOpenSignUp(state) {
      state.openSignUp = false
    },
    setOpenProfile(state) {
      state.openProfile = true
    },
    resetOpenProfile(state) {
      state.openProfile = false
    },
    editNickName(state, action) {
      state.myprofile.nickName = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const {} = authSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export default authSlice.reducer
