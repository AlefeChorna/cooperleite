import styled from 'styled-components';
import MUIFormControl from '@material-ui/core/FormControl';

export const FormControl = styled(MUIFormControl)`
  width: 100%;

  label {
    color: #fff;
    font-size: 16.5px;
    padding: 0 10px 0 0;
  }

  svg {
    color: #555;
  }

  & .MuiOutlinedInput-root {
    background-color: #29292e;
    height: 46px;
    color: #fff;
  }

  &
    .MuiOutlinedInput-root:hover:not(:focus-within):not(.Mui-error)
    .MuiOutlinedInput-notchedOutline {
    border-color: #777;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: solid 2px #555;
  }

  .MuiFormHelperText-root {
    color: #888;
    font-size: 11px;
  }

  &:hover p:not(.Mui-error),
  label {
    color: #ccc;
  }

  &:focus-within p:not(.Mui-error) {
    color: #fd951f;
  }
`;
