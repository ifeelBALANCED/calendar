import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicDates, IDnd, IHolidays, ITask } from 'types';
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
  label: string[];
  colorFilter: { date: string; color: string }[];
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
  label: [],
  colorFilter: [],
};
export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    loadTasks(state: IState, action: PayloadAction<DynamicDates>) {
      state.tasks = action.payload;
    },
    addColorFilter(state: IState, action: PayloadAction<{ date: string; color: string }>) {
      if (action.payload.color === '') {
        state.colorFilter = [...state.colorFilter].filter((el) => el.date !== action.payload.date);
      } else {
        state.colorFilter = [...state.colorFilter, action.payload];
      }
    },
    dragAndDrop(state: IState, action: PayloadAction<IDnd>) {
      const addElementsToTheDifferentCell = (
        from: ITask[],
        to: ITask[],
        srcIndex: number,
        destIndex: number
      ) => {
        const elementFrom = from[srcIndex];
        to.splice(destIndex, 0, elementFrom);
      };
      const swapElementsFromTheSameCell = (arr: ITask[], srcIndex: number, destIndex: number) => {
        const element = arr[srcIndex];
        arr.splice(srcIndex, 1);
        arr.splice(destIndex, 0, element);
      };
      if (action.payload.destination === action.payload.source) {
        swapElementsFromTheSameCell(
          state.tasks[action.payload.source],
          action.payload.sourceIndex,
          action.payload.destinationIndex
        );
        state.tasks = {
          ...state.tasks,
          [action.payload.source]: [...state.tasks[action.payload.source]],
        };
      } else {
        if (!state.tasks[action.payload.destination]) {
          state.tasks = {
            ...state.tasks,
            [action.payload.destination]: [],
          };
        }
        addElementsToTheDifferentCell(
          state.tasks[action.payload.source],
          state.tasks[action.payload.destination],
          action.payload.sourceIndex,
          action.payload.destinationIndex
        );
        state.tasks = {
          ...state.tasks,
          [action.payload.source]: [
            ...state.tasks[action.payload.source].filter(
              (el, i) => i !== action.payload.sourceIndex
            ),
          ],
          [action.payload.destination]: [...state.tasks[action.payload.destination]],
        };
        if (![...state.tasks[action.payload.source]].length) {
          delete state.tasks[action.payload.source];
        }
      }
    },
    handleSetToday(state: IState) {
      state.today = format(new Date(), 'yyyy-MM-dd');
      state.selectedDate = format(new Date(), 'yyyy-MM-dd');
    },
    selectDate(state: IState, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    showModalWindow(
      state: IState,
      action: PayloadAction<{ show: boolean; task: string; taskId: number | null; label: string[] }>
    ) {
      state.showModal = action.payload.show;
      state.task = action.payload.task;
      state.taskId = action.payload.taskId;
      state.label = action.payload.label;
    },
    addTask(
      state: IState,
      action: PayloadAction<{
        date: string | null;
        task: { text: string; id: number | null; label: string[] };
      }>
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
                  label: action.payload.task.label,
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
            { id: Math.random(), task: action.payload.task.text, label: action.payload.task.label },
          ],
        };
      } else {
        state.tasks = {
          ...state.tasks,
          [format(validDate(), 'yyyy-MM-dd')]: [
            {
              id: Math.random(),
              task: action.payload.task.text,
              label: action.payload.task.label,
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

export const {
  handleSetToday,
  selectDate,
  showModalWindow,
  addTask,
  removeTask,
  dragAndDrop,
  addColorFilter,
  loadTasks,
} = calendarSlice.actions;
export const CalendarReducer = calendarSlice.reducer;
