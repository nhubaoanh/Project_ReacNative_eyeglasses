import db from "../common/db.js";
const trang_thai_bao_hanh = (trang_thai_bao_hanh) => {
this.matrangthai = trang_thai_bao_hanh.matrangthai;
this.tentrangthai = trang_thai_bao_hanh.tentrangthai;
};
trang_thai_bao_hanh.getById = (id, callback) => {
  const sqlString = "SELECT * FROM trang_thai_bao_hanh WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

trang_thai_bao_hanh.getAll = (callback) => {
  const sqlString = "SELECT * FROM trang_thai_bao_hanh";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

trang_thai_bao_hanh.insert = (trang_thai_bao_hanh, callback) => {
  const sqlString = "INSERT INTO trang_thai_bao_hanh SET ?";
  db.query(sqlString, trang_thai_bao_hanh, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

trang_thai_bao_hanh.update = (trang_thai_bao_hanh, id, callback) => {
  const sqlString = "UPDATE trang_thai_bao_hanh SET ? WHERE id = ?";
  db.query(sqlString, [trang_thai_bao_hanh, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

trang_thai_bao_hanh.delete = (id, callback) => {
  db.query("DELETE FROM trang_thai_bao_hanh WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default trang_thai_bao_hanh;
