import db from "../common/db.js";
const pttt = (pttt) => {
this.mapt = pttt.mapt;
this.tenpt = pttt.tenpt;
};
pttt.getById = (id, callback) => {
  const sqlString = "SELECT * FROM pttt WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

pttt.getAll = (callback) => {
  const sqlString = "SELECT * FROM pttt";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

pttt.insert = (pttt, callback) => {
  const sqlString = "INSERT INTO pttt SET ?";
  db.query(sqlString, pttt, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

pttt.update = (pttt, id, callback) => {
  const sqlString = "UPDATE pttt SET ? WHERE id = ?";
  db.query(sqlString, [pttt, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

pttt.delete = (id, callback) => {
  db.query("DELETE FROM pttt WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default pttt;
