import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { fetchAuth } from '../../hooks/fetchAuth'

const {
  fetchAsyncLogin,
  fetchAsyncCreateProf,
  fetchAsyncUpdateProf,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
} = fetchAuth()

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
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem('localJWT', action.payload.access)
    })
    builder.addCase(fetchAsyncCreateProf.fulfilled, (state, action) => {
      state.myprofile = action.payload
    })
    builder.addCase(fetchAsyncUpdateProf.fulfilled, (state, action) => {
      state.myprofile = action.payload
      state.profiles = state.profiles.map((prof) =>
        prof.id === action.payload.id ? action.payload : prof
      )
    })
    builder.addCase(fetchAsyncGetMyProf.fulfilled, (state, action) => {
      state.myprofile = action.payload
    })
    builder.addCase(fetchAsyncGetProfs.fulfilled, (state, action) => {
      state.profiles = action.payload
    })
  },
})

export const {
  fetchCredStart,
  fetchCredEnd,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  setOpenProfile,
  resetOpenProfile,
  editNickName,
} = authSlice.actions

export const selectOpenSignIn = (state: RootState): boolean =>
  state.auth.openSignIn

export const selectOpenSignUp = (state: RootState): boolean =>
  state.auth.openSignUp

export const selectOpenProfile = (state: RootState): boolean =>
  state.auth.openProfile

export const selectIsLoadingAuth = (state: RootState): boolean =>
  state.auth.isLoadingAuth

export const selectProfile = (
  state: RootState
): {
  id: string
  nickName: string
  userProfile: string
  img: string
  created_at: string
} => state.auth.myprofile

export const selectProfiles = (
  state: RootState
): Array<{
  id: string
  nickName: string
  userProfile: string
  img: string
  created_at: string
}> => state.auth.profiles

export default authSlice.reducer
