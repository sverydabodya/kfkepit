
import { StylesConfig } from 'react-select';

interface GroupOption {
  value: string;
  label: string;
}

const customStyles: StylesConfig<GroupOption, true> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#171717',
    borderColor: 'transparent',
    borderRadius: '4px',
    padding: '2px',
    minHeight: '40px',
    color: 'white',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#2c2c2c',
    color: 'white',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'red',
    ':hover': {
      backgroundColor: 'red',
      color: 'white',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#171717',
    color: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#333' : '#171717',
    color: 'white',
    ':hover': {
      backgroundColor: '#555',
    },
  }),
  input: (provided) => ({
    ...provided,
    color: 'white',
    pointerEvents: 'none', 
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'gray',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
};

export default customStyles;
