
export default function Checkbox({ id, checked = false, onChange = () => {}, label = '' }) {
  return (
    <label className="checkbox-container" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
        aria-checked={checked}
      />
      <span className="checkbox-custom" />
      <span className="checkbox-label-text">{label}</span>
    </label>
  );
}