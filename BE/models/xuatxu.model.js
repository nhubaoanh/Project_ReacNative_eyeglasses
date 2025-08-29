import db from "../common/db";
const xuatxu = (xuatxu) => {
this.id = xuatxu.id;
this.xuat_xu = xuatxu.xuat_xu;
};
xuatxu.getById = (id, callback) => {
  const sqlString = "SELECT * FROM xuatxu WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

xuatxu.getAll = (callback) => {
  const sqlString = "SELECT * FROM xuatxu";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

xuatxu.insert = (xuatxu, callback) => {
  const sqlString = "INSERT INTO xuatxu SET ?";
  db.query(sqlString, xuatxu, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

xuatxu.update = (xuatxu, id, callback) => {
  const sqlString = "UPDATE xuatxu SET ? WHERE id = ?";
  db.query(sqlString, [xuatxu, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

xuatxu.delete = (id, callback) => {
  db.query("DELETE FROM xuatxu WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default xuatxu;
