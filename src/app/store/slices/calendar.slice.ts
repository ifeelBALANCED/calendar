import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicDates, IHolidays } from 'types';
import { format } from 'date-fns';
import { holidaysThunk } from '../thunk';

interface IState {
  holidays: IHolidays[];
  selectedDate: string | null;
  showModal: boolean;
  today: string | null;
  tasks: DynamicDates;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  task: string;
  taskId: number | null;
}

const initialState: IState = {
  holidays: [],
  selectedDate: null,
  showModal: false,
  today: null,
  tasks: {},
  isLoading: false,
  isError: false,
  errorMessage: '',
  task: '',
  taskId: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    handleSetToday(state: IState) {
      state.today = format(new Date(), 'yyyy-MM-dd');
      state.selectedDate = format(new Date(), 'yyyy-MM-dd');
    },
    selectDate(state: IState, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    showModalWindow(
      state: IState,
      action: PayloadAction<{ show: boolean; task: string; taskId: number | null }>
    ) {
      state.showModal = action.payload.show;
      state.task = action.payload.task;
      state.taskId = action.payload.taskId;
    },
    addTask(
      state: IState,
      action: PayloadAction<{ date: string | null; task: { text: string; id: number | null } }>
    ) {
      const validDate = () => {
        return action.payload.date ? new Date(action.payload.date) : new Date();
      };
      if (state.tasks[format(validDate(), 'yyyy-MM-dd')] && action.payload.task.id) {
        state.tasks = {
          ...state.tasks,
          [format(validDate(), 'yyyy-MM-dd')]: [
            ...state.tasks[format(validDate(), 'yyyy-MM-dd')].map((el) => {
              if (el.id === action.payload.task.id) {
                return {
                  id: action.payload.task.id,
                  task: action.payload.task.text,
                };
              }
              return el;
            }),
          ],
        };
      } else if (state.tasks[format(validDate(), 'yyyy-MM-dd')]) {
        state.tasks = {
          ...state.tasks,
          [format(validDate(), 'yyyy-MM-dd')]: [
            ...state.tasks[format(validDate(), 'yyyy-MM-dd')],
            { id: Math.random(), task: action.payload.task.text },
          ],
        };
      } else {
        state.tasks = {
          ...state.tasks,
          [format(validDate(), 'yyyy-MM-dd')]: [
            {
              id: Math.random(),
              task: action.payload.task.text,
            },
          ],
        };
      }
    },
    removeTask(state: IState, action: PayloadAction<{ date: string; id: number }>) {
      state.tasks = {
        ...state.tasks,
        [action.payload.date]: [...state.tasks[action.payload.date]].filter(
          (el) => el.id !== action.payload.id
        ),
      };
      if (![...state.tasks[action.payload.date]].length) {
        delete state.tasks[action.payload.date];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(holidaysThunk.pending, (state: IState) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(holidaysThunk.fulfilled, (state: IState, action: PayloadAction<IHolidays[]>) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = '';
        state.holidays = action.payload;
      })
      .addCase(holidaysThunk.rejected, (state: IState, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.holidays = [];
      });
  },
});

export const { handleSetToday, selectDate, showModalWindow, addTask, removeTask } =
  calendarSlice.actions;
export const CalendarReducer = calendarSlice.reducer;
