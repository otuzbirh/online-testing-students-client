import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  role: null,
  userID: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUserID: (state, action ) => {
        state.userID = action.payload
    }
  },
});

export const { setIsAuthenticated, setRole, setUserID } = authSlice.actions;

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
