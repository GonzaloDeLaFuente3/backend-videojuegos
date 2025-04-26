import Perfil from '../models/Perfil.mjs';

export const obtenerTodos = async () => {
  return await Perfil.find().populate('usuario');
};
export const obtenerPerfilesPorUsuario = async (usuarioId) => {
  try {
    const perfiles = await Perfil.find({ usuario: usuarioId });
    return perfiles;
  } catch (error) {
    throw new Error('Error al obtener los perfiles');
  }
};

export const obtenerPorId = async (id) => {
  return await Perfil.findById(id).populate('usuario');
};

export const crear = async (datos) => {
  const perfil = new Perfil(datos);
  return await perfil.save();
};

export const actualizar = async (id, datos) => {
  return await Perfil.findByIdAndUpdate(id, datos, { new: true });
};

export const eliminar = async (id) => {
  return await Perfil.findByIdAndDelete(id);
};

export default { obtenerTodos, obtenerPorId, crear, actualizar, eliminar, obtenerPerfilesPorUsuario };