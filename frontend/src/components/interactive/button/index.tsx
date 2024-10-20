interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  className,
}) => {
  return (
    <button
      type={type}
      className={`rounded border border-dark-background/50 bg-light-primary p-2 shadow-lg dark:border-light-background ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
