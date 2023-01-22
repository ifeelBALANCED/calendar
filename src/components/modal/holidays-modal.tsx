import { MdClose } from 'react-icons/md';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { IHolidays } from 'types';
import { CloseButton, ModalWrap, OverLay, StyledHoliday } from '../styles';

interface IProps {
  setShowHolidays: Dispatch<SetStateAction<{ show: boolean; date: string }>>;
  holidays: IHolidays[];
  date: string | undefined;
}
export const HolidaysModal: FC<IProps> = ({ setShowHolidays, holidays, date }) => {
  return (
    <OverLay>
      <ModalWrap holiday>
        <CloseButton
          type="button"
          onClick={() => {
            setShowHolidays({ show: false, date: '' });
          }}
        >
          <MdClose size={22} />
        </CloseButton>
        <h2>Holidays of {date} !!!</h2>
        {holidays?.map((holiday) => {
          if (holiday.date === date) {
            return (
              <StyledHoliday draggable={false} key={Math.random()}>
                {holiday.name}
              </StyledHoliday>
            );
          }
          return null;
        })}
      </ModalWrap>
    </OverLay>
  );
};
