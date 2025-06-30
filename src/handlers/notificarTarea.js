module.exports.notificarTarea = async (event) => {
  for (const record of event.Records) {
    const mensaje = JSON.parse(record.Sns.Message);
    console.log("🔔 Notificación recibida:", mensaje);
  }
};
