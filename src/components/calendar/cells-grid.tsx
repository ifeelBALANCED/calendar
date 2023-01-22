import React, { useState } from 'react';
import { differenceInDays, endOfMonth, format, setDate, startOfMonth } from 'date-fns';
import {
  CellAction,
  CellActionMobile,
  CellButton,
  DeleteTask,
  Grid,
  StyledCalendar,
  StyledCell,
  StyledTask,
  TasksWrapper,
} from 'components/styles';
import { useAppDispatch, useAppSelector } from 'hooks';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { v4 } from 'uuid';
import {
  holidaysStateSelector,
  removeTask,
  selectDate,
  selectedDateStateSelector,
  showModalWindow,
  tasksStateSelector,
} from 'app';
import { TiDelete } from 'react-icons/ti';
import { HolidaysModal } from '../modal/holidays-modal';

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

  const handleDrop = (e: DropResult) => {
    console.log(e);
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

        <DragDropContext onDragEnd={(e) => handleDrop(e)}>
          {Array.from({ length: numDays }).map((_, index) => {
            const date = index + 1;
            const isToday =
              format(setDate(validDate(), date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
            const hasTasks = tasks[format(setDate(validDate(), date), 'yyyy-MM-dd')];
            const isHolidays = daysOfHoliday.includes(
              format(setDate(validDate(), date), 'yyyy-MM-dd')
            );
            return (
              <StyledCell
                key={v4()}
                isActive={isToday}
                isHolidays={isHolidays}
                isDays={false}
                isEmpty={false}
              >
                <CellAction>
                  {date}
                  <CellButton type="button" onClick={() => handleClickDate(date)}>
                    +
                  </CellButton>
                  {isHolidays && (
                    <CellButton
                      type="button"
                      onClick={() =>
                        setShowHolidays((prevState) => {
                          return {
                            ...prevState,
                            show: true,
                            date: format(setDate(validDate(), date), 'yyyy-MM-dd'),
                          };
                        })
                      }
                    >
                      !
                    </CellButton>
                  )}
                </CellAction>
                <CellActionMobile isActive={isToday}>
                  <button type="button" onClick={() => handleClickDate(date)}>
                    {date}
                  </button>
                </CellActionMobile>
                {showHolidays.show &&
                  format(setDate(validDate(), date), 'yyyy-MM-dd') === showHolidays.date && (
                    <HolidaysModal
                      holidays={holidays}
                      setShowHolidays={setShowHolidays}
                      date={format(setDate(validDate(), date), 'yyyy-MM-dd')}
                    />
                  )}
                <Droppable
                  droppableId={format(setDate(validDate(), date), 'yyyy-MM-dd')}
                  key={v4()}
                >
                  {(provided) => {
                    return (
                      <TasksWrapper ref={provided.innerRef} {...provided.droppableProps}>
                        {hasTasks &&
                          tasks[format(setDate(validDate(), date), 'yyyy-MM-dd')].map((task, i) => {
                            return (
                              <Draggable key={v4()} index={i} draggableId={task.id.toString()}>
                                {(prov) => {
                                  return (
                                    <StyledTask
                                      ref={prov.innerRef}
                                      {...prov.draggableProps}
                                      {...prov.dragHandleProps}
                                      key={v4()}
                                      draggable
                                      onClick={() => {
                                        if (date) {
                                          dispatch(
                                            selectDate(
                                              format(setDate(validDate(), date), 'yyyy-MM-dd')
                                            )
                                          );
                                          dispatch(
                                            showModalWindow({
                                              show: true,
                                              task: task.task,
                                              taskId: task.id,
                                            })
                                          );
                                        }
                                      }}
                                    >
                                      <span>{task.task}</span>
                                      <DeleteTask
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (date) {
                                            dispatch(
                                              removeTask({
                                                date: format(
                                                  setDate(validDate(), date),
                                                  'yyyy-MM-dd'
                                                ),
                                                id: task.id,
                                              })
                                            );
                                          }
                                        }}
                                      >
                                        <TiDelete size={30} />
                                      </DeleteTask>
                                    </StyledTask>
                                  );
                                }}
                              </Draggable>
                              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                            );
                          })}
                        {provided.placeholder}
                      </TasksWrapper>
                    );
                  }}
                </Droppable>
              </StyledCell>
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
