import React from "react";
import { checkProduct } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import AddProduct from "./component/AddProduct";
import { useState } from "react";

const Homepage = () => {
  const dispatch = useDispatch();


  // check add product
  const [newProduct ,checkNewProduct ] = useState(false);
  const handleCheckAddproduct = (value) =>{
    checkNewProduct(value)
  }
  const { listProduct } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(checkProduct());
  }, [newProduct]);

  return (
    <div className="min-h-screen">
      <AddProduct onUpdataProduct={handleCheckAddproduct}/>

      {/* list product */}
      <div className="container mx-auto px-4 py-8 ">
        <h1 className="text-3xl font-bold mb-6">Product</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listProduct.map((product) => (
            <div
              key={product.id}
              className=" shadow-md rounded-lg overflow-hidden 
             hover:shadow-xl transition-shadow duration-300
             transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={product.image.url}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className=" font-medium mb-2">
                  ${product.price}
                </p>
                <p
                  className={`mb-4 ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  } font-semibold`}
                >
                  {product.stock > 0
                    ? `Stock: ${product.stock}`
                    : "Out of Stock"}
                </p>
                <div className="max-w-md mx-auto mt-6 space-y-4">
                  {/* Input + +,- buttons */}
                  <div className="join w-full">
                    <input
                      type="text"
                      placeholder="amount"
                      className="input input-bordered join-item flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button className="btn  join-item hover:bg-blue-600 transition-colors">
                      +
                    </button>
                    <button className="btn  join-item hover:bg-red-500 transition-colors">
                      -
                    </button>
                  </div>

                  {/* Add to cart button */}
                  <button
                    disabled={product.stock === 0}
                    className={`w-full py-2 px-4 rounded-lg text-white text-lg font-semibold transition-all duration-200 ${
                      product.stock > 0
                        ? "bg-blue-500 hover:bg-blue-600 hover:scale-105"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
