import React, { Dispatch, FC, SetStateAction } from 'react';
import { CellButton, FilterColorBtn } from 'entities/styles';
import { format, setDate } from 'date-fns';
import { useAppSelector } from 'shared/hooks';
import { selectedDateStateSelector } from 'app';

interface IProps {
  handleClickDate: (index: number) => void;
  isHolidays: boolean;
  setShowHolidays: Dispatch<SetStateAction<{ show: boolean; date: string }>>;
  filteredWithColor: { date: string; color: string } | undefined;
  date: number;
  handleFilterClick: (color: string) => void;
}
export const CellButtons: FC<IProps> = ({
  handleClickDate,
  isHolidays,
  setShowHolidays,
  date,
  filteredWithColor,
  handleFilterClick,
}) => {
  const value = useAppSelector(selectedDateStateSelector);

  const validDate = () => {
    return value ? new Date(value) : new Date();
  };
  return (
    <>
      <CellButton type="button" onClick={() => handleClickDate(date)}>
        +
      </CellButton>
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
      <FilterColorBtn
        red
        active={filteredWithColor?.color === 'red'}
        onClick={() => handleFilterClick(filteredWithColor?.color === 'red' ? '' : 'red')}
      />
      <FilterColorBtn
        orange
        active={filteredWithColor?.color === 'orange'}
        onClick={() => handleFilterClick(filteredWithColor?.color === 'orange' ? '' : 'orange')}
      />
      <FilterColorBtn
        green
        active={filteredWithColor?.color === 'green'}
        onClick={() => handleFilterClick(filteredWithColor?.color === 'green' ? '' : 'green')}
      />
    </>
  );
};
