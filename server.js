require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Agendamento = require("./models/Agendamento");

const app = express();
const PORT = process.env.PORT || 4000;

// Configuração do CORS
const corsOptions = {
  origin: "https://front-agenda-eta.vercel.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Conectar ao MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB Atlas"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB Atlas:", err));

// Rota raiz
app.get("/", (req, res) => {
  res.send("Bem-vindo à API de Agendamento!");
});

// Rota para receber os dados do formulário
app.post("/api/agendamento", async (req, res) => {
  const { nomeCompleto, whatsapp, data, hora } = req.body;

  // Validar se todos os campos foram enviados
  if (!nomeCompleto || !whatsapp || !data || !hora) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    // Verificar se o horário já está agendado
    const horarioJaAgendado = await Agendamento.findOne({ data, hora });

    if (horarioJaAgendado) {
      return res.status(400).json({ error: "Horário já agendado." });
    }

    // Salvar o novo agendamento
    const novoAgendamento = new Agendamento({
      nomeCompleto,
      whatsapp,
      data,
      hora,
    });
    await novoAgendamento.save();

    res.status(200).json({ message: "Agendamento realizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar o agendamento:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});