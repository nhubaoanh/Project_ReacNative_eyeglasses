import db from "../common/db";
const sanpham_chitiet = (sanpham_chitiet) => {
this.mact = sanpham_chitiet.mact;
this.masp = sanpham_chitiet.masp;
this.id_mausac = sanpham_chitiet.id_mausac;
this.id_kichco = sanpham_chitiet.id_kichco;
this.so_luong = sanpham_chitiet.so_luong;
this.gia_nhap = sanpham_chitiet.gia_nhap;
this.gia_ban = sanpham_chitiet.gia_ban;
this.giam_gia = sanpham_chitiet.giam_gia;
this.anh = sanpham_chitiet.anh;
this.trangthai = sanpham_chitiet.trangthai;
};
sanpham_chitiet.getById = (id, callback) => {
  const sqlString = "SELECT * FROM sanpham_chitiet WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

sanpham_chitiet.getAll = (callback) => {
  const sqlString = "SELECT * FROM sanpham_chitiet";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

sanpham_chitiet.insert = (sanpham_chitiet, callback) => {
  const sqlString = "INSERT INTO sanpham_chitiet SET ?";
  db.query(sqlString, sanpham_chitiet, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

sanpham_chitiet.update = (sanpham_chitiet, id, callback) => {
  const sqlString = "UPDATE sanpham_chitiet SET ? WHERE id = ?";
  db.query(sqlString, [sanpham_chitiet, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

sanpham_chitiet.delete = (id, callback) => {
  db.query("DELETE FROM sanpham_chitiet WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default sanpham_chitiet;
