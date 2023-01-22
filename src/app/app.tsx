import { Background, Calendar } from 'components';
import React, { useEffect } from 'react';
import { add, format, sub } from 'date-fns';
import styled from 'styled-components';
import { Navigation } from '../components/calendar/navigation';
import { useAppDispatch, useAppSelector } from '../hooks';
import { holidaysThunk, selectDate, selectedDateStateSelector } from './store';
import { WrapperStyled } from '../components/styles/wrapper.styled';

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
        <Calendar />
      </WrapperStyled>
    </StyledApp>
  );
};
