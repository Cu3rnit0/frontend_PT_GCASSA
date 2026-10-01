export default function Spinner({ className = 'h-8 w-8' }) {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className={`${className} animate-spin rounded-full border-4 border-green-200 border-t-green-600`}
    />
  );
}
