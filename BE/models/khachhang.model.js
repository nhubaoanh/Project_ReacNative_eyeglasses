import db from "../common/db";
const khachhang = (khachhang) => {
this.makh = khachhang.makh;
this.tenkh = khachhang.tenkh;
this.ngaysinh = khachhang.ngaysinh;
this.sdt = khachhang.sdt;
this.email = khachhang.email;
this.diachi = khachhang.diachi;
this.trangthai = khachhang.trangthai;
};
khachhang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM khachhang WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

khachhang.getAll = (callback) => {
  const sqlString = "SELECT * FROM khachhang";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

khachhang.insert = (khachhang, callback) => {
  const sqlString = "INSERT INTO khachhang SET ?";
  db.query(sqlString, khachhang, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

khachhang.update = (khachhang, id, callback) => {
  const sqlString = "UPDATE khachhang SET ? WHERE id = ?";
  db.query(sqlString, [khachhang, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

khachhang.delete = (id, callback) => {
  db.query("DELETE FROM khachhang WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default khachhang;
