import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useField } from '@unform/core';

import InputBase, { InputBaseProps } from '../Base';

import createNumberMask from '../../../utils/createNumberMask';
import formatNumberToAPI from '../../../utils/formatNumberToAPI';
import formatNumberToInput from '../../../utils/formatNumberToInput';

const defaultMask = createNumberMask();

const InputNumeric: React.FC<Omit<InputBaseProps, 'inputRef'>> = ({
  name,
  ...props
}) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [mask, setMask] = useState(defaultValue);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: () => formatNumberToAPI(mask),
      setValue: (_, newValue) => {
        setMask(formatNumberToInput(newValue));
      },
      clearValue: (ref, newValue) => {
        ref.setInputValue(newValue);
      },
    });
  }, [fieldName, registerField, mask, setMask]);

  const handleMask = useCallback((e: any) => {
    const { value } = e.target;
    return setMask(value);
  }, []);

  return (
    <InputBase
      inputMask={defaultMask}
      {...props}
      name={name}
      inputRef={inputRef}
      maskValue={mask}
      defaultValue={defaultValue}
      error={error}
      onChangeMask={handleMask}
    />
  );
};

export default InputNumeric;
