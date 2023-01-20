import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  addTask,
  holidaysThunk,
  idStateSelector,
  modalStateSelector,
  oneTaskStateSelector,
  selectDate,
  selectedDateStateSelector,
  showModalWindow,
} from 'app';
import { add, format, sub } from 'date-fns';
import { CellsGrid } from './cells-grid';
import { Navigation } from './navigation';

export const Calendar = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectedDateStateSelector);
  const showModal = useAppSelector(modalStateSelector);
  const taskInput = useAppSelector(oneTaskStateSelector);
  const taskId = useAppSelector(idStateSelector);
  const [modalTask, setModalTask] = useState('');

  useEffect(() => {
    dispatch(holidaysThunk());
    if (taskInput !== '') {
      setModalTask(taskInput);
    }
  }, [dispatch, taskInput]);

  const validDate = () => {
    return value ? new Date(value) : new Date();
  };
  const submitTask = () => {
    dispatch(addTask({ date: value, task: { text: modalTask, id: taskId } }));
    setModalTask('');
    dispatch(
      showModalWindow({
        show: false,
        task: '',
        taskId: null,
      })
    );
  };
  const prevMonth = () =>
    dispatch(selectDate(format(sub(validDate(), { months: 1 }), 'yyyy-MM-dd')));
  const nextMonth = () =>
    dispatch(selectDate(format(add(validDate(), { months: 1 }), 'yyyy-MM-dd')));
  const prevYear = () => dispatch(selectDate(format(sub(validDate(), { years: 1 }), 'yyyy-MM-dd')));
  const nextYear = () => dispatch(selectDate(format(add(validDate(), { years: 1 }), 'yyyy-MM-dd')));

  return (
    <div>
      <Navigation
        prevYear={prevYear}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        nextYear={nextYear}
      />
      <CellsGrid />
      {showModal && (
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '500px',
            backgroundColor: 'gray',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <button
            type="button"
            onClick={() => {
              dispatch(showModalWindow({ show: false, task: '', taskId: null }));
              setModalTask('');
            }}
          >
            close
          </button>
          {format(validDate(), 'dd LLLL yyyy')}
          <input
            type="text"
            placeholder="title"
            value={modalTask}
            onChange={(e) => setModalTask(e.target.value)}
          />
          <button type="button" onClick={() => submitTask()}>
            enter
          </button>
        </div>
      )}
    </div>
  );
};
