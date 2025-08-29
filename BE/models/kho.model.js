import db from "../common/db";
const kho = (kho) => {
this.makho = kho.makho;
this.tenkho = kho.tenkho;
this.mota = kho.mota;
};
kho.getById = (id, callback) => {
  const sqlString = "SELECT * FROM kho WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

kho.getAll = (callback) => {
  const sqlString = "SELECT * FROM kho";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

kho.insert = (kho, callback) => {
  const sqlString = "INSERT INTO kho SET ?";
  db.query(sqlString, kho, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

kho.update = (kho, id, callback) => {
  const sqlString = "UPDATE kho SET ? WHERE id = ?";
  db.query(sqlString, [kho, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

kho.delete = (id, callback) => {
  db.query("DELETE FROM kho WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default kho;
