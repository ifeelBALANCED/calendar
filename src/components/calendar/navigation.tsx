import React, { FC } from 'react';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from 'hooks';
import { handleSetToday, selectedDateStateSelector } from 'app';

interface IProps {
  prevYear: () => void;
  prevMonth: () => void;
  nextMonth: () => void;
  nextYear: () => void;
}

export const Navigation: FC<IProps> = ({ prevYear, prevMonth, nextYear, nextMonth }) => {
  const value = useAppSelector(selectedDateStateSelector);
  const dispatch = useAppDispatch();
  return (
    <div>
      <button type="button" onClick={() => dispatch(handleSetToday())}>
        Today
      </button>
      <button type="button" onClick={prevYear}>
        {'<<'}
      </button>
      <button type="button" onClick={prevMonth}>
        {'<'}
      </button>
      <button type="button">{format(value ? new Date(value) : new Date(), 'LLLL yyyy')}</button>
      <button type="button" onClick={nextMonth}>
        {'>'}
      </button>
      <button type="button" onClick={nextYear}>
        {'>>'}
      </button>
    </div>
  );
};
