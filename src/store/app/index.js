import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'app',
  initialState: {
    loggedIn: false,
    profile: {},
    token: '',
    bureaus:[],
    bureauLeads: []
  },
  reducers: {
    setUser: (state,action) =>{
      state.profile = action.payload.user
    },
    setToken:(state,action)=>{
      state.loggedIn = true
      state.token = action.payload.token
    },
    addBureau: (state,action)=>{
      state.bureaus = [action.payload.bureau,...state.bureaus]
    },
    setBureaus: (state,action)=>{
      state.bureaus = action.payload.bureaus
    },
    addBureauLead: (state,action)=>{
      state.bureauLeads = [action.payload.bureauLead,...state.bureauLeads]
    },
    setBureauLeads: (state,action)=>{
      state.bureauLeads = action.payload.bureauLeads
    },
    logOut: (state) => {
      state.profile = {}
      state.token = ''
      state.loggedIn = false
      state.bureaus = []
      state.bureauLeads = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser,setToken,setBureaus,addBureau,setBureauLeads,addBureauLead,logOut } = authSlice.actions

export default authSlice.reducer