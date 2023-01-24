import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
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
} from 'app';
import {
  CellAction,
  CellButton,
  CellColorLabel,
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
  filteredValue: string;
}

export const Cell: FC<IProps> = ({
  isToday,
  isHolidays,
  date,
  handleClickDate,
  setShowHolidays,
  hasTasks,
  showHolidays,
  filteredValue,
}) => {
  const tasks = useAppSelector(tasksStateSelector);
  const holidays = useAppSelector(holidaysStateSelector);
  const colorFilter = useAppSelector(colorFilterStateSelector);
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectedDateStateSelector);

  const validDate = () => {
    return value ? new Date(value) : new Date();
  };
  const [filteredWithColor, setFilteredWithColor] = useState(
    colorFilter.find((el) => el.date === format(setDate(validDate(), date), 'yyyy-MM-dd'))
  );

  const handleSelectClick = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setFilteredWithColor(undefined);
    } else {
      setFilteredWithColor({
        date: format(setDate(validDate(), date), 'yyyy-MM-dd'),
        color: e.target.value,
      });
    }
    dispatch(
      addColorFilter({
        date: format(setDate(validDate(), date), 'yyyy-MM-dd'),
        color: e.target.value,
      })
    );
  };
  return (
    <StyledCell key={v4()} isActive={isToday} isHolidays={isHolidays}>
      <CellAction>
        {date}
        <CellButton type="button" onClick={() => handleClickDate(date)}>
          +
        </CellButton>
        <select
          name="labels"
          id="labels"
          value={filteredWithColor?.color || ''}
          onChange={handleSelectClick}
        >
          <option value="">Filter</option>
          <option value="red">red</option>
          <option value="orange">orange</option>
          <option value="yellow">yellow</option>
          <option value="green">green</option>
        </select>
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
                  if (
                    task.task.includes(filteredValue) &&
                    (task.label.includes(filteredWithColor?.color || '') ||
                      filteredWithColor === undefined)
                  ) {
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
                              <span>{task.task}</span>
                              {task.label.map((el) => {
                                return (
                                  <CellColorLabel
                                    key={v4()}
                                    red={el === 'red'}
                                    orange={el === 'orange'}
                                    green={el === 'green'}
                                    yellow={el === 'yellow'}
                                  />
                                );
                              })}
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
