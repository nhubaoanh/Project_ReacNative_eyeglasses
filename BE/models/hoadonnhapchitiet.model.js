import db from "../common/db";
const hoadonnhapchitiet = (hoadonnhapchitiet) => {
this.mahdn = hoadonnhapchitiet.mahdn;
this.mact = hoadonnhapchitiet.mact;
this.soluong = hoadonnhapchitiet.soluong;
this.dongia = hoadonnhapchitiet.dongia;
};
hoadonnhapchitiet.getById = (id, callback) => {
  const sqlString = "SELECT * FROM hoadonnhapchitiet WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

hoadonnhapchitiet.getAll = (callback) => {
  const sqlString = "SELECT * FROM hoadonnhapchitiet";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

hoadonnhapchitiet.insert = (hoadonnhapchitiet, callback) => {
  const sqlString = "INSERT INTO hoadonnhapchitiet SET ?";
  db.query(sqlString, hoadonnhapchitiet, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

hoadonnhapchitiet.update = (hoadonnhapchitiet, id, callback) => {
  const sqlString = "UPDATE hoadonnhapchitiet SET ? WHERE id = ?";
  db.query(sqlString, [hoadonnhapchitiet, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

hoadonnhapchitiet.delete = (id, callback) => {
  db.query("DELETE FROM hoadonnhapchitiet WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default hoadonnhapchitiet;
