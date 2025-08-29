import db from "../common/db";
const kieudang = (kieudang) => {
this.id = kieudang.id;
this.kieu_dang = kieudang.kieu_dang;
};
kieudang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM kieudang WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

kieudang.getAll = (callback) => {
  const sqlString = "SELECT * FROM kieudang";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

kieudang.insert = (kieudang, callback) => {
  const sqlString = "INSERT INTO kieudang SET ?";
  db.query(sqlString, kieudang, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

kieudang.update = (kieudang, id, callback) => {
  const sqlString = "UPDATE kieudang SET ? WHERE id = ?";
  db.query(sqlString, [kieudang, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

kieudang.delete = (id, callback) => {
  db.query("DELETE FROM kieudang WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default kieudang;
