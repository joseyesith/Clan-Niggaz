export function Button({ onClick, children }) {
  return (
    <button
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md my-2 disabled:bg-red-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

