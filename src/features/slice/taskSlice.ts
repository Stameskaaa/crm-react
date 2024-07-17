import { createSlice } from '@reduxjs/toolkit';
import { Finances, Ratio } from '../../types/types';

export interface TaskState {
  calculatedFinances: Finances[];
  calculatedRatio: Ratio | undefined;
}

const mainSlice = createSlice({
  name: 'task',
  initialState: {
    calculatedFinances: [],
    calculatedRatio: undefined,
  } as TaskState,
  reducers: {
    setCalculatedFinances: (state, action) => {
      state.calculatedFinances = action.payload;
    },
    setCalculatedRatio: (state, action) => {
      state.calculatedRatio = action.payload;
    },
  },
});

export const { setCalculatedFinances, setCalculatedRatio } = mainSlice.actions;
export default mainSlice.reducer;
