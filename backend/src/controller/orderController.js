import prisma from "../config/prismaClient.js";

export const confirmOrder = async (req, res) => {
  try {

    const cart = await prisma.cart.findMany({
      where: {userId: req.user.id},
      include: { product: true },
    })
    console.log(cart)
    
    if (cart.length === 0) return res.status(400).json({ message: "Cart is empty"})

    const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const confirmOrderId = await prisma.order.create({
      data:{
        userId: req.user.id,
        total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        orderItems :{
          create: cart.map((item)=>({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
          })),
        },
      },
      include:{ orderItems: true},
    })
    console.log(confirmOrder)

    // update stock in product, delete cart
    await Promise.all(
      cart.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: product.stock - item.quantity },
        });
      })
    );
    console.log("All products updated");

    await Promise.all(
      cart.map((item) => prisma.cart.delete({ where: { id: item.id } }))
    );
    console.log("Deleted all items");


    return res.status(200).json({ confirmOrderId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const checkOrderByUserId = async (req, res) => {
  try {
    const checkOrder = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        orderItems: {
          include: {
            product: true, 
          },
        },
      },
    });

    return res.status(200).json({ order: checkOrder });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const checkAllOrder = async (req, res) => {
  try {
    const checkAllOrder = await prisma.order.findMany({
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    return res.status(200).json({ checkAllOrder });
  } catch (error) {
    return res.status(500).json(error);
  }
};
