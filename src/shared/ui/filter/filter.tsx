import React, { useState } from 'react';
import { StyledFilter } from 'shared/styles';
import { useAppDispatch } from 'shared/index';
import { changeFilterText } from 'app';

export const Filter = () => {
  const [value, setValue] = useState('');
  const [reset, setReset] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <StyledFilter>
      <input
        type="text"
        placeholder="Filter your tasks !"
        value={value}
        onChange={(e) => {
          if (reset) {
            dispatch(changeFilterText(''));
            setReset(false);
          }
          setValue(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          dispatch(changeFilterText(value));
          setReset(true);
        }}
      >
        filter
      </button>
    </StyledFilter>
  );
};
