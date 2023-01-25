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

export const labelStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.label
);

export const colorFilterStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.colorFilter
);

export const textFilterStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.filterText
);
export const idStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.taskId
);

export const modalStateSelector = createDraftSafeSelector(
  calendarGeneralSelector,
  (state) => state.showModal
);
