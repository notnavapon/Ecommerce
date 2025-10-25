import React, { useEffect, useState } from "react";
import { Package, Calendar, ShoppingBag } from "lucide-react";

import { getOrderUser } from "../../store/orderSlice";
import { useSelector, useDispatch } from "react-redux";

const OrderPage = () => {
  const dispatch = useDispatch();

  const { loadOrder } = useSelector((state) => state.order);
  console.log(loadOrder.length);

  useEffect(() => {
    dispatch(getOrderUser());
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-3 rounded-xl">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                ประวัติคำสั่งซื้อ
              </h1>
              <p className="text-gray-500 mt-1">
                รายการสั่งซื้อทั้งหมด {loadOrder.length} รายการ
              </p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {loadOrder.length > 0 && (
            <>
              {loadOrder.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-white">
                            คำสั่งซื้อ #{order.id}
                          </h2>
                          <div className="flex items-center gap-2 mt-1 text-white/90">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                              {formatDate(order.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white/80 text-sm">ยอดรวม</p>
                        <p className="text-2xl font-bold text-white">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.orderItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                        >
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={item.product.image.url}
                              alt={item.product.name}
                              className="w-24 h-24 object-cover rounded-lg shadow-md"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {item.product.name}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {item.product.description}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="text-sm text-gray-600">
                                ราคา:{" "}
                                <span className="font-semibold text-indigo-600">
                                  {formatPrice(item.price)}
                                </span>
                              </span>
                              <span className="text-sm text-gray-600">
                                จำนวน:{" "}
                                <span className="font-semibold text-indigo-600">
                                  {item.quantity}
                                </span>
                              </span>
                              <span className="text-sm text-gray-600">
                                รวม:{" "}
                                <span className="font-semibold text-indigo-600">
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </span>
                            </div>
                          </div>

                          {/* Stock Status */}
                          <div className="flex-shrink-0 flex items-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                item.product.stock > 0
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {item.product.stock > 0
                                ? `คงเหลือ ${item.product.stock}`
                                : "สินค้าหมด"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Amount</span>
                        <span className="font-semibold text-gray-800">
                          {order.orderItems.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}{" "}
                          P
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-lg font-semibold text-gray-800">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-indigo-600">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
