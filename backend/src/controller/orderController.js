import prisma from "../config/prismaClient.js";
import { getCart } from "./cartController.js";

export const confirmOrder = async (req, res) => {
  try {
    const cart = req.body.cart;
    console.log(cart);

    const newOrder = await prisma.order.create({
      data: {
        userId: req.user.id,
        total: cart.reduce(
          (sumcost, cart) => sumcost + cart.quantity * cart.product.price,
          0
        ),
        orderItems: {
          create: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        orderItems: true, // คืนค่า OrderItem ทั้งหมดที่สร้างพร้อมกับ Order
      },
    });

    //update stock in product, delete cart
    await Promise.all(
      newOrder.orderItems.map(async (item) => {
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

    // cart.map((item) => {
    //   const deletecart = prisma.cart.delete({
    //     where: { id: item.id },
    //   });

    //   console.log(deletecart);
    // });

    await Promise.all(
      cart.map((item) => prisma.cart.delete({ where: { id: item.id } }))
    );
    console.log("Deleted all items");

    return res.status(200).json({ newOrder });
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
            product: true, // ดึงข้อมูลสินค้าแต่ละชิ้นมาด้วย
          },
        },
      },
    });

    return res.status(200).json({ checkOrder });
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
