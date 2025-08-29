import db from "../common/db";
const danhmuc = (danhmuc) => {
this.id = danhmuc.id;
this.danh_muc = danhmuc.danh_muc;
};
danhmuc.getById = (id, callback) => {
  const sqlString = "SELECT * FROM danhmuc WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

danhmuc.getAll = (callback) => {
  const sqlString = "SELECT * FROM danhmuc";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

danhmuc.insert = (danhmuc, callback) => {
  const sqlString = "INSERT INTO danhmuc SET ?";
  db.query(sqlString, danhmuc, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

danhmuc.update = (danhmuc, id, callback) => {
  const sqlString = "UPDATE danhmuc SET ? WHERE id = ?";
  db.query(sqlString, [danhmuc, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

danhmuc.delete = (id, callback) => {
  db.query("DELETE FROM danhmuc WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default danhmuc;
