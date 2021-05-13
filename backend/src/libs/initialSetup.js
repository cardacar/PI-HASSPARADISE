import role from "../models/rolModel";
//Creamos datos iniciales en la coleccion de roles si no existen
export const createRoles = async () => {
  try {
    //Verifico si hay datos
    const count = await role.estimatedDocumentCount();
    //Si existe por lo menos un dato no procedo con lo demas
    if (count > 0) return;
    //Si no existen roles creo unos roles por defecto
    const values = await Promise.all([
      await new role({ name: "user" }).save(),
      await new role({ name: "admin" }).save(),
    ]);
    //Si existe algun error  lo muestro
  } catch (error) {
      console.error(error)
  }
};
