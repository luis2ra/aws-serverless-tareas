const { dynamo } = require('../utils/dynamoClient');

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
