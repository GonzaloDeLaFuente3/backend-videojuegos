import Usuario from '../models/Usuario.mjs';

export const obtenerTodos = async () => {
    return await Usuario.find();
};

export const obtenerPorId = async (id) => {
    return await Usuario.findById(id);
};

export const actualizar = async (id, datos) => {
    return await Usuario.findByIdAndUpdate(id, datos, { new: true });
};

export const eliminar = async (id) => {
    return await Usuario.findByIdAndDelete(id);
};

export default { obtenerTodos, obtenerPorId, actualizar, eliminar };