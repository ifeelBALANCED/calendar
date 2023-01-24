import React, { FC } from 'react';
import { useAppSelector } from 'hooks';
import { modalStateSelector } from 'app';
import { Modal } from 'components/modal';
import { CellsGrid } from './cells-grid';

interface IProps {
  filteredValue: string;
}

export const Calendar: FC<IProps> = ({ filteredValue }) => {
  const showModal = useAppSelector(modalStateSelector);

  return (
    <>
      <CellsGrid filteredValue={filteredValue} />
      {showModal && <Modal />}
    </>
  );
};
