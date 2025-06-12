import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type VerifyCodePendingPayloadType = { email: string; code: string };

interface UserState {
  email: string;
  pending: boolean;
  error: string | null;
  userId: number | null;
}

const initialState: UserState = {
  email: '',
  pending: false,
  error: null,
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requestCodePending(state, { payload }: PayloadAction<string>) {
      state.email = payload
      state.pending = true;
    },
    requestCodeSuccess(state) {
      state.pending = false;
    },
    requestCodeFailure(state, { payload }: PayloadAction<string>) {
      state.pending = false;
      state.error = payload;
    },
    verifyCodePending(state, { payload }: PayloadAction<VerifyCodePendingPayloadType>) {
      state.pending = true;
    },
    verifyCodeSuccess(state, { payload }: PayloadAction<number>) {
      state.pending = false;
      state.userId = payload;
    },
    verifyCodeFailure(state, { payload }: PayloadAction<string>) {
      state.pending = false;
      state.error = payload;
    }
  }
});

export const {
  requestCodePending,
  requestCodeSuccess,
  requestCodeFailure,
  verifyCodePending,
  verifyCodeSuccess,
  verifyCodeFailure,
} = userSlice.actions;

export default userSlice.reducer;
