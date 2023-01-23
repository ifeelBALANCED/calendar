import React, { Dispatch, FC, SetStateAction } from 'react';
import { v4 } from 'uuid';
import { format, setDate } from 'date-fns';
import { TiDelete } from 'react-icons/ti';
import {
  holidaysStateSelector,
  removeTask,
  selectDate,
  selectedDateStateSelector,
  showModalWindow,
  tasksStateSelector,
} from 'app';
import {
  CellAction,
  CellActionMobile,
  CellButton,
  DeleteTask,
  StyledCell,
  StyledTask,
  TasksWrapper,
} from 'components/styles';
import { HolidaysModal } from 'components/modal';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface IProps {
  isToday: boolean;
  isHolidays: boolean;
  date: number;
  handleClickDate: (index: number) => void;
  showHolidays: { show: boolean; date: string };
  setShowHolidays: Dispatch<SetStateAction<{ show: boolean; date: string }>>;
  hasTasks: boolean;
}

export const Cell: FC<IProps> = ({
  isToday,
  isHolidays,
  date,
  handleClickDate,
  setShowHolidays,
  hasTasks,
  showHolidays,
}) => {
  const tasks = useAppSelector(tasksStateSelector);
  const holidays = useAppSelector(holidaysStateSelector);
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectedDateStateSelector);
  const validDate = () => {
    return value ? new Date(value) : new Date();
  };
  return (
    <StyledCell key={v4()} isActive={isToday} isHolidays={isHolidays}>
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
          {hasTasks && <div />}
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
      <Droppable droppableId={format(setDate(validDate(), date), 'yyyy-MM-dd')}>
        {(provided) => {
          return (
            <TasksWrapper ref={provided.innerRef} {...provided.droppableProps}>
              {hasTasks &&
                tasks[format(setDate(validDate(), date), 'yyyy-MM-dd')].map((task, i) => {
                  return (
                    <Draggable key={task.id} draggableId={`${task.id}`} index={i}>
                      {(providedDraggable) => {
                        return (
                          <StyledTask
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                            draggable
                            onClick={() => {
                              if (date) {
                                dispatch(
                                  selectDate(format(setDate(validDate(), date), 'yyyy-MM-dd'))
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
                                      date: format(setDate(validDate(), date), 'yyyy-MM-dd'),
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
                  );
                })}
              {provided.placeholder}
            </TasksWrapper>
          );
        }}
      </Droppable>
    </StyledCell>
  );
};
