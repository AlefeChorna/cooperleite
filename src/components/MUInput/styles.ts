import styled from 'styled-components';
import MUITextField from '@material-ui/core/TextField';

export const TextField = styled(MUITextField)`
  width: 100%;

  label {
    color: #fff;
    font-size: 16.5px;
    padding: 0 10px 0 0;
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

  & .MuiOutlinedInput-input {
    padding: 12.5px 14px;
  }

  &:hover p:not(.Mui-error),
  label {
    color: #ccc;
  }

  &:focus-within p:not(.Mui-error) {
    color: #fd951f;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #353535 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
`;
