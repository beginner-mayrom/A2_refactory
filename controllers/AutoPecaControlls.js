const express = require("express");
const router = express.Router();
const AutoPeca = require("../models/AutoPeca");
const axios = require("axios");

//rota para a página home
router.get("/home", function (req, res) {
  res.render("home");
});

// Buscar todas os registros
router.get('/all', (req, res) => {
  AutoPeca.find().lean().then((products) => {
  res.render("all", { products: products });
  console.log(products);
  });
  });

//rota para a página de cadastro
router.get("/new", function (req, res) {
  res.render("form_add");
});
  

// Cadastrar um novo registro
router.post("/add", async (req, res) => {
  try {
    const { brand, model, year, pieces } = req.body;
    const newAutoPeca = new AutoPeca({ brand, model, year, pieces });
    await newAutoPeca.save();
    res.status(201);
    // Redirecionando para a home
    res.redirect("/pecas/home");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar um registro por ID
router.get("/:id", async (req, res) => {
  try {
    const autoPeca = await AutoPeca.findById(req.params.id);
    res.status(200).json(autoPeca);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar um registro
router.delete("/:id", async (req, res) => {
  try {
    await AutoPeca.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Alterar um registro por ID
router.put("/:id", async (req, res) => {
  try {
    const { brand, model, year, piece } = req.body;
    await AutoPeca.findByIdAndUpdate(req.params.id, {
      brand,
      model,
      year,
      piece,
    });
    res.status(200).json({ message: "Atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
