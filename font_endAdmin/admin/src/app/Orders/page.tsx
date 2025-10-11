"use client";

import { useEffect, useState } from "react";
import Order from "../types/order";
import orderService from "../services/order.service";
import { OrderTable } from "./components/orderTable";
import { OrderModal } from "./components/orderModal";

const OrdersPage = () => {
  const [data, setData] = useState<Order[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Order | null>(null);
   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchDate();
  }, []);

  const fetchDate = async () => {
    try {
      const res = await orderService.getOrders();

      const mappedData: Order[] = (res ?? []).map(
        (item: any, index: number) => ({
          numerical: index + 1,
          madh: item.madh,
          makh: item.makh,
          ngaydat: item.ngaydat,
          tongtien: item.tongtien,
          matrangthai: item.matrangthai,
          diachi_giao: item.diachi_giao,
          items: item.items,
          paymentMethod: item.paymentMethod,
        })
      );
      console.log("Dữ liệu:", mappedData);
      setData(mappedData);
      console.log("du lieu", data);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Khi click vào một dòng
  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleAdd = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEdit = (order: Order) => {
    setEditingRecord(order);
    setIsModalOpen(true);
  };

  // const handleDelete = (order: Order) => {
  //   if(order.madh){
  //     orderService.deleteOrder(order.madh);
  //     fetchDate()
  //   }
  // };

  // const handleSave = (order: Order) => {
  //   if (order.madh) {
  //     orderService.updateOrder(order.madh, order);
  //   } else {
  //     orderService.createOrder(order);
  //   }
  //   setIsModalOpen(false);
  //   fetchDate();
  // }
  return (
    <div className="scrollbar">
      <div className="flex justify-content-between items-center mb-4">
        <h1 className="text-3xl font-bold">Quản lý đơn hàng</h1>
        <button className="btn btn-primary" onClick={handleAdd}>
          Thêm đơn hàng
        </button>
      </div>

      <OrderTable
        data={data}
        loading={false}
        onEdit={handleEdit}
        onDelete={handleEdit}
      />
      
      {/* <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={editingRecord}
        onSave={handleSave}
      /> */}
    </div>
  );
}

export default OrdersPage