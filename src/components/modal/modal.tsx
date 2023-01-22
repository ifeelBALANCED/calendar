import * as React from 'react';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { TiDelete } from 'react-icons/ti';
import {
  addTask,
  holidaysStateSelector,
  idStateSelector,
  oneTaskStateSelector,
  removeTask,
  selectedDateStateSelector,
  showModalWindow,
  tasksStateSelector,
} from 'app';
import { useAppDispatch, useAppSelector } from 'hooks';
import { MdClose } from 'react-icons/md';
import { v4 } from 'uuid';
import {
  CloseButton,
  DeleteTask,
  EnterButton,
  ModalInput,
  ModalWrap,
  OverLay,
  StyledHolidays,
  StyledTask,
  TasksWrapperMobile,
} from '../styles';

export const Modal = () => {
  const taskId = useAppSelector(idStateSelector);
  const tasks = useAppSelector(tasksStateSelector);
  const [modalTask, setModalTask] = useState('');
  const taskInput = useAppSelector(oneTaskStateSelector);
  const value = useAppSelector(selectedDateStateSelector);
  const dispatch = useAppDispatch();
  const holidays = useAppSelector(holidaysStateSelector);
  const dateHolidays = Object.entries(holidays)
    .map((el) => {
      return {
        date: el[1].date,
        name: el[1].name,
      };
    })
    .filter((el) => {
      return el.date === value;
    });
  const submitTask = () => {
    if (modalTask.length) {
      dispatch(addTask({ date: value, task: { text: modalTask, id: taskId } }));
      setModalTask('');
      dispatch(
        showModalWindow({
          show: window.innerWidth <= 1024,
          task: '',
          taskId: null,
        })
      );
    }
  };

  useEffect(() => {
    if (taskInput !== '') {
      setModalTask(taskInput);
    }
  }, [taskInput]);
  return (
    <OverLay>
      <ModalWrap holiday={false}>
        <CloseButton
          type="button"
          onClick={() => {
            dispatch(showModalWindow({ show: false, task: '', taskId: null }));
            setModalTask('');
          }}
        >
          <MdClose size={22} />
        </CloseButton>
        <h2>{format(value ? new Date(value) : new Date(), 'dd LLLL yyyy')}</h2>
        <ModalInput
          type="text"
          placeholder="task"
          value={modalTask}
          onChange={(e) => setModalTask(e.target.value)}
        />
        <EnterButton type="button" onClick={() => submitTask()}>
          enter
        </EnterButton>
        <TasksWrapperMobile>
          {value &&
            tasks[value] &&
            tasks[value].map((task) => {
              return (
                <StyledTask
                  key={v4()}
                  onClick={() => {
                    dispatch(
                      removeTask({
                        date: value,
                        id: task.id,
                      })
                    );
                    setModalTask(task.task);
                  }}
                >
                  <span>{task.task}</span>
                  <DeleteTask
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (value) {
                        dispatch(
                          removeTask({
                            date: value,
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
            })}
          {dateHolidays.length !== 0 && (
            <StyledHolidays>
              <h3>Holidays of {value}</h3>
              {dateHolidays.map((el) => {
                return <div key={v4()}>{el.name}</div>;
              })}
            </StyledHolidays>
          )}
        </TasksWrapperMobile>
      </ModalWrap>
    </OverLay>
  );
};
