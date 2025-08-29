import db from "../common/db";
const hoadon = (hoadon) => {
this.mahd = hoadon.mahd;
this.manv = hoadon.manv;
this.makh = hoadon.makh;
this.thoigian = hoadon.thoigian;
this.tongtien = hoadon.tongtien;
};
hoadon.getById = (id, callback) => {
  const sqlString = "SELECT * FROM hoadon WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

hoadon.getAll = (callback) => {
  const sqlString = "SELECT * FROM hoadon";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

hoadon.insert = (hoadon, callback) => {
  const sqlString = "INSERT INTO hoadon SET ?";
  db.query(sqlString, hoadon, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

hoadon.update = (hoadon, id, callback) => {
  const sqlString = "UPDATE hoadon SET ? WHERE id = ?";
  db.query(sqlString, [hoadon, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

hoadon.delete = (id, callback) => {
  db.query("DELETE FROM hoadon WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default hoadon;
