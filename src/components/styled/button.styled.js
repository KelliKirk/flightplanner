import styled from 'styled-components';

export const StyledButton = styled.button`
  border-radius: 50px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 60px;
  background-color: ${({ primary, secondary, theme }) => 
    primary 
      ? theme.colors.primary 
      : secondary 
        ? theme.colors.secondary 
        : '#fff'};
  color: ${({ primary, secondary }) => 
    primary || secondary 
      ? '#fff' 
      : '#333'};
  
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;