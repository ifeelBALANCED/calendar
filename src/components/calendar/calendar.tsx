import React from 'react';
import { useAppSelector } from 'hooks';
import { modalStateSelector } from 'app';
import { Modal } from 'components/modal';
import { CellsGrid } from './cells-grid';

export const Calendar = () => {
  const showModal = useAppSelector(modalStateSelector);

  return (
    <>
      <CellsGrid />
      {showModal && <Modal />}
    </>
  );
};
