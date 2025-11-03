
export default function Button({
  children,
  type = 'button',
  onClick = () => {},
  disabled = false,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn-primary ${className}`}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}