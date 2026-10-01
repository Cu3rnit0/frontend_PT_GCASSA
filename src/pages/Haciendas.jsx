import { useEffect, useState } from 'react';
import { useHaciendaStore } from '../store/haciendaStore';
import { toast } from '../store/toastStore';
import Spinner from '../components/Spinner';
import ConfirmModal from '../components/ConfirmModal';
import HaciendaFormModal from '../components/HaciendaFormModal';

export default function Haciendas() {
  const { haciendas, loading, error, fetchHaciendas, crearHacienda, actualizarHacienda, eliminarHacienda } =
    useHaciendaStore();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchHaciendas();
  }, [fetchHaciendas]);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (hacienda) => {
    setEditing(hacienda);
    setFormOpen(true);
  };

  const closeForm = () => setFormOpen(false);

  const handleSubmit = async (datos) => {
    try {
      if (editing) {
        await actualizarHacienda(editing.id, datos);
        toast.success('Hacienda actualizada correctamente');
      } else {
        await crearHacienda(datos);
        toast.success('Hacienda creada correctamente');
      }
      closeForm();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await eliminarHacienda(toDelete.id);
      toast.success('Hacienda eliminada correctamente');
      setToDelete(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Haciendas</h1>
        <button
          onClick={openCreate}
          className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          + Nueva hacienda
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-md">
        {loading ? (
          <div className="flex justify-center p-12"><Spinner className="h-10 w-10" /></div>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="mb-4 text-red-600">{error}</p>
            <button
              onClick={fetchHaciendas}
              className="rounded bg-gray-200 px-4 py-2 font-semibold hover:bg-gray-300"
            >
              Reintentar
            </button>
          </div>
        ) : haciendas.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="mb-1 text-lg font-semibold">Aún no hay haciendas registradas</p>
            <p>Crea la primera con el botón “Nueva hacienda”.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-sm uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Ubicación</th>
                <th className="px-6 py-3">Estatus</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {haciendas.map((h) => (
                <tr key={h.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{h.nombre}</td>
                  <td className="px-6 py-4 text-gray-600">{h.ubicacion}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        h.estatus ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {h.estatus ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEdit(h)} className="mr-4 font-semibold text-blue-600 hover:underline">
                      Editar
                    </button>
                    <button onClick={() => setToDelete(h)} className="font-semibold text-red-600 hover:underline">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {formOpen && (
        <HaciendaFormModal
          key={editing?.id ?? 'nueva'}
          hacienda={editing}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}

      {toDelete && (
        <ConfirmModal
          title="Eliminar hacienda"
          message={`¿Seguro que deseas eliminar “${toDelete.nombre}”? Esta acción no se puede deshacer.`}
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </>
  );
}
