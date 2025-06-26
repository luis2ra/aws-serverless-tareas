const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamo = new AWS.DynamoDB.DocumentClient();

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

module.exports.listarTareas = async (event) => {
  const usuario = event.queryStringParameters?.usuario;
  const fecha = event.queryStringParameters?.fecha;

  if (!usuario) {
    return {
      statusCode: 400,
      body: JSON.stringify({ mensaje: "El parámetro 'usuario' es requerido" }),
    };
  }

  const params = {
    TableName: process.env.TABLA_TAREAS,
    KeyConditionExpression: '#usuario = :usuario',
    ExpressionAttributeNames: {
      '#usuario': 'usuario',
    },
    ExpressionAttributeValues: {
      ':usuario': usuario,
    }
  };

  if (fecha) {
    params.KeyConditionExpression += ' AND begins_with(#fecha_id, :fecha)';
    params.ExpressionAttributeNames['#fecha_id'] = 'fecha_id';
    params.ExpressionAttributeValues[':fecha'] = fecha;
  }

  const result = await dynamo.query(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
};
