import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useField } from '@unform/core';
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

export interface InputProps extends BaseTextFieldProps, MetrincsProps {
  name: string;
  inputMask?: Mask | ((value: string) => Mask);
  startAdornment?: React.ReactElement<any>;
}

const anyCharacterRegEx = /./;
const defaultMask = Array(100).fill(anyCharacterRegEx);

const MUInput: React.FC<InputProps> = ({
  name,
  inputMask,
  helperText,
  startAdornment = null,
  xs = 12,
  sm = 12,
  md = 12,
  ...rest
}) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [mask, setMask] = useState(defaultValue);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'props.value',
      setValue: (_, newValue) => {
        setMask(newValue);
      },
      clearValue: (ref, newValue) => {
        ref.setInputValue(newValue);
      },
    });
  }, [fieldName, registerField, setMask]);

  const handleMask = useCallback((e: any) => {
    const { value } = e.target;
    return setMask(value);
  }, []);

  return (
    <MaskedInput
      ref={inputRef}
      mask={inputMask || defaultMask}
      guide={false}
      value={mask}
      onChange={handleMask}
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
              inputProps={{
                ref,
                name,
                defaultValue,
                ...inputMaskProps,
              }}
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

export default MUInput;
