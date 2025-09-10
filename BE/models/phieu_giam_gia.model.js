import db from "../common/db.js";
const phieu_giam_gia = (phieu_giam_gia) => {
this.mavoucher = phieu_giam_gia.mavoucher;
this.giatri_giam = phieu_giam_gia.giatri_giam;
this.ngayhethan = phieu_giam_gia.ngayhethan;
this.gioihan_sd = phieu_giam_gia.gioihan_sd;
this.solan_sd = phieu_giam_gia.solan_sd;
};
phieu_giam_gia.getById = (id, callback) => {
  const sqlString = "SELECT * FROM phieu_giam_gia WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

phieu_giam_gia.getAll = (callback) => {
  const sqlString = "SELECT * FROM phieu_giam_gia";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

phieu_giam_gia.insert = (phieu_giam_gia, callback) => {
  const sqlString = "INSERT INTO phieu_giam_gia SET ?";
  db.query(sqlString, phieu_giam_gia, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

phieu_giam_gia.update = (phieu_giam_gia, id, callback) => {
  const sqlString = "UPDATE phieu_giam_gia SET ? WHERE id = ?";
  db.query(sqlString, [phieu_giam_gia, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

phieu_giam_gia.delete = (id, callback) => {
  db.query("DELETE FROM phieu_giam_gia WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default phieu_giam_gia;
