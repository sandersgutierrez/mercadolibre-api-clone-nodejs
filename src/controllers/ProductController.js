'use strict';

const Product = require('../models/ProductModel');

const getAllProducts = (req, res) => {
    Product.find({}, { __v: 0 }, (err, products) => {
        if (err) {
            return res.status(500).send({
                message: `Ha ocurrido un error al procesar la peticion: ${err}`,
            });
        }

        if (!products) {
            return res.status(200).send({
                message: `No existen productos`,
            });
        }

        res.status(200).send({
            products: products,
        });
    });
};

const getProduct = (req, res) => {
    const { productId } = req.params;

    Product.findById(productId, (err, product) => {
        if (err) {
            return res.status(500).send({
                message: `Ha ocurrido un error al realizar la petición: ${err}`,
            });
        }

        if (!product) {
            return res.status(404).send({
                message: `El producto no existe`,
            });
        }

        res.status(200).send({
            product: product,
        });
    });
};

const saveProduct = (req, res) => {
    const product = new Product();

    product.name = req.body.name;
    product.photo = req.body.photo;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save((err, productStored) => {
        if (err) {
            res.status(500).send({
                message: `Error al guardar en la base de datos: ${err}`,
            });
        }

        res.status(201).send({
            product: productStored,
        });
    });
};

const updateProduct = (req, res) => {
    const { productId } = req.params;
    const updateBody = req.body;

    Product.findByIdAndUpdate(productId, updateBody, { new: true }, (err, productUpdated) => {
        if (err) {
            res.status(500).send({
                message: `Error al actualizar producto: ${err}`,
            });
        }

        res.status(200).send({
            producto: productUpdated,
        });
    });
};

const deleteProduct = (req, res) => {
    const { productId } = req.params;

    Product.findById(productId, (err, product) => {
        if (err) {
            res.status(500).send({
                message: `Error al borrar producto de la base de datos: ${err}`,
            });
        }

        product.remove((err) => {
            if (err) {
                res.status(500).send({
                    message: `Error al borrar producto de la base de datos: ${err}`,
                });
            }

            res.status(200).send({
                message: `El producto ha sido borrado`,
            });
        });
    });
};

module.exports = {
    getProduct,
    getAllProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
};