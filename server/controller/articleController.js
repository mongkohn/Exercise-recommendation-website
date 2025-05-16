const express = require('express');
const Article = require("../models/articleSchema"); // update path to server/models

// Get all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(
      articles.map((a) => ({
        _id: a._id,
        title: a.title,
        description: a.description,
        image: a.image,
        link: a.link
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single article by ID
const getArticleById = async (req, res) => {
  try {
    const a = await Article.findById(req.params.id);
    if (!a) return res.status(404).json({ error: "Article not found" });
    res.json({
      _id: a._id,
      title: a.title,
      description: a.description,
      image: a.image,
      link: a.link
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new article
const createArticle = async (req, res) => {
  try {
    const { title, description, image, link } = req.body;
    const article = new Article({ title, description, image, link });
    await article.save();
    res.status(201).json({
      _id: article._id,
      title: article.title,
      description: article.description,
      image: article.image,
      link: article.link
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update article
const updateArticle = async (req, res) => {
  try {
    const { title, description, image, link } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, description, image, link },
      { new: true }
    );
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json({
      _id: article._id,
      title: article.title,
      description: article.description,
      image: article.image,
      link: article.link
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete article
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};

