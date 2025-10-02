import prisma from "../config/prismaClient.js";

export const addCart = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("body in addcart:",req.body)
    const productId = parseInt(req.body.productId);
    const quantity = parseInt(req.body.quantity);

    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid productId or quantity" });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (quantity > product.stock) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    const existing = await prisma.cart.findUnique({
      where: { user_product_unique: { userId, productId } },
    });

    const cartItem = existing
      ? await prisma.cart.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + quantity },
        })
      : await prisma.cart.create({
          data: { userId, productId, quantity },
        });

    res.status(200).json({ message: "Cart added", cartItem });
  } catch (error) {
    console.error("[addCart error]:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = parseInt(req.body.productId);
    const quantity = parseInt(req.body.quantity);
    console.log(productId, quantity);

    if (quantity <= 0) {
      return res.status(400).json({ message: "Quantity should not be zero. Do you want to remove this item?" });
    }
    else if (!productId ) {
      return res.status(400).json({ message: "Invalid productId or quantity" });
    }

    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });
    
    if (quantity > product.stock)
      return res.status(400).json({ message: "Not enough stock" });

    const searchcart = await prisma.cart.findUnique({
      where: {
        user_product_unique: {
          userId: parseInt(userId),
          productId: parseInt(productId),
        },
      },
    });

    const updatecart = await prisma.cart.update({
      where: { id: searchcart.id },
      data: { quantity: parseInt(quantity) },
    });

    return res.status(200).json({ message: "update success", updatecart });
  } catch (error) {
    console.log("[error] updatecart in cartController", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteCart = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const productId  = parseInt(req.body.productId);
    console.log(userId, productId)

    const searchcart = await prisma.cart.findUnique({
      where: {
        user_product_unique: {
          userId: userId,
          productId: productId,
        },
      },
    });

    const deletecart = await prisma.cart.delete({
      where: { id: searchcart.id },
    });

    console.log(deletecart);
    return res.status(200).json({
      message: "Deleted cart successfully",
      data: deleteCart,
    });
  } catch (error) {
    console.error("[error] deletecart in cartController:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const allCart = await prisma.cart.findMany({
      where: { userId },
      include: {
        product: true, // join product info
      },
      orderBy: {
        createdAt: "desc", //
      },
    });

    res.status(200).json({
      message: "Cart fetched successfully",
      cart: allCart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};
