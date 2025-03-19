const mongoose = require('mongoose');

// Definir o esquema do agendamento
const agendamentoSchema = new mongoose.Schema({
  nomeCompleto: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
});

// Criar o modelo
const Agendamento = mongoose.model('Agendamento', agendamentoSchema);

module.exports = Agendamento;