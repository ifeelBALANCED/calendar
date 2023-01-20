import React, { FC, useState } from 'react';
import { StyledCell } from 'components/styles';
import { IHolidays, ITask } from 'types';
import { useAppDispatch } from 'hooks';
import { removeTask, showModalWindow } from 'app';

interface Props extends React.PropsWithChildren {
  isHolidays?: boolean;
  onClick?: () => void;
  isActive?: boolean;
  simpleCell?: boolean;
  tasks?: ITask[];
  holidays?: IHolidays[];
  date?: string;
}
export const Cell: FC<Props> = ({
  simpleCell,
  onClick,
  children,
  isActive = false,
  isHolidays = false,
  tasks,
  holidays,
  date,
}) => {
  const [showHolidays, setShowHolidays] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <StyledCell isActive={isActive} isHolidays={isHolidays}>
      {children}
      {!simpleCell && (
        <button type="button" onClick={onClick}>
          +
        </button>
      )}
      {isHolidays && (
        <button type="button" onClick={() => setShowHolidays((prevState) => !prevState)}>
          !
        </button>
      )}
      {holidays &&
        showHolidays &&
        holidays?.map((holiday) => {
          return (
            <small draggable={false} key={Math.random()}>
              {holiday.localName}
            </small>
          );
        })}
      <div>
        {tasks &&
          tasks.map((task) => {
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <small
                draggable
                key={Math.random()}
                onClick={() => {
                  if (date) {
                    dispatch(showModalWindow({ show: true, task: task.task, taskId: task.id }));
                  }
                }}
              >
                {task.task}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (date) {
                      dispatch(removeTask({ date, id: task.id }));
                    }
                  }}
                >
                  del
                </button>
              </small>
            );
          })}
      </div>
    </StyledCell>
  );
};
