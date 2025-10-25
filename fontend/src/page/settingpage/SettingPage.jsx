import React, { useEffect, useState } from "react";
import {
  checkProduct,
  updateProduct,
  updateStockProduct,
  deleteProduct,
} from "../../store/productSlice";

import { getCart } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const SettingPage = () => {
  const dispatch = useDispatch();
  const { listProduct, product } = useSelector((state) => state.product);

  const [editProductId, setEditProductId] = useState(null);
  const [editStockId, setEditStockId] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (product) => {
    setEditProductId(product.id);
    setEditStockId(null);
    setFormValues({
      name: product.name,
      description: product.description,
      price: product.price,
    });
  };

  const handleUpdateStock = (product) => {
    setEditStockId(product.id);
    setEditProductId(null);
    setFormValues({
      stock: product.stock,
    });
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateStockSave = async (id) => {
    console.log("SAVE", id, formValues);
    const updateStock = await dispatch(
      updateStockProduct({ id: id, data: formValues })
    );

    if (updateStockProduct.fulfilled.match(updateStock)) {
      dispatch(checkProduct());
      setEditProductId(null);
      setEditStockId(null);
    } else {
      console.log("fail");
    }
  };

  const handleUpdateProductSave = async (id) => {
    console.log("บันทึกข้อมูลสินค้า", id, formValues);

    const editProduct = await dispatch(
      updateProduct({ id: id, data: formValues })
    );

    if (updateProduct.fulfilled.match(editProduct)) {
      dispatch(checkProduct());
      setEditProductId(null);
      setEditStockId(null);
    } else {
      console.log("fail");
    }
  };

  const handleDeleteProduct = async () => {
    console.log("id delete on settingpage:", formValues);
    const comfirmDelete = await dispatch(deleteProduct(formValues.id));

    if (deleteProduct.fulfilled.match(comfirmDelete)) {
      dispatch(getCart());
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setEditProductId(null);
    setEditStockId(null);
    setFormValues({});
  };

  useEffect(() => {
    dispatch(checkProduct());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 ">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Product Management
                </h1>
              </div>
              <div className="stats bg-base-100 shadow">
                <div className="stat">
                  <div className="stat-title">Total Products</div>
                  <div className="stat-value text-primary">
                    {listProduct.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {listProduct.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-semibold text-base-content mb-2">
                  No Product in Shop
                </h3>
                <p className="text-base-content opacity-60">
                  Add product to Management
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {listProduct.map((product) => (
                  <div
                    key={product.id}
                    className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300"
                  >
                    <div className="card-body">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="avatar">
                          <div className="w-32 h-32 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                              src={product.image.url}
                              alt={product.name}
                              className="object-cover"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          {editProductId === product.id ? (
                            <div className="space-y-4">
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text font-semibold">
                                    NAME
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  value={formValues.name}
                                  onChange={handleChange}
                                  className="input input-bordered focus:input-primary"
                                  placeholder="ชื่อสินค้า"
                                />
                              </div>

                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text font-semibold">
                                    Description
                                  </span>
                                </label>
                                <textarea
                                  name="description"
                                  value={formValues.description}
                                  onChange={handleChange}
                                  className="textarea textarea-bordered focus:textarea-primary h-24"
                                  placeholder="รายละเอียดสินค้า"
                                />
                              </div>

                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text font-semibold">
                                    Price
                                  </span>
                                </label>
                                <input
                                  type="number"
                                  name="price"
                                  value={formValues.price}
                                  onChange={handleChange}
                                  className="input input-bordered focus:input-primary"
                                  placeholder="ราคา"
                                />
                              </div>

                              <div className="flex gap-2">
                                <button
                                  className="btn btn-success gap-2"
                                  onClick={() =>
                                    handleUpdateProductSave(product.id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Save
                                </button>
                                <button
                                  className="btn btn-ghost"
                                  onClick={handleCancel}
                                >
                                  Cancle
                                </button>
                              </div>
                            </div>
                          ) : editStockId === product.id ? (
                            <div className="space-y-4">
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text font-semibold">
                                    Stock
                                  </span>
                                </label>
                                <input
                                  type="number"
                                  name="stock"
                                  value={formValues.stock}
                                  onChange={handleChange}
                                  className="input input-bordered focus:input-info input-lg"
                                  placeholder="จำนวนสต็อก"
                                />
                              </div>

                              <div className="flex gap-2">
                                <button
                                  className="btn btn-info gap-2"
                                  onClick={() =>
                                    handleUpdateStockSave(product.id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Update
                                </button>
                                <button
                                  className="btn btn-ghost"
                                  onClick={handleCancel}
                                >
                                  Cancle
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h2 className="card-title text-2xl mb-2">
                                    {product.name}
                                  </h2>
                                  <p className="text-base-content opacity-70 mb-3">
                                    {product.description}
                                  </p>
                                  <div className="flex items-center gap-4">
                                    <div className="badge badge-primary badge-lg gap-2">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      {product.price.toLocaleString()} $
                                    </div>
                                    <div
                                      className={`badge badge-lg gap-2 ${
                                        product.stock > 10
                                          ? "badge-success"
                                          : product.stock > 0
                                          ? "badge-warning"
                                          : "badge-error"
                                      }`}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                      </svg>
                                      Stock: {product.stock}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="divider my-2"></div>

                              <div className="flex flex-wrap gap-2">
                                <button
                                  className="btn btn-warning btn-sm gap-2"
                                  onClick={() => handleEdit(product)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                  </svg>
                                  Edit product
                                </button>
                                <button
                                  className="btn btn-info btn-sm gap-2"
                                  onClick={() => handleUpdateStock(product)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                                  </svg>
                                  Update stock
                                </button>
                                <button
                                  className="btn btn-error btn-sm gap-2"
                                  onClick={() => (
                                    setIsOpen(true),
                                    setFormValues({ id: product.id })
                                  )}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Delete product
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-error/10 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-error"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl">
                  Cconfirm to delete product
                </h3>
                <p className="text-base-content opacity-70">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="bg-error/5 p-4 rounded-lg mb-6">
              <p className="text-sm">
                Are you sure you want to delete this product? All data will be
                permanently deleted.
              </p>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setIsOpen(false)}
              >
                Cancle
              </button>
              <button
                className="btn btn-error gap-2"
                onClick={handleDeleteProduct}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default SettingPage;
