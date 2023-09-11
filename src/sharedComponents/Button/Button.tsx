import { ButtonProps, StyledButton } from './Button.styles';

function Button({ children, ...rest }: ButtonProps) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
