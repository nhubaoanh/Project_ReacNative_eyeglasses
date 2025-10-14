"use client";
import User from "../types/user"; 
import { UserTable } from "./components/userTable";
import { UserModal } from "./components/userModal";
import React, { useEffect, useState } from "react";
import userService from "../services/user.service";
import { Button, message } from "antd";

const UserPage: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<User | null>(null);

  useEffect(() => {
    fetchdata();
  }, [])

  const fetchdata = async () => {
    try{
      const res = await userService.getAllUsers();

      const map: User[] = (res.data ?? []).map(
        (item: any, index: number) => ({
          STT: index + 1,
          manv: item.manv,
          hoten: item.hoten,
          mavt: item.mavt,
          sdt: item.sdt,
          email: item.email,
          lichlv: item.lichlv,
          matkhau: item.matkhau
        })
      );
      console.log("Dữ liệu:", map);
      setData(map);
      console.log("du lieu", data);
    }catch(err){
      console.error(err);
    }
  }

  const handleAdd = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingRecord(user);
    setIsModalOpen(true);
  };

  const handSave = async (values: User) => {
    try {
      if (!values) {
        message.error("Không có dữ liệu người dùng!");
        console.error("No user data provided");
        return;
      }
      if (values.manv) {
        await userService.updateUser(values.manv, values);
        message.success("Cập nhật người dùng thành công!");
        console.log("Updating user with ID:", values.manv);
        fetchdata();
      } else {
        const res = await userService.createUser(values);
        message.success("Thêm người dùng thành công!");
        console.log("Phản hồi khi thêm:", res.data); //
        console.log("Creating new user");
        fetchdata();
      }
      setIsModalOpen(false);
    }catch (err) {
      console.error(err);
      message.error("Lỗi khi cập nhật người dùng!");
    }
  }
  return (
    <div className="scrollbar">
      <div className="flex justify-between item-center mb-4">
        <h1 className="text-xl font-bold">Quan ly nguoi dung</h1>
        <Button type="primary" onClick={handleAdd}>
          Them nguoi dung
        </Button>
      </div>

      <UserTable data={data} onEdit={handleEdit} onDelete={handleEdit}/>

      <UserModal 
        isOpen={isModalOpen} 
        onClose = {() => setIsModalOpen(false)}
        user={editingRecord}
        onSave={handSave}
      />
    </div>
  )
};

export default UserPage;
