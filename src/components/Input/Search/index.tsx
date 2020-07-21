import React, {
  useState,
  useRef,
  memo,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import IconSearch from '@material-ui/icons/SearchOutlined';

import { Container, Input } from './styles';

interface InpurSearchProps {
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  iconColor?: string;
  onSubmit(text: string): void;
}

interface InpurSearchHandles {
  getValue(): string;
}

const KEY_CODE_ENTER = 13;

const InputSearchComponent: React.RefForwardingComponent<
  InpurSearchHandles,
  InpurSearchProps
> = ({ containerStyle, inputStyle, iconColor, onSubmit }, inputSearchRef) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useImperativeHandle(inputSearchRef, () => ({
    getValue(): string {
      return inputValue;
    },
  }));

  const onClick = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    inputRef?.current?.focus();
  }, [inputRef]);

  const onChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(target.value);
    },
    [],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === KEY_CODE_ENTER) {
        onSubmit(inputValue);
      }
    },
    [inputValue, onSubmit],
  );

  const handleButtonClick = useCallback(() => {
    onSubmit(inputValue);
  }, [inputValue, onSubmit]);

  return (
    <Container onClick={onClick} style={containerStyle}>
      <Input
        ref={inputRef}
        style={inputStyle}
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <Tooltip disableTouchListener title="Pesquisar">
        <IconButton onClick={handleButtonClick}>
          <IconSearch htmlColor={iconColor} />
        </IconButton>
      </Tooltip>
    </Container>
  );
};

const InputSearch = forwardRef(InputSearchComponent);

export default memo(InputSearch);
