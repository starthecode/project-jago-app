// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentUser: null,
//   error: null,
//   loading: false,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     signInStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },

//     signInSuccess: (state, action) => {
//       state.currentUser = action.payload;
//       state.loading = false;
//       state.error = null;
//     },

//     signInFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     updateStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     updateSuccess: (state, action) => {
//       state.currentUser = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     updateFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     signoutSuccess: (state) => {
//       state.currentUser = null;
//       state.error = null;
//       state.loading = false;
//     },
//   },
// });

// export const {
//   signInStart,
//   signInSuccess,
//   signInFailure,
//   updateStart,
//   updateSuccess,
//   updateFailure,
//   signoutSuccess,
// } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/types'; // or wherever you define the type

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    signInSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    updateFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
