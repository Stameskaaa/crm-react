import { configureStore } from '@reduxjs/toolkit';
import mainSlice from '../features/slice/mainSlice';
import taskSlice from '../features/slice/taskSlice';
import languagesSlice from '../features/slice/languagesSlice';

const store = configureStore({
  reducer: {
    main: mainSlice,
    task: taskSlice,
    language: languagesSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
