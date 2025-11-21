export default function Input({ value, onChange, onEnter }) {
  return (
    <input
        className="inpput"
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={(e) => e.key === 'Enter' && onEnter()}
      placeholder="Введите город "
     
    />
  );
}