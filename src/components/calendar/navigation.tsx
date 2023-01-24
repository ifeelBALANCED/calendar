import React, { FC, useState } from 'react';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from 'hooks';
import { handleSetToday, selectedDateStateSelector } from 'app';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { StyledNavigation } from '../styles';

interface IProps {
  prevYear: () => void;
  prevMonth: () => void;
  nextMonth: () => void;
  nextYear: () => void;
}

export const Navigation: FC<IProps> = ({ prevYear, prevMonth, nextYear, nextMonth }) => {
  const value = useAppSelector(selectedDateStateSelector);
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<string | null>();

  const download = () => {
    const body = document.querySelector('body');
    if (body) {
      html2canvas(body, { logging: false }).then((r) => {
        const url = r.toDataURL();
        setImage(url);
      });
    }
  };
  return (
    <StyledNavigation>
      <button type="button" onClick={() => dispatch(handleSetToday())}>
        Today
      </button>
      <button type="button" onClick={prevYear}>
        {'<<'}
      </button>
      <button type="button" onClick={prevMonth}>
        {'<'}
      </button>
      <div>{format(value ? new Date(value) : new Date(), 'LLLL yyyy')}</div>
      <button type="button" onClick={nextMonth}>
        {'>'}
      </button>
      <button type="button" onClick={nextYear}>
        {'>>'}
      </button>
      <button type="button" onClick={() => download()}>
        Print
      </button>
      {image && (
        <div
          style={{
            position: 'absolute',
            zIndex: 100,
            width: '800px',
            height: '500px',
            right: '50%',
            transform: 'translateX(50%)',
          }}
        >
          <img style={{ maxWidth: '100%' }} src={image} alt="" />
          <button
            type="button"
            onClick={() => {
              saveAs(image, 'image');
            }}
          >
            install
          </button>
          <button type="button" onClick={() => setImage(null)}>
            close
          </button>
        </div>
      )}
    </StyledNavigation>
  );
};
