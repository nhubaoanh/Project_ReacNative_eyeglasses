import db from "../common/db";
const nhanvien = (nhanvien) => {
this.manv = nhanvien.manv;
this.tennv = nhanvien.tennv;
this.ngaysinh = nhanvien.ngaysinh;
this.gioitinh = nhanvien.gioitinh;
this.sdt = nhanvien.sdt;
this.email = nhanvien.email;
this.diachi = nhanvien.diachi;
this.anh = nhanvien.anh;
this.trangthai = nhanvien.trangthai;
};
nhanvien.getById = (id, callback) => {
  const sqlString = "SELECT * FROM nhanvien WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

nhanvien.getAll = (callback) => {
  const sqlString = "SELECT * FROM nhanvien";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

nhanvien.insert = (nhanvien, callback) => {
  const sqlString = "INSERT INTO nhanvien SET ?";
  db.query(sqlString, nhanvien, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

nhanvien.update = (nhanvien, id, callback) => {
  const sqlString = "UPDATE nhanvien SET ? WHERE id = ?";
  db.query(sqlString, [nhanvien, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

nhanvien.delete = (id, callback) => {
  db.query("DELETE FROM nhanvien WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default nhanvien;
