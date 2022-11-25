import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    profile: {},
    token: '',
    value: 0
  },
  reducers: {
    setUser: (state,action) =>{
      state.profile = action.payload.user
    },
    setToken:(state,action)=>{
      state.token = action.payload.token
    },
    logout: (state) => {
      state.profile = {}
      state.token = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser,setToken } = authSlice.actions

export default authSlice.reducer