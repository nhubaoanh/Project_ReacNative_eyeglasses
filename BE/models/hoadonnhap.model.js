import db from "../common/db";
const hoadonnhap = (hoadonnhap) => {
this.mahdn = hoadonnhap.mahdn;
this.manv = hoadonnhap.manv;
this.mancc = hoadonnhap.mancc;
this.thoigian = hoadonnhap.thoigian;
this.tongtien = hoadonnhap.tongtien;
};
hoadonnhap.getById = (id, callback) => {
  const sqlString = "SELECT * FROM hoadonnhap WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

hoadonnhap.getAll = (callback) => {
  const sqlString = "SELECT * FROM hoadonnhap";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

hoadonnhap.insert = (hoadonnhap, callback) => {
  const sqlString = "INSERT INTO hoadonnhap SET ?";
  db.query(sqlString, hoadonnhap, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

hoadonnhap.update = (hoadonnhap, id, callback) => {
  const sqlString = "UPDATE hoadonnhap SET ? WHERE id = ?";
  db.query(sqlString, [hoadonnhap, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

hoadonnhap.delete = (id, callback) => {
  db.query("DELETE FROM hoadonnhap WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default hoadonnhap;
