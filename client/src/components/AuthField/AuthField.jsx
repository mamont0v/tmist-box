const AuthField = ({
  id,
  name,
  value,
  type,
  placeholder,
  onChange,
  autoComplete,
  children,
  svg,
  ...props
}) => {
  return (
    <div>
      <div>
        <div
          id={id}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e)}
        />
        {children}
        <div>{svg}</div>
      </div>
    </div>
  );
};

export default AuthField;
