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
      className='mr-2 rounded border border-dark-background/50 bg-light-foreground/40 p-2 text-light-text shadow-sm outline-none placeholder:text-light-placeholder focus:border-light-primary focus:ring focus:ring-light-primary/20 focus:ring-opacity-50 dark:border-light-background dark:bg-dark-foreground dark:text-dark-text dark:placeholder:text-dark-placeholder dark:focus:border-dark-primary dark:focus:ring-dark-primary/50'
    >
      <option
        value=''
        className='text-light-placeholder dark:text-dark-placeholder'
      >
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
