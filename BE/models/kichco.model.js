import db from "../common/db";
const kichco = (kichco) => {
this.id = kichco.id;
this.kich_co = kichco.kich_co;
};
kichco.getById = (id, callback) => {
  const sqlString = "SELECT * FROM kichco WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

kichco.getAll = (callback) => {
  const sqlString = "SELECT * FROM kichco";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

kichco.insert = (kichco, callback) => {
  const sqlString = "INSERT INTO kichco SET ?";
  db.query(sqlString, kichco, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

kichco.update = (kichco, id, callback) => {
  const sqlString = "UPDATE kichco SET ? WHERE id = ?";
  db.query(sqlString, [kichco, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

kichco.delete = (id, callback) => {
  db.query("DELETE FROM kichco WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default kichco;
