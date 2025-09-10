import db from "../common/db.js";
const hs_do_mat = (hs_do_mat) => {
this.mahs = hs_do_mat.mahs;
this.makh = hs_do_mat.makh;
this.ngaykham = hs_do_mat.ngaykham;
this.mabacsi = hs_do_mat.mabacsi;
this.sph_trai = hs_do_mat.sph_trai;
this.cyl_trai = hs_do_mat.cyl_trai;
this.truc_trai = hs_do_mat.truc_trai;
this.sph_phai = hs_do_mat.sph_phai;
this.cyl_phai = hs_do_mat.cyl_phai;
this.truc_phai = hs_do_mat.truc_phai;
this.kc_dt = hs_do_mat.kc_dt;
this.ghichu = hs_do_mat.ghichu;
};
hs_do_mat.getById = (id, callback) => {
  const sqlString = "SELECT * FROM hs_do_mat WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

hs_do_mat.getAll = (callback) => {
  const sqlString = "SELECT * FROM hs_do_mat";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

hs_do_mat.insert = (hs_do_mat, callback) => {
  const sqlString = "INSERT INTO hs_do_mat SET ?";
  db.query(sqlString, hs_do_mat, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

hs_do_mat.update = (hs_do_mat, id, callback) => {
  const sqlString = "UPDATE hs_do_mat SET ? WHERE id = ?";
  db.query(sqlString, [hs_do_mat, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

hs_do_mat.delete = (id, callback) => {
  db.query("DELETE FROM hs_do_mat WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default hs_do_mat;
