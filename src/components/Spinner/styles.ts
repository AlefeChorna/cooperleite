import styled, { keyframes } from 'styled-components';

interface CustomSpinnerProps {
  width?: number;
  fillColor?: string;
  activeColor?: string;
  activeBorderWidth?: number;
}

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const CustomSpinner = styled.div<CustomSpinnerProps>`
  width: ${(props): number => props.width || 80}px;
  height: ${(props): number => props.width || 80}px;
  background: transparent;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2.5px solid ${(props): string => props.fillColor || '#29292e'};
  border-right: 2.5px solid ${(props): string => props.fillColor || '#29292e'};
  border-bottom: 2.5px solid ${(props): string => props.fillColor || '#29292e'};
  border-left: ${(props): number => props.activeBorderWidth || 6}px solid
    ${(props): string => props.activeColor || '#fd951f'};
  border-radius: 50%;
  margin: 0 auto;
`;

export const Container = styled.div`
  display: inline-block;
  padding: 20px;
  align-content: center;
  width: 100%;
`;

export const Text = styled.span`
  display: block;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 15px;
  color: #fd951f;
`;
