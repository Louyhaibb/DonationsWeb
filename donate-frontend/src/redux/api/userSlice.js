import { createSlice } from '@reduxjs/toolkit';

const initialState = () => {
    const item = window.localStorage.getItem('userData')
    return { user: item ? JSON.parse(item) : {} }
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout: state => {
        state.user = {};
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem('userData');
        localStorage.removeItem('accessToken');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
