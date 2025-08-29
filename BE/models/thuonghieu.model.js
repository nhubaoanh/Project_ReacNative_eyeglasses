import db from "../common/db";
const thuonghieu = (thuonghieu) => {
this.id = thuonghieu.id;
this.thuong_hieu = thuonghieu.thuong_hieu;
};
thuonghieu.getById = (id, callback) => {
  const sqlString = "SELECT * FROM thuonghieu WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

thuonghieu.getAll = (callback) => {
  const sqlString = "SELECT * FROM thuonghieu";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

thuonghieu.insert = (thuonghieu, callback) => {
  const sqlString = "INSERT INTO thuonghieu SET ?";
  db.query(sqlString, thuonghieu, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

thuonghieu.update = (thuonghieu, id, callback) => {
  const sqlString = "UPDATE thuonghieu SET ? WHERE id = ?";
  db.query(sqlString, [thuonghieu, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

thuonghieu.delete = (id, callback) => {
  db.query("DELETE FROM thuonghieu WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default thuonghieu;
