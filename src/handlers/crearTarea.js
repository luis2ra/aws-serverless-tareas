const { dynamo } = require('../utils/dynamoClient');
const { v4: uuidv4 } = require('uuid');

module.exports.crearTarea = async (event) => {
  const body = JSON.parse(event.body);
  const { usuario, descripcion } = body;

  if (!usuario || !descripcion) {
    return {
      statusCode: 400,
      body: JSON.stringify({ mensaje: "usuario y descripcion son requeridos" }),
    };
  }

  const fecha = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const fecha_id = `${fecha}#${uuidv4()}`;

  const item = {
    usuario,
    fecha_id,
    descripcion,
  };

  await dynamo.put({
    TableName: process.env.TABLA_TAREAS,
    Item: item
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ mensaje: "Tarea creada", item }),
  };
};
