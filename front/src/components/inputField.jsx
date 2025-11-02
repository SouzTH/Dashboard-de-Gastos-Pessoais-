
export default function InputField({
    id,
    label,
    type = 'text',
    name,
    placeholder = '',
    onChange = () => {},
    required = false,
}) {
    return (          
        <div className="input-field">
            {label && <label htmlFor={id} className="input-label">{label}</label>}
            <input
                id = {id}
                name = {name}
                type={type}
                placeholder={placeholder}
                className="input-field"
                onChange={onChange}
                required={required}
                aria-label={label || name}
                autoComplete={type === 'password' ? 'current-password' : 'off'}
            />
        </div>
    );
}