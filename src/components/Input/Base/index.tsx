import React from 'react';
import MaskedInput from 'react-text-mask';
import { BaseTextFieldProps } from '@material-ui/core/TextField';

import Col from '../../Col';

import { TextField } from './styles';

export type Mask = Array<string | RegExp>;

type Metrics =
  | boolean
  | 12
  | 6
  | 2
  | 1
  | 'auto'
  | 3
  | 4
  | 5
  | 7
  | 8
  | 9
  | 10
  | 11
  | undefined;

export interface MetrincsProps {
  xs?: Metrics;
  sm?: Metrics;
  md?: Metrics;
}

export interface InputBaseProps
  extends Omit<BaseTextFieldProps, 'error'>,
    MetrincsProps {
  name: string;
  inputRef?: any;
  inputMask?: Mask | ((value: string) => Mask);
  maskValue?: any;
  defaultValue?: any;
  error?: string | undefined;
  startAdornment?: React.ReactElement<any>;
  onChangeMask?: (e: any) => any;
}

const anyCharacterRegEx = /./;
const defaultMask = Array(100).fill(anyCharacterRegEx);

const InputBase: React.FC<InputBaseProps> = ({
  inputRef,
  inputMask,
  maskValue,
  error,
  onChangeMask,
  helperText,
  startAdornment = null,
  xs = 12,
  sm = 12,
  md = 12,
  ...rest
}) => {
  return (
    <MaskedInput
      ref={inputRef}
      mask={inputMask || defaultMask}
      guide={false}
      value={maskValue}
      onChange={onChangeMask}
      render={(ref, inputMaskProps: any): any => {
        return (
          <Col xs={xs} sm={sm} md={md}>
            <TextField
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ startAdornment }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={{ ref, ...inputMaskProps }}
              {...rest}
              error={!!error}
              helperText={error || helperText}
            />
          </Col>
        );
      }}
    />
  );
};

export default InputBase;
