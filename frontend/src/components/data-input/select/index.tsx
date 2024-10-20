import React from 'react';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='mr-2 rounded border border-dark-background/50 bg-light-foreground/40 p-2 text-light-text shadow-sm outline-none focus:border-light-primary focus:ring focus:ring-light-primary/20 focus:ring-opacity-50 dark:border-gray-600 dark:bg-dark-foreground dark:text-dark-text dark:focus:border-dark-primary dark:focus:ring-dark-primary/50'
    >
      <option value='' className='text-gray-500 dark:text-gray-400'>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option
          key={index}
          value={option}
          className='bg-light-foreground/40 text-light-text dark:bg-dark-foreground dark:text-dark-text'
        >
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
