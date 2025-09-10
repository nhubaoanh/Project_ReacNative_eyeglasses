import db from "../common/db.js";
const loai_giao_dich = (loai_giao_dich) => {
this.maloaigd = loai_giao_dich.maloaigd;
this.tenloai = loai_giao_dich.tenloai;
};
loai_giao_dich.getById = (id, callback) => {
  const sqlString = "SELECT * FROM loai_giao_dich WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

loai_giao_dich.getAll = (callback) => {
  const sqlString = "SELECT * FROM loai_giao_dich";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

loai_giao_dich.insert = (loai_giao_dich, callback) => {
  const sqlString = "INSERT INTO loai_giao_dich SET ?";
  db.query(sqlString, loai_giao_dich, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

loai_giao_dich.update = (loai_giao_dich, id, callback) => {
  const sqlString = "UPDATE loai_giao_dich SET ? WHERE id = ?";
  db.query(sqlString, [loai_giao_dich, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

loai_giao_dich.delete = (id, callback) => {
  db.query("DELETE FROM loai_giao_dich WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default loai_giao_dich;
