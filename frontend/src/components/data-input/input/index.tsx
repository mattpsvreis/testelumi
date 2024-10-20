import { HTMLInputTypeAttribute } from 'react';

interface InputProps {
  type?: HTMLInputTypeAttribute;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  placeholder,
  required,
  onChange,
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className='rounded border border-dark-background/50 bg-light-foreground/40 px-3 py-2 text-light-text shadow-lg outline-none placeholder:text-light-placeholder dark:border-light-background dark:bg-dark-foreground dark:text-dark-text dark:placeholder:text-dark-placeholder'
    />
  );
};

export default Input;
