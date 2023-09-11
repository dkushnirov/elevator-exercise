import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary';
};

export const StyledButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 4px;

  ${(props) =>
    props.variant === 'primary'
      ? `
      background-color: ${props.theme.colors.gray4};
      color: ${props.theme.colors.white};
    `
      : `
      background-color: ${props.theme.colors.white};
      color: ${props.theme.colors.gray4};
      border: 1px solid ${props.theme.colors.gray4};
    `}

  &:hover {
    ${(props) =>
      props.variant === 'primary'
        ? `
        background-color: ${props.theme.colors.gray2};
      `
        : `
        background-color: ${props.theme.colors.gray1};
        border: 1px solid ${props.theme.colors.gray2};
      `}
  }
`;
