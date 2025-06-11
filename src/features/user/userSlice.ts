import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  verificationCode: string;
  pending: boolean;
  error: string | null;
}

const initialState: UserState = {
  email: '',
  verificationCode: '',
  pending: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requestCodePending(state, { payload }: PayloadAction<string>) {
      state.email = payload
      state.pending = true;
    },
    requestCodeSuccess(state, { payload }: PayloadAction<string>) {
      state.verificationCode = payload;
      state.pending = false;
    },
    requestCodeFailure(state, { payload }: PayloadAction<string>) {
      state.pending = false;
      state.error = payload;
    }
  }
});

export const {
  requestCodePending,
  requestCodeSuccess,
  requestCodeFailure
} = userSlice.actions;

export default userSlice.reducer;
