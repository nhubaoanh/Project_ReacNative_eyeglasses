import db from "../common/db.js";
const bao_hanh = (bao_hanh) => {
this.mabh = bao_hanh.mabh;
this.makh = bao_hanh.makh;
this.masp = bao_hanh.masp;
this.manv = bao_hanh.manv;
this.ngayyc = bao_hanh.ngayyc;
this.mota_loi = bao_hanh.mota_loi;
this.giaiphap = bao_hanh.giaiphap;
this.matrangthai = bao_hanh.matrangthai;
};
bao_hanh.getById = (id, callback) => {
  const sqlString = "SELECT * FROM bao_hanh WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

bao_hanh.getAll = (callback) => {
  const sqlString = "SELECT * FROM bao_hanh";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

bao_hanh.insert = (bao_hanh, callback) => {
  const sqlString = "INSERT INTO bao_hanh SET ?";
  db.query(sqlString, bao_hanh, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

bao_hanh.update = (bao_hanh, id, callback) => {
  const sqlString = "UPDATE bao_hanh SET ? WHERE id = ?";
  db.query(sqlString, [bao_hanh, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

bao_hanh.delete = (id, callback) => {
  db.query("DELETE FROM bao_hanh WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default bao_hanh;
