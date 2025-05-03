import Perfil from '../models/Perfil.mjs';

export const obtenerTodos = async () => {
  return await Perfil.find().populate('usuario');// populate('usuario') carga los datos del usuario asociado al perfil y find() obtiene todos los perfiles de la base de datos
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
  return await Perfil.findByIdAndUpdate(id, datos, { new: true });// { new: true } devuelve el documento actualizado. findByIdAndUpdate busca un documento por su id y lo actualiza con los nuevos datos
};

export const eliminar = async (id) => {
  return await Perfil.findByIdAndDelete(id);
};

export default { obtenerTodos, obtenerPorId, crear, actualizar, eliminar, obtenerPerfilesPorUsuario };