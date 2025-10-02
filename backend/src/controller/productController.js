import cloudinary from "../config/cloudinary.js";
import prisma from "../config/prismaClient.js";

export const addProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  console.log(req.user);

  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({ message: "You do not have permission" });
  }

  try {
    if (!name || !price || !stock || !req.file) {
      return res
        .status(400)
        .json({ error: "All fields are required including image" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        image: req.file.path,
      },
    });

    res.status(200).json({
      message: "Product added successfully",
      product: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error at productController" });
  }
};

export const updateStockProduct = async (req, res) => {
  const { stock } = req.body;
  console.log(req.body);

  //check role
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({ message: "You do not have permission" });
  }

  try {
    const updateStockProduct = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: {
        stock: parseInt(stock),
      },
    });

    res.status(200).json({
      message: "update stock",
      updateStockProduct: updateStockProduct,
    });
  } catch (error) {
    console.error("[Eror] updateStockProduct in productController", error);
    res.status(500).json({ message: "Error updating stock product" });
  }
};

export const checkProduct = async (req, res) => {
  try {
    const listProduct = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        image: true,
      },
    });

    res.status(200).json({ message: "let see", listProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error at productController" });
  }
};

export const updateProduct = async (req, res) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({ message: "You do not have permission" });
  }
  try {
    const { name, description, price } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: {
        name: name,
        description: description,
        price: parseFloat(price),
      },
    });

    res.status(200).json({
      message: "Product updated Successfully",
      productUpdate: updatedProduct,
    });
  } catch (error) {
    console.error("[Eror] updateProduct in productController", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({ message: "You do not have permission" });
  }

  try {
    //delete product in cart when have product
    const deleteProductInCart = await prisma.cart.deleteMany({
      where: { productId: Number(req.params.id) },
    });

    // delete image on cloudinary
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
    });
    const deleteImage = await cloudinary.uploader.destroy(
      product.image.public_id
    );
    if (deleteImage.result !== "ok") {
      return res.status(400).json({ message: "Failed to delete image" });
    }

    //delete
    console.log("Call deleteProduct");
    const deleteProduct = await prisma.product.delete({
      where: { id: Number(req.params.id) },
    });

    res.status(200).json({
      message: "Product deleted Successfully",
    });
  } catch (error) {
    console.error("[Eror] deleteProduct in productController", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
