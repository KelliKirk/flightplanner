import styled from 'styled-components';

const ErrorContainer = styled.div`
  background-color: #ffe0e0;
  color: #d8000c;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 5px;
  border: 1px solid #d8000c;
`;

const ErrorMessage = ({ message }) => {
  return (
    <ErrorContainer>
      <p>{message}</p>
    </ErrorContainer>
  );
};

export default ErrorMessage;