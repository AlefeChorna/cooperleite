import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useField } from '@unform/core';

import InputBase, { InputBaseProps } from '../Base';

import formatDateToISO from '../../../utils/formatDateToISO';
import formatDateToInput from '../../../utils/formatDateToInput';

const defaultMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

const InputDate: React.FC<Omit<InputBaseProps, 'inputRef'>> = ({
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
      getValue: () => formatDateToISO(mask),
      setValue: (_, newValue) => {
        setMask(formatDateToInput(newValue));
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

export default InputDate;
