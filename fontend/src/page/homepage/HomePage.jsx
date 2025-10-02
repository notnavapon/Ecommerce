import AddProduct from "./component/AddProduct";

import { useState, useEffect } from "react";
import { ShoppingCart, Package, Plus, Minus, Filter } from "lucide-react";

import { checkProduct } from "../../store/productSlice";
import { addProductToCart, getCart } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const Homepage = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantities, setQuantities] = useState({});

  const { listProduct } = useSelector((state) => state.product);

  const [newProduct, setNewProduct] = useState(false);
  const handleSetNewProduct = (value) => {
    setNewProduct(value);
    setIsModalOpen(false);
    console.log("handleSetNewProduct");
  };

  const handleQuantityChange = (productId, value) => {
    const numValue = parseInt(value) || 0;
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, numValue),
    }));
  };

  const incrementQuantity = (productId, stock) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.min((prev[productId] || 0) + 1, stock),
    }));
  };

  const decrementQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }));
  };

  const handleAddToCart = async(pId, qty) => {
    const data = {
      productId: pId,
      quantity: qty || 1,
    };

    const addproducttocartsuccess = dispatch(addProductToCart(data));

    if (addProductToCart.fulfilled.match(addproducttocartsuccess)) {
          // ถ้า login สำเร็จ → เรียก checkCurrentUser
          dispatch(getCart());
          
        }



    // checkData
  };

  useEffect(() => {
    dispatch(checkProduct());
  }, [newProduct, quantities]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <AddProduct
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdateProduct={handleSetNewProduct}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Featured Products
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {listProduct.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden bg-gray-100 h-64">
                <img
                  src={product.image.url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-bold text-xl bg-red-500 px-6 py-2 rounded-full">
                      Out of Stock
                    </span>
                  </div>
                )}
                {product.stock > 0 && product.stock < 10 && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Only {product.stock} left!
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-indigo-600">
                    ${product.price}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of Stock"}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                    <button
                      onClick={() => decrementQuantity(product.id)}
                      disabled={product.stock === 0}
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-red-50 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    <input
                      type="number"
                      value={quantities[product.id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(product.id, e.target.value)
                      }
                      disabled={product.stock === 0}
                      placeholder="0"
                      className="flex-1 text-center py-2 bg-white rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
                    />

                    <button
                      onClick={() =>
                        incrementQuantity(product.id, product.stock)
                      }
                      disabled={
                        product.stock === 0 ||
                        (quantities[product.id] || 0) >= product.stock
                      }
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-green-50 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <button
                  disabled={product.stock === 0}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                    product.stock > 0
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    handleAddToCart(product.id, quantities[product.id])
                  }

                  // onClick={handleAddToCart(product)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.stock > 0 ? "Add to Cart" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
