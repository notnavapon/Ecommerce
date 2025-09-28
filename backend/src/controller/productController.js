import prisma from "../config/prismaClient.js";

export const addProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;

  try {
    if (!name || !price || !stock || !req.file) {
      return res.status(400).json({ error: "All fields are required including image" });
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
      product: product
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Error at productController" });
  }
};

export const updateStockProduct = async (req, res) => {
  const { id, stock } = req.body;

  //check role
  const  {role} = req.user;
  if(role !=="admin"){
    return res.status(403).json({message : "You do not have permission"})
  }

  try{
    const updataStockProduct = await prisma.product.update({
      where: {id},
      data: {
        stock: stock
      }
    })

    res.status(200).json({message: "update stock", updataStockProduct})

  }catch(error){

  }

};


export const checkProduct = async (req, res) => {
  try {
    const listProduct = await prisma.product.findMany({
      select:{
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        image: true
      }
    })

    res.status(200).json({message: "let see", listProduct})
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Error at productController" });
  }
};
