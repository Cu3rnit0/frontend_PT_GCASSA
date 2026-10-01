import { useState } from 'react';
import Spinner from './Spinner';

// Se monta con `key` desde el padre, así el formulario se reinicia solo
export default function HaciendaFormModal({ hacienda, onSubmit, onClose }) {
  const [form, setForm] = useState({
    nombre: hacienda?.nombre ?? '',
    ubicacion: hacienda?.ubicacion ?? '',
    estatus: hacienda?.estatus ?? true,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio';
    else if (form.nombre.trim().length > 100) e.nombre = 'Máximo 100 caracteres';
    if (!form.ubicacion.trim()) e.ubicacion = 'La ubicación es obligatoria';
    else if (form.ubicacion.trim().length > 150) e.ubicacion = 'Máximo 150 caracteres';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setSaving(true);
    await onSubmit({
      nombre: form.nombre.trim(),
      ubicacion: form.ubicacion.trim(),
      estatus: form.estatus,
    });
    setSaving(false);
  };

  const inputClass = (hasError) =>
    `w-full rounded border px-3 py-2 focus:outline-none focus:ring-1 ${
      hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-xl font-bold text-gray-800">
          {hacienda ? 'Editar hacienda' : 'Nueva hacienda'}
        </h3>

        <div className="mb-4">
          <label htmlFor="nombre" className="mb-1 block text-sm font-bold text-gray-700">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className={inputClass(errors.nombre)}
            placeholder="Ej. Hacienda El Roble"
          />
          {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="ubicacion" className="mb-1 block text-sm font-bold text-gray-700">Ubicación</label>
          <input
            id="ubicacion"
            type="text"
            value={form.ubicacion}
            onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
            className={inputClass(errors.ubicacion)}
            placeholder="Ej. Santa Ana, El Salvador"
          />
          {errors.ubicacion && <p className="mt-1 text-sm text-red-600">{errors.ubicacion}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="estatus" className="mb-1 block text-sm font-bold text-gray-700">Estatus</label>
          <select
            id="estatus"
            value={form.estatus ? '1' : '0'}
            onChange={(e) => setForm({ ...form, estatus: e.target.value === '1' })}
            className={inputClass(false)}
          >
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded bg-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {saving && <Spinner className="h-4 w-4" />}
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
