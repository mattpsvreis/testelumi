interface ButtonProps {
  children: React.ReactNode;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  id,
  type = 'button',
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded border border-dark-background/50 p-2 font-medium shadow-lg dark:border-light-background ${disabled ? 'cursor-not-allowed bg-light-foreground dark:bg-dark-foreground' : 'cursor-pointer bg-light-primary dark:bg-dark-primary'} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
