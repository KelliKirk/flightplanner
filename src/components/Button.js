import { StyledButton } from './styled/button.styled';

const Button = ({ children, primary, secondary, ...props }) => {
  return (
    <StyledButton primary={primary} secondary={secondary} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;