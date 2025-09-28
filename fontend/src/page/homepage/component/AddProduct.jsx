import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../../store/productSlice";

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
    onUpdataProduct(prev=>!prev)
    console.log("productPic:", productPic);
  };
  const handleAddproduct =  (e) => {
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
    dispatch(addProduct(product));
    onUpdataProduct(prev=>!prev)
  };
  
  return (
    <div>
      <label className="relative cursor-pointer w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-primary transition">
        {previewPic && (
          <img
            src={previewPic}
            alt="profilepic Preview"
            className="w-full h-full object-cover"
          />
        )}
      </label>
      <form
        onSubmit={handleAddproduct}
        className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Add Product</h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Product description"
            className="textarea textarea-bordered w-full"
            onChange={handleChange}
          />
        </div>

        {/* Price & Stock in 2 columns */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="0.00"
              className="input input-bordered w-full"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              placeholder="0"
              className="input input-bordered w-full"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleFileChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-4 hover:scale-105 transition-transform"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
