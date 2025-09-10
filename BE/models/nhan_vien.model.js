import db from "../common/db.js";
const nhan_vien = (nhan_vien) => {
this.manv = nhan_vien.manv;
this.hoten = nhan_vien.hoten;
this.mavt = nhan_vien.mavt;
this.sdt = nhan_vien.sdt;
this.email = nhan_vien.email;
this.lichlv = nhan_vien.lichlv;
};
nhan_vien.getById = (id, callback) => {
  const sqlString = "SELECT * FROM nhan_vien WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

nhan_vien.getAll = (callback) => {
  const sqlString = "SELECT * FROM nhan_vien";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

nhan_vien.insert = (nhan_vien, callback) => {
  const sqlString = "INSERT INTO nhan_vien SET ?";
  db.query(sqlString, nhan_vien, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

nhan_vien.update = (nhan_vien, id, callback) => {
  const sqlString = "UPDATE nhan_vien SET ? WHERE id = ?";
  db.query(sqlString, [nhan_vien, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

nhan_vien.delete = (id, callback) => {
  db.query("DELETE FROM nhan_vien WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default nhan_vien;
