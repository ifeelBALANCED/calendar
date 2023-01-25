import { Background, Calendar, CalendarButtons, Filter, Modal, Navigation } from 'entities';
import React, { useEffect } from 'react';
import { add, format, sub } from 'date-fns';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { WrapperStyled } from 'entities/styles';
import { holidaysThunk, modalStateSelector, selectDate, selectedDateStateSelector } from './store';

const StyledApp = styled.div`
  width: 100%;
  height: 100vh;
  min-width: 350px;
  overflow: hidden;
  background-color: #fed766;
`;

export const App = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectedDateStateSelector);
  const showModal = useAppSelector(modalStateSelector);

  useEffect(() => {
    dispatch(holidaysThunk());
  }, [dispatch]);

  const validDate = () => {
    return value ? new Date(value) : new Date();
  };
  const prevMonth = () =>
    dispatch(selectDate(format(sub(validDate(), { months: 1 }), 'yyyy-MM-dd')));
  const nextMonth = () =>
    dispatch(selectDate(format(add(validDate(), { months: 1 }), 'yyyy-MM-dd')));
  const prevYear = () => dispatch(selectDate(format(sub(validDate(), { years: 1 }), 'yyyy-MM-dd')));
  const nextYear = () => dispatch(selectDate(format(add(validDate(), { years: 1 }), 'yyyy-MM-dd')));

  return (
    <StyledApp>
      <Background />
      <WrapperStyled>
        <Navigation
          prevYear={prevYear}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          nextYear={nextYear}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Filter />
          <CalendarButtons />
        </div>
        <Calendar />
        {showModal && <Modal />}
      </WrapperStyled>
    </StyledApp>
  );
};
