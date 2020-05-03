import React from 'react';

import { Container, CustomSpinner, Text } from './styles';

interface SpinnerProps {
  loading?: boolean;
  loadingText?: string;
  loadingTextStyle?: React.CSSProperties;
  width?: number;
  fillColor?: string;
  activeColor?: string;
  activeBorderWidth?: number;
}

const Spinner: React.FC<SpinnerProps> = ({
  loading = true,
  loadingText = 'Buscando dados...',
  loadingTextStyle = {},
  width,
  activeBorderWidth,
  activeColor,
  fillColor,
}) => {
  if (!loading) return <></>;

  return (
    <Container>
      <CustomSpinner
        width={width}
        activeBorderWidth={activeBorderWidth}
        activeColor={activeColor}
        fillColor={fillColor}
      />

      {!!loadingText && <Text style={loadingTextStyle}>{loadingText}</Text>}
    </Container>
  );
};

export default Spinner;
