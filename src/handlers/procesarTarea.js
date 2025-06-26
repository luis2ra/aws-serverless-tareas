const { dynamo } = require('../utils/dynamoClient');

module.exports.procesarTarea = async (event) => {
  for (const record of event.Records) {
    const tarea = JSON.parse(record.body);

    try {
      await dynamo.put({
        TableName: process.env.TABLA_TAREAS,
        Item: tarea,
      }).promise();
      console.log("✅ Tarea procesada:", tarea);
    } catch (err) {
      console.error("❌ Error al guardar tarea:", tarea, err);
    }
  }

  return { statusCode: 200 };
};
// Este handler se invoca automáticamente por SQS cuando hay mensajes en la cola
// Asegúrate de configurar el trigger en serverless.yml para que este handler procese
// los mensajes de la cola SQS creada en el handler de crearTarea.js