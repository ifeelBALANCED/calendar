import React, { Dispatch, FC, SetStateAction } from 'react';
import { StyledFilter } from 'components/styles';

interface IProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}
export const Filter: FC<IProps> = ({ value, setValue }) => {
  return (
    <StyledFilter>
      <input
        type="text"
        placeholder="Filter your tasks !"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </StyledFilter>
  );
};
