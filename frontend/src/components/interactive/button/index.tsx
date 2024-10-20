interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded border border-dark-background/50 bg-light-primary p-2 font-medium shadow-lg dark:border-light-background ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
