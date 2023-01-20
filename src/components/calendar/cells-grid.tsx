import React from 'react';
import { differenceInDays, endOfMonth, format, setDate, startOfMonth } from 'date-fns';
import { Grid, StyledCalendar } from 'components/styles';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  holidaysStateSelector,
  selectDate,
  selectedDateStateSelector,
  showModalWindow,
  tasksStateSelector,
} from 'app';
import { Cell } from './cell';

export const CellsGrid = () => {
  const dispatch = useAppDispatch();
  const holidays = useAppSelector(holidaysStateSelector);
  const value = useAppSelector(selectedDateStateSelector);
  const tasks = useAppSelector(tasksStateSelector);
  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const validDate = () => {
    return value ? new Date(value) : new Date();
  };

  const startDate = startOfMonth(validDate());
  const endDate = endOfMonth(validDate());
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const daysOfHoliday = holidays.map(({ date }) => {
    return date;
  });
  const handleClickDate = (index: number) => {
    const date = format(setDate(validDate(), index), 'yyyy-MM-dd');
    dispatch(selectDate(date));
    dispatch(showModalWindow({ show: true, task: '', taskId: null }));
  };

  return (
    <StyledCalendar>
      <Grid>
        {weeks.map((week) => (
          <Cell key={Math.random()} simpleCell>
            {week}
          </Cell>
        ))}

        {Array.from({ length: prefixDays }).map(() => (
          <Cell key={Math.random()} simpleCell />
        ))}

        {Array.from({ length: numDays }).map((_, index) => {
          const date = index + 1;
          const isToday =
            format(setDate(validDate(), date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          // eslint-disable-next-line no-prototype-builtins
          const hasTasks = tasks[format(setDate(validDate(), date), 'yyyy-MM-dd')];
          return (
            <Cell
              key={date}
              isHolidays={daysOfHoliday.includes(format(setDate(validDate(), date), 'yyyy-MM-dd'))}
              holidays={
                daysOfHoliday.includes(format(setDate(validDate(), date), 'yyyy-MM-dd'))
                  ? holidays
                  : undefined
              }
              isActive={isToday}
              onClick={() => handleClickDate(date)}
              tasks={hasTasks ? tasks[format(setDate(validDate(), date), 'yyyy-MM-dd')] : undefined}
              date={format(setDate(validDate(), date), 'yyyy-MM-dd')}
            >
              {date}
            </Cell>
          );
        })}

        {Array.from({ length: suffixDays }).map(() => (
          <Cell key={Math.random()} simpleCell />
        ))}
      </Grid>
    </StyledCalendar>
  );
};
