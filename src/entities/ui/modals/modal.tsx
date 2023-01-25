import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  addTask,
  idStateSelector,
  labelStateSelector,
  oneTaskStateSelector,
  selectedDateStateSelector,
  showModalWindow,
} from 'app';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { MdClose } from 'react-icons/md';
import {
  CloseButton,
  EnterButton,
  ModalInput,
  ModalLabel,
  ModalLabelsWrapper,
  ModalWrap,
  OverLay,
} from '../../styles';

export const Modal = () => {
  const taskId = useAppSelector(idStateSelector);
  const label = useAppSelector(labelStateSelector);
  const [modalTask, setModalTask] = useState('');
  const [taskLabel, setTaskLabel] = useState<string[]>(label);
  const taskInput = useAppSelector(oneTaskStateSelector);
  const value = useAppSelector(selectedDateStateSelector);
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTaskLabel((prevState) => [...prevState, e.target.value]);
    } else setTaskLabel((prevState) => [...prevState].filter((el) => el !== e.target.value));
  };
  const submitTask = () => {
    if (modalTask.length) {
      dispatch(addTask({ date: value, task: { text: modalTask, id: taskId, label: taskLabel } }));
      setModalTask('');
      dispatch(
        showModalWindow({
          show: window.innerWidth <= 1024,
          task: '',
          taskId: null,
          label: [],
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
            dispatch(showModalWindow({ show: false, task: '', taskId: null, label: [] }));
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
          save
        </EnterButton>
        <ModalLabelsWrapper>
          <ModalLabel red checkedRed={taskLabel.includes('red')}>
            <input
              type="checkbox"
              checked={taskLabel.includes('red')}
              id="red"
              name="red"
              value="red"
              onChange={handleCheckboxChange}
            />
          </ModalLabel>
          <ModalLabel orange checkedOrange={taskLabel.includes('orange')}>
            <input
              type="checkbox"
              checked={taskLabel.includes('orange')}
              id="orange"
              name="orange"
              value="orange"
              onChange={handleCheckboxChange}
            />
          </ModalLabel>
          <ModalLabel green checkedGreen={taskLabel.includes('green')}>
            <input
              type="checkbox"
              checked={taskLabel.includes('green')}
              id="green"
              name="green"
              value="green"
              onChange={handleCheckboxChange}
            />
          </ModalLabel>
        </ModalLabelsWrapper>
      </ModalWrap>
    </OverLay>
  );
};
