import db from "../common/db";
const quyen = (quyen) => {
this.maquyen = quyen.maquyen;
this.tenquyen = quyen.tenquyen;
this.mota = quyen.mota;
this.trangthai = quyen.trangthai;
};
quyen.getById = (id, callback) => {
  const sqlString = "SELECT * FROM quyen WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

quyen.getAll = (callback) => {
  const sqlString = "SELECT * FROM quyen";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

quyen.insert = (quyen, callback) => {
  const sqlString = "INSERT INTO quyen SET ?";
  db.query(sqlString, quyen, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

quyen.update = (quyen, id, callback) => {
  const sqlString = "UPDATE quyen SET ? WHERE id = ?";
  db.query(sqlString, [quyen, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

quyen.delete = (id, callback) => {
  db.query("DELETE FROM quyen WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default quyen;
