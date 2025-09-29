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
    <div className="flex flex-col items-center">
      <Toaster />

      {/* Image Preview */}
      <label className="relative cursor-pointer w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center mb-6 hover:border-primary transition">
        {previewPic ? (
          <img
            src={previewPic}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">Upload</span>
        )}
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept="image/*"
        />
      </label>

      <form
        onSubmit={handleAddproduct}
        className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
          Add Product
        </h2>

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
    </div>
  );
};

export default AddProduct;
