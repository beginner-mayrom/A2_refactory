const express = require("express");
const router = express.Router();
const AutoPeca = require("../models/AutoPeca");

//rota para a página home
router.get("/home", function (req, res) {
  res.render("home");
});

// Buscar todas os registros
router.get("/all", (req, res) => {
  AutoPeca.find()
    .lean()
    .then((products) => {
      res.render("all", { products: products });
      res.status(200);
    })
    .catch((err) => {
      res.status(500).send(err.message);
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

//---------parei aqui--------
// Deletar um registro
router.delete("/delete/:id", async (req, res) => {
  try {
    await AutoPeca.findByIdAndDelete(req.params.id);
    res.status(200);
    res.redirect("/pecas/home");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar um registro por ID
router.get("/product/:id", (req, res) => {
  AutoPeca.findOne({ _id: req.params.id })
    .lean()
    .then((products) => {
      res.render("form_update", { products: products });
      res.status(200);
      console.log(products);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

// Alterar um registro
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
