import db from "../common/db";
const hoadonchitiet = (hoadonchitiet) => {
this.mahd = hoadonchitiet.mahd;
this.mact = hoadonchitiet.mact;
this.soluong = hoadonchitiet.soluong;
this.dongia = hoadonchitiet.dongia;
};
hoadonchitiet.getById = (id, callback) => {
  const sqlString = "SELECT * FROM hoadonchitiet WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

hoadonchitiet.getAll = (callback) => {
  const sqlString = "SELECT * FROM hoadonchitiet";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

hoadonchitiet.insert = (hoadonchitiet, callback) => {
  const sqlString = "INSERT INTO hoadonchitiet SET ?";
  db.query(sqlString, hoadonchitiet, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

hoadonchitiet.update = (hoadonchitiet, id, callback) => {
  const sqlString = "UPDATE hoadonchitiet SET ? WHERE id = ?";
  db.query(sqlString, [hoadonchitiet, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

hoadonchitiet.delete = (id, callback) => {
  db.query("DELETE FROM hoadonchitiet WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default hoadonchitiet;
