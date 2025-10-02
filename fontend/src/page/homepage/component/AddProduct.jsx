import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Upload,
} from "lucide-react";
import {  useDispatch } from "react-redux";
import { addProduct, checkProduct } from "../../../store/productSlice";
import { Toaster } from "react-hot-toast";
const AddProduct = ({ isOpen, onClose, onUpdateProduct }) => {
  const dispatch = useDispatch();
  const [productFormData, setProductFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [productPic, setProductPic] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);

  const resetForm = () => {
    setProductFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
    });
    setProductPic(null);
    setPreviewPic(null);
  };

  const handleChange = (e) => {
    setProductFormData({ ...productFormData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductPic(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
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
      dispatch(checkProduct());
      resetForm();
      onUpdateProduct((prev) => !prev);
      
    } else {
      console.log("Add product fail:", checkAuth.payload);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Toaster />
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-3xl font-bold">Add New Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Product Image
                </label>
                <label className="relative cursor-pointer w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-300 group">
                  {previewPic ? (
                    <img
                      src={previewPic}
                      alt="preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3 group-hover:text-indigo-500 transition-colors" />
                      <span className="text-gray-600 font-medium">
                        Click to upload image
                      </span>
                      <p className="text-sm text-gray-400 mt-1">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={productFormData.name}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your product"
                  value={productFormData.description}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors resize-none h-32"
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={productFormData.price}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                    onChange={handleChange}
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="0"
                    value={productFormData.stock}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Add Product
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Preview
              </h3>
              <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-64 bg-gray-100">
                  <img
                    src={
                      previewPic ||
                      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
                    }
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {productFormData.name || "Product Name"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {productFormData.description ||
                      "Product description will appear here"}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-indigo-600">
                      ${productFormData.price || "0.00"}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        productFormData.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {productFormData.stock > 0
                        ? `${productFormData.stock} in stock`
                        : "Out of Stock"}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                      <button className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm">
                        <Minus className="w-5 h-5" />
                      </button>
                      <input
                        type="number"
                        value="0"
                        readOnly
                        className="flex-1 text-center py-2 bg-white rounded-lg font-semibold text-lg"
                      />
                      <button className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm">
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
