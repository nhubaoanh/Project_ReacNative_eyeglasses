import db from "../common/db.js";
const trang_thai_lich_hen = (trang_thai_lich_hen) => {
this.matrangthai = trang_thai_lich_hen.matrangthai;
this.tentrangthai = trang_thai_lich_hen.tentrangthai;
};
trang_thai_lich_hen.getById = (id, callback) => {
  const sqlString = "SELECT * FROM trang_thai_lich_hen WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

trang_thai_lich_hen.getAll = (callback) => {
  const sqlString = "SELECT * FROM trang_thai_lich_hen";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

trang_thai_lich_hen.insert = (trang_thai_lich_hen, callback) => {
  const sqlString = "INSERT INTO trang_thai_lich_hen SET ?";
  db.query(sqlString, trang_thai_lich_hen, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

trang_thai_lich_hen.update = (trang_thai_lich_hen, id, callback) => {
  const sqlString = "UPDATE trang_thai_lich_hen SET ? WHERE id = ?";
  db.query(sqlString, [trang_thai_lich_hen, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

trang_thai_lich_hen.delete = (id, callback) => {
  db.query("DELETE FROM trang_thai_lich_hen WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default trang_thai_lich_hen;
