// components/SearchFilter.js
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  min-width: 200px;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SearchFilter = ({ name, label, value, onChange, options, type = 'select' }) => {
  return (
    <FilterContainer>
      <Label htmlFor={name}>{label}</Label>
      
      {type === 'select' ? (
        <Select 
          id={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
        >
          <option value="">Vali...</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
      ) : (
        <Input 
          id={name}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
        />
      )}
    </FilterContainer>
  );
};

export default SearchFilter;