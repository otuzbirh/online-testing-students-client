import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialAuthState = JSON.parse(localStorage.getItem('authState')) || {
  isAuthenticated: false,
  role: null,
  userID: null,
  name: "",
  surname: ""
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUserID: (state, action ) => {
        state.userID = action.payload
    },
    setName: (state, action ) => {
      state.name = action.payload
    },
    setSurname: (state, action ) => {
      state.surname = action.payload
   }
  },
});

export const { setIsAuthenticated, setRole, setUserID, setName, setSurname } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// Spremi podatke o autentifikaciji u lokalnom skladištu prije nego se stranica osvježi ili zatvori.
store.subscribe(() => {
  const authState = store.getState().auth;
  localStorage.setItem('authState', JSON.stringify(authState));
});

export default store;

