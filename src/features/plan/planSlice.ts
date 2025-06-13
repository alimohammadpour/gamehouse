import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type PlanDetailType = {
    price: string;
    currency: string;
    trial_days: number;
}

export type PlansType = Record<'monthly' | 'year', PlanDetailType>;

interface PlanState {
  pending: boolean;
  error: string | null;
  plans: PlansType | null;
}

const initialState: PlanState = {
  pending: false,
  error: null,
  plans: null,
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    requestGetPlansPending(state) {
      state.pending = true;
    },
    requestGetPlansSuccess(state, { payload }: PayloadAction<PlansType>) {
      state.pending = false;
      state.plans = payload;
    },
    requestGetPlansFailure(state, { payload }: PayloadAction<string>) {
      state.pending = false;
      state.error = payload;
    },
  }
});

export const {
  requestGetPlansPending,
  requestGetPlansSuccess,
  requestGetPlansFailure,
} = planSlice.actions;

export default planSlice.reducer;
