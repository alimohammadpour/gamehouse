import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type VerifyCodePendingPayloadType = { email: string; code: string };
export type RequestStartTrialPendingPayloadType = { user_id: number };

export interface UserState {
  email: string;
  pending: boolean;
  error: string | null;
  userId: number | null;
  isSubscribed: boolean;
}

export const initialState: UserState = {
  email: '',
  pending: false,
  error: null,
  userId: null,
  isSubscribed: false,
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
    },
    requestStartTrialPending(state, { payload }: PayloadAction<RequestStartTrialPendingPayloadType>) {
      state.pending = true;
    },
    requestStartTrialSuccess(state) {
      state.isSubscribed = true
      state.pending = false;
    },
    requestStartTrialFailure(state, { payload }: PayloadAction<string>) {
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
  requestStartTrialPending,
  requestStartTrialSuccess,
  requestStartTrialFailure,
} = userSlice.actions;

export default userSlice.reducer;
