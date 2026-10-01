import { useState, useEffect } from 'react';
import { haciendasApi } from '../services/haciendasApi';
import Spinner from '../components/Spinner';

export default function Dashboard() {
  const [total, setTotal] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    haciendasApi
      .contar()
      .then((data) => setTotal(data.total))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Panel Principal</h1>

      <div className="max-w-sm rounded-xl border-l-4 border-green-500 bg-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Total de Haciendas
            </h3>

            {error ? (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            ) : total === null ? (
              <div className="mt-3"><Spinner /></div>
            ) : (
              <p className="mt-2 text-5xl font-bold text-gray-800">{total}</p>
            )}
          </div>
          <div className="rounded-full bg-green-100 p-3">
            <span className="text-3xl" aria-hidden="true">🌾</span>
          </div>
        </div>
      </div>
    </>
  );
}
