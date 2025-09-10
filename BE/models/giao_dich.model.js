import db from "../common/db.js";
const giao_dich = (giao_dich) => {
this.magd = giao_dich.magd;
this.maloaigd = giao_dich.maloaigd;
this.mota = giao_dich.mota;
this.sotien = giao_dich.sotien;
this.ngaygd = giao_dich.ngaygd;
this.madh = giao_dich.madh;
};
giao_dich.getById = (id, callback) => {
  const sqlString = "SELECT * FROM giao_dich WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

giao_dich.getAll = (callback) => {
  const sqlString = "SELECT * FROM giao_dich";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

giao_dich.insert = (giao_dich, callback) => {
  const sqlString = "INSERT INTO giao_dich SET ?";
  db.query(sqlString, giao_dich, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

giao_dich.update = (giao_dich, id, callback) => {
  const sqlString = "UPDATE giao_dich SET ? WHERE id = ?";
  db.query(sqlString, [giao_dich, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

giao_dich.delete = (id, callback) => {
  db.query("DELETE FROM giao_dich WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default giao_dich;
