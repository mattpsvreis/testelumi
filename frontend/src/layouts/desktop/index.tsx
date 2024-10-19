interface DesktopLayout {
  children: React.ReactNode;
}

const DesktopLayout: React.FC<DesktopLayout> = ({ children }) => {
  return <div>{children}</div>;
};

export default DesktopLayout;
