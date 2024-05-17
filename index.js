const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const autoPecaController = require("./controllers/AutoPecaControlls");
app.use(cors());
dotenv.config();
app.use(express.json());

//carregando o cabeçalho do html em outras páginas
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//alterado para true
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//arquivos estáticos
app.use("/css", express.static("public/css"));

app.use("/imgs", express.static("public/imgs"));

//config do bd
mongoose
  .connect(process.env.MONGO_ATLAS_URL)
  .then(() => console.log("Conexão com o banco de dados bem-sucedida"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => res.send("Servidor rodando"));

app.use("/pecas", autoPecaController);

app.listen(5000, () => {
  console.log("Servidor rodando na url http://localhost:5000/pecas/home");
});
