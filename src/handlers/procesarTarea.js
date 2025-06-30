const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const { dynamo } = require('../utils/dynamoClient');

module.exports.procesarTarea = async (event) => {
  for (const record of event.Records) {
    const tarea = JSON.parse(record.body);

    try {
      await dynamo.put({
        TableName: process.env.TABLA_TAREAS,
        Item: tarea,
      }).promise();

      await sns.publish({
        TopicArn: process.env.SNS_TAREA_PROCESADA_ARN,
        Subject: "Tarea Procesada",
        Message: JSON.stringify({
          evento: "TAREA_PROCESADA",
          tarea,
        }),
      }).promise();

      console.log("✅ Tarea procesada y notificada:", tarea);
    } catch (err) {
      console.error("❌ Error procesando tarea:", tarea, err);
    }
  }

  return { statusCode: 200 };
};
// Este handler se invoca automáticamente por SQS cuando hay mensajes en la cola
// Asegúrate de configurar el trigger en serverless.yml para que este handler procese
// los mensajes de la cola SQS creada en el handler de crearTarea.js