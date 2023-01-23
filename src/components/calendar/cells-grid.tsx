import React, { useState } from 'react';
import { differenceInDays, endOfMonth, format, setDate, startOfMonth } from 'date-fns';
import { Grid, StyledCalendar, StyledCell } from 'components/styles';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  dragAndDrop,
  holidaysStateSelector,
  selectDate,
  selectedDateStateSelector,
  showModalWindow,
  tasksStateSelector,
} from 'app';
import { v4 } from 'uuid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Cell } from './cell';

export const CellsGrid = () => {
  const dispatch = useAppDispatch();
  const holidays = useAppSelector(holidaysStateSelector);
  const value = useAppSelector(selectedDateStateSelector);
  const tasks = useAppSelector(tasksStateSelector);
  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [showHolidays, setShowHolidays] = useState({
    show: false,
    date: '',
  });

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

  const handleDrop = (result: DropResult) => {
    const { destination, source } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    )
      return;
    const resultObg = {
      destination: Object.entries(destination)[0][1],
      destinationIndex: Object.entries(destination)[1][1],
      source: Object.entries(source)[1][1],
      sourceIndex: Object.entries(source)[0][1],
    };
    dispatch(dragAndDrop(resultObg));
  };

  return (
    <StyledCalendar>
      <Grid weekDays>
        {weeks.map((week) => (
          <StyledCell key={Math.random()} isDays>
            {week}
          </StyledCell>
        ))}
      </Grid>
      <Grid>
        {Array.from({ length: prefixDays }).map(() => (
          <StyledCell key={Math.random()} isEmpty />
        ))}

        <DragDropContext onDragEnd={handleDrop}>
          {Array.from({ length: numDays }).map((_, index) => {
            const date = index + 1;
            const isToday =
              format(setDate(validDate(), date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
            const hasTasks = !!tasks[format(setDate(validDate(), date), 'yyyy-MM-dd')];
            const isHolidays = daysOfHoliday.includes(
              format(setDate(validDate(), date), 'yyyy-MM-dd')
            );
            return (
              <Cell
                key={v4()}
                date={date}
                handleClickDate={handleClickDate}
                hasTasks={hasTasks}
                isHolidays={isHolidays}
                isToday={isToday}
                setShowHolidays={setShowHolidays}
                showHolidays={showHolidays}
              />
            );
          })}
        </DragDropContext>

        {Array.from({ length: suffixDays }).map(() => (
          <StyledCell key={Math.random()} isEmpty />
        ))}
      </Grid>
    </StyledCalendar>
  );
};
