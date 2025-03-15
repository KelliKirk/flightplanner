import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  width: 100%;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const DatePickerWrapper = styled.div`
  width: 100%;
  
  .react-datepicker-wrapper {
    width: 100%;
  }
  
  .react-datepicker__input-container input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const SearchFilter = ({ name, label, value, onChange, options, type = 'select' }) => {
  return (
    <FilterContainer>
      <Label htmlFor={name}>{label}</Label>

      {type === 'select' ? (
        <Select id={name} value={value} onChange={(e) => onChange(name, e.target.value)}>
          <option value="">Select...</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
      ) : type === 'date' ? (
        <DatePickerWrapper>
          <DatePicker 
            selected={value ? new Date(value) : null}
            onChange={(date) => onChange(name, date ? date.toISOString().split('T')[0] : '')}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
          />
        </DatePickerWrapper>
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
