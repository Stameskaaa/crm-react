import { createSlice } from '@reduxjs/toolkit';

export interface LanguageState {
  currentLanguageObject: Record<string, string>;
  currentLanguage: 'eng' | 'ru';
  theme: string;
}
const russianObject = {
  hello: 'Привет',
  main: 'Главная',
  task: 'Задачи',
  design: 'Дизайн',
  comments: 'Комментарии',
  noComments: 'Комментариев нет',
  noDesigners: 'Дизайнеров нет',
  bestDesigners: 'Лучшие дизайнеры',
  closedTasks: 'Закрытые задачи',
  inProcess: 'В процессе',
  day: 'Дней',
  hour: 'Часов',
  minute: 'Минут',
  second: 'Секунд',
  ago: 'назад',
  projectDone: 'Проектов сделано',
  timeWasted: 'Времени потрачено',
  h: 'ч',
  weekCount: 'Количество недель',
  noData: 'Данных нет',
  enterKey: 'Введите ключ проекта',
  sortBy: 'Сортировать по',
  status: 'Статус',
  emptyList: 'Список пуст',
  previous: 'Предыдущая',
  next: 'Следующая',
};

const englishObject = {
  hello: 'Hello',
  main: 'Main',
  task: 'Tasks',
  design: 'Design',
  comments: 'Сomments',
  noComments: 'No comments yet',
  noDesigners: 'No designer yet',
  bestDesigners: 'Best designers',
  closedTasks: 'Closed tasks',
  inProcess: 'In process',
  day: 'day',
  hour: 'Hour',
  minute: 'Minute',
  second: 'Second',
  ago: 'ago',
  projectDone: 'Projects done',
  timeWasted: 'Time wasted',
  h: 'h',
  weekCount: 'Week count',
  noData: 'No data',
  enterKey: 'Enter the project key',
  sortBy: 'Sort By',
  status: 'Status',
  emptyList: 'The list is empty',
  previous: 'Previous',
  next: 'Next',
};

const initialState: LanguageState = {
  currentLanguageObject: englishObject,
  currentLanguage: 'eng',
  theme: 'light',
};
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state) => {
      if (state.currentLanguage === 'eng') {
        state.currentLanguage = 'ru';
        state.currentLanguageObject = russianObject;
      } else {
        state.currentLanguage = 'eng';
        state.currentLanguageObject = englishObject;
      }
    },
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { changeLanguage, changeTheme } = languageSlice.actions;
export default languageSlice.reducer;
