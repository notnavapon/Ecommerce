import React, { useEffect, useState } from "react";
import {
  checkProduct,
  updateProduct,
  updateStockProduct,
  deleteProduct,
} from "../../store/productSlice";
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
    setEditStockId(null); // ปิด stock mode
    setFormValues({
      name: product.name,
      description: product.description,
      price: product.price,
    });
  };

  const handleUpdateStock = (product) => {
    setEditStockId(product.id);
    setEditProductId(null); // ปิด edit product mode
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
    console.log("บันทึกข้อมูลสินค้า", id, formValues);
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

  const handleDeleteProduct = () => {
    console.log("id delete on settingpage:", formValues);
    dispatch(deleteProduct(formValues.id));
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(checkProduct());
  }, []);
  return (
    <div className="min-h-screen bg-base-100">
      <Toaster />
      <div className="flex h-full flex-col overflow-y-auto shadow-xl max-w-4xl w-full mx-auto rounded-xl">
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-bold mb-6">Product Management</h1>
          </div>
          <div className="divider"></div>

          <div className="mt-6">
            <ul className="divide-y divide-gray-200">
              {listProduct.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={product.image.url}
                      src={product.image.url}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    {editProductId === product.id ? (
                      <div className="space-y-2 mt-2">
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">
                            Product name
                          </legend>
                          <input
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Product Name"
                          />
                          <legend className="fieldset-legend">
                            Description
                          </legend>
                          <textarea
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full"
                            placeholder="Description"
                          />
                          <legend className="fieldset-legend">Price</legend>
                          <input
                            type="number"
                            name="price"
                            value={formValues.price}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Price"
                          />
                        </fieldset>
                        <button
                          className="btn btn-success btn-sm mt-2"
                          onClick={() => handleUpdateProductSave(product.id)}
                        >
                          Save
                        </button>
                      </div>
                    ) : editStockId === product.id ? (
                      <div className="space-y-2 mt-2">
                        <input
                          type="number"
                          name="stock"
                          value={formValues.stock}
                          onChange={handleChange}
                          className="input input-bordered w-full"
                          placeholder="Stock"
                        />
                        <button
                          className="btn btn-success btn-sm mt-2"
                          onClick={() => handleUpdateStockSave(product.id)}
                        >
                          Save Stock
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between text-base font-medium">
                          <h3>name: {product.name}</h3>
                          <p className="text-base font-bold text-primary mt-1">
                            {product.price} ฿
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {product.description}
                        </p>
                        <p className="text-sm">Stock: {product.stock}</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handleEdit(product)}
                          >
                            Edit Product
                          </button>
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => handleUpdateStock(product)}
                          >
                            Update Stock
                          </button>
                          <button
                            className="btn btn-error btn-sm"
                            onClick={() => (
                              setIsOpen(true), setFormValues({ id: product.id })
                            )}
                          >
                            Delete Product
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Modal */}
            {isOpen && (
              <dialog open className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                  <h3 className="font-bold text-lg">Comfirm</h3>
                  <p className="py-4">Click the button below to close</p>
                  <div className="modal-action">
                    <button
                      className="btn btn-warning text-white"
                      onClick={handleDeleteProduct}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
