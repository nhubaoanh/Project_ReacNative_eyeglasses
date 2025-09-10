import db from "../common/db.js";
const lich_hen = (lich_hen) => {
this.mah = lich_hen.mah;
this.makh = lich_hen.makh;
this.manv = lich_hen.manv;
this.dichvu = lich_hen.dichvu;
this.thoigian = lich_hen.thoigian;
this.matrangthai = lich_hen.matrangthai;
};
lich_hen.getById = (id, callback) => {
  const sqlString = "SELECT * FROM lich_hen WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

lich_hen.getAll = (callback) => {
  const sqlString = "SELECT * FROM lich_hen";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

lich_hen.insert = (lich_hen, callback) => {
  const sqlString = "INSERT INTO lich_hen SET ?";
  db.query(sqlString, lich_hen, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

lich_hen.update = (lich_hen, id, callback) => {
  const sqlString = "UPDATE lich_hen SET ? WHERE id = ?";
  db.query(sqlString, [lich_hen, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

lich_hen.delete = (id, callback) => {
  db.query("DELETE FROM lich_hen WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default lich_hen;
