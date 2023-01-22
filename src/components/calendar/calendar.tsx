import React from 'react';
import { useAppSelector } from 'hooks';
import { modalStateSelector } from 'app';
import { CellsGrid } from './cells-grid';
import { Modal } from '../modal';

export const Calendar = () => {
  const showModal = useAppSelector(modalStateSelector);

  return (
    <>
      <CellsGrid />
      {showModal && <Modal />}
    </>
  );
};
