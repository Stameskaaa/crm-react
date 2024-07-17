import { createSlice } from '@reduxjs/toolkit';
import { CommentRespone, ResultsDesignerResponse } from '../../types/types';

export interface MainState {
  lastsComments: CommentRespone[];
  topDesigners: [ResultsDesignerResponse, string][];
}

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    lastsComments: [],
    topDesigners: [],
  } as MainState,
  reducers: {
    setLastsComments: (state, action) => {
      state.lastsComments = action.payload;
    },
    setTopDesigners: (state, action) => {
      state.topDesigners = action.payload;
    },
  },
});

export const { setLastsComments, setTopDesigners } = mainSlice.actions;
export default mainSlice.reducer;
