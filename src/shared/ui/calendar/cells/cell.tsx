import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { v4 } from 'uuid';
import { format, setDate } from 'date-fns';
import { TiDelete } from 'react-icons/ti';
import {
  addColorFilter,
  colorFilterStateSelector,
  holidaysStateSelector,
  removeTask,
  selectDate,
  selectedDateStateSelector,
  showModalWindow,
  tasksStateSelector,
  textFilterStateSelector,
} from 'app';
import {
  CellAction,
  CellColorLabel,
  ColorLabelsWrapper,
  DeleteTask,
  StyledCell,
  StyledInnerTask,
  StyledTask,
  TasksWrapper,
} from 'shared/styles';
import { HolidaysModal } from 'shared/ui/modals';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ITask } from 'shared/types';
import { CellButtons } from './cell-buttons';

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
  const colorFilter = useAppSelector(colorFilterStateSelector);
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectedDateStateSelector);
  const filteredValue = useAppSelector(textFilterStateSelector);

  const validDate = () => {
    return value ? new Date(value) : new Date();
  };
  const [filteredWithColor, setFilteredWithColor] = useState(
    colorFilter.find((el) => el.date === format(setDate(validDate(), date), 'yyyy-MM-dd'))
  );

  const showTasks = (task: ITask) => {
    return (
      task.task?.includes(filteredValue) &&
      (task.label?.includes(filteredWithColor?.color || '') || filteredWithColor === undefined)
    );
  };

  const handleFilterClick = (color: string) => {
    if (color === '') {
      setFilteredWithColor(undefined);
    } else {
      setFilteredWithColor({
        date: format(setDate(validDate(), date), 'yyyy-MM-dd'),
        color,
      });
    }
    dispatch(
      addColorFilter({
        date: format(setDate(validDate(), date), 'yyyy-MM-dd'),
        color,
      })
    );
  };
  return (
    <StyledCell key={v4()} isActive={isToday} isHolidays={isHolidays}>
      <CellAction>
        {date}
        <CellButtons
          date={date}
          filteredWithColor={filteredWithColor}
          handleClickDate={handleClickDate}
          handleFilterClick={handleFilterClick}
          isHolidays={isHolidays}
          setShowHolidays={setShowHolidays}
        />
      </CellAction>
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
                tasks[format(setDate(validDate(), date), 'yyyy-MM-dd')]?.map((task, i) => {
                  if (showTasks(task)) {
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
                                      label: task.label,
                                    })
                                  );
                                }
                              }}
                            >
                              <StyledInnerTask>
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
                              </StyledInnerTask>
                              <ColorLabelsWrapper>
                                {task.label?.map((el) => {
                                  return (
                                    <CellColorLabel
                                      key={v4()}
                                      red={el === 'red'}
                                      orange={el === 'orange'}
                                      green={el === 'green'}
                                    />
                                  );
                                })}
                              </ColorLabelsWrapper>
                            </StyledTask>
                          );
                        }}
                      </Draggable>
                    );
                  }
                  return null;
                })}
              {provided.placeholder}
            </TasksWrapper>
          );
        }}
      </Droppable>
    </StyledCell>
  );
};
