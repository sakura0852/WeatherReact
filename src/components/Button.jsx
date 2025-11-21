
export default function Button({ onClick, loading }) {
  return (
    <button className="button"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Найти' : 'Найти'}
    </button>
  );
}