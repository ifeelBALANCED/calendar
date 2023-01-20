import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { TypeRootState } from '../store';

export const calendarGeneralSelector = (state: TypeRootState) => state.calendar;

export const holidaysStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.holidays
);

export const selectedDateStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.selectedDate
);

export const todayStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.today
);

export const tasksStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.tasks
);

export const oneTaskStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.task
);

export const idStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.taskId
);

export const modalStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.showModal
);

export const isLoadingStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.isLoading
);

export const isErrorStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.isError
);

export const errorMessageStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.errorMessage
);
