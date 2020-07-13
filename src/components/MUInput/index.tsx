import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useField } from '@unform/core';
import MaskedInput from 'react-text-mask';
import { BaseTextFieldProps } from '@material-ui/core/TextField';

import { TextField } from './styles';

type Mask = Array<string | RegExp>;

interface InputProps extends BaseTextFieldProps {
  name: string;
  inputMask?: Mask | ((value: string) => Mask);
}

const MUInput: React.FC<InputProps> = ({
  name,
  inputMask,
  helperText,
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
      clearValue: (ref) => {
        ref.setInputValue(undefined);
      },
    });
  }, [fieldName, registerField]);

  const handleMask = useCallback((e: any) => {
    const { value } = e.target;
    return setMask(value);
  }, []);

  return (
    <MaskedInput
      ref={inputRef}
      mask={inputMask || false}
      guide={false}
      value={mask}
      onChange={handleMask}
      render={(ref, inputMaskProps: any): any => {
        return (
          <TextField
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
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
        );
      }}
    />
  );
};

export default MUInput;
