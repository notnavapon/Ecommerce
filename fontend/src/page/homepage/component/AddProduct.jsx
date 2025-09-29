import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../../store/productSlice";
import { Toaster } from "react-hot-toast";

const AddProduct = ({ onUpdataProduct }) => {
  const dispatch = useDispatch();
  const [productFormData, setProductFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  // send data to backend
  const [productPic, setproductPic] = useState(null);
  //preview pic on font
  const [previewPic, setPreviewPic] = useState(null);

  const handleChange = (e) => {
    setProductFormData({ ...productFormData, [e.target.name]: e.target.value });
    console.log(productFormData);
  };

  const handleFileChange = async (e) => {
    const file = await e.target.files[0];
    if (file) {
      setproductPic(file);
      // สร้าง URL ชั่วคราวจากไฟล์
      setPreviewPic(URL.createObjectURL(file));
    }
    console.log("productPic:", productPic);
  };

  const handleAddproduct = async (e) => {
    e.preventDefault();

    const product = new FormData();
    product.append("name", productFormData.name);
    product.append("description", productFormData.description);
    product.append("price", productFormData.price);
    product.append("stock", productFormData.stock);
    if (productPic) {
      product.append("image", productPic);
    }
    //check product before send api
    // for (let pair of product.entries()) {
    //   console.log(pair[0] + ": ", pair[1]);
    // }
    const newProduct = await dispatch(addProduct(product));

    if (addProduct.fulfilled.match(newProduct)) {
      // ถ้า login สำเร็จ → เรียก checkCurrentUser
      dispatch(checkProduct());
      onUpdataProduct((prev) => !prev);
    } else {
      console.log("Add product fail:", checkAuth.payload);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-8 p-6">
      <Toaster />
      {/* Image Preview */}
      <form
        onSubmit={handleAddproduct}
        className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-6  items-center"
      >
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
          Add Product
        </h2>
        <label className="relative cursor-pointer w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-700 flex items-center justify-center mb-6 hover:border-blue-500 transition-colors duration-300 mx-auto">
          {previewPic ? (
            <img
              src={previewPic}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-600">Upload</span>
          )}
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            className="input input-bordered w-full rounded-lg"
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Product description"
            className="textarea textarea-bordered w-full rounded-lg"
            onChange={handleChange}
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="0.00"
              className="input input-bordered w-full rounded-lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              placeholder="0"
              className="input input-bordered w-full rounded-lg"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full py-3 text-lg font-semibold hover:scale-105 transition-transform rounded-lg"
        >
          Add Product
        </button>
      </form>

      {/* //rigth */}
      <div className=" bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img
          src={previewPic || "/placeholder.png"}
          alt={previewPic}
          className="w-full h-56 object-cover"
        />
        <div className="p-6 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {productFormData.name || "Product Name"}
            </h2>
            <p className="text-lg font-medium text-gray-600 mb-2">
              ${productFormData.price || "0.00"}
            </p>
            <p
              className={`mb-4 font-semibold ${
                productFormData.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {productFormData.stock > 0
                ? `Stock: ${productFormData.stock}`
                : "Out of Stock"}
            </p>
          </div>

          <div className="space-y-4">
            {/* Input + +,- buttons */}
            <div className="join w-full">
              <input
                type="text"
                placeholder="amount"
                className="input input-bordered join-item flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="btn join-item hover:bg-blue-600 transition-colors">
                +
              </button>
              <button className="btn join-item hover:bg-red-500 transition-colors">
                -
              </button>
            </div>

            {/* Add to cart button */}
            <button
              disabled={productFormData.stock === 0}
              className={`w-full py-3 rounded-lg text-white text-lg font-semibold transition-all duration-200 ${
                productFormData.stock > 0
                  ? "bg-blue-500 hover:bg-blue-600 hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
