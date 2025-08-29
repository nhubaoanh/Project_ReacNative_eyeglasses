import db from "../common/db";
const admin = (admin) => {
this.maadmin = admin.maadmin;
this.tendangnhap = admin.tendangnhap;
this.matkhau = admin.matkhau;
this.tenhienthi = admin.tenhienthi;
this.email = admin.email;
this.sdt = admin.sdt;
this.maquyen = admin.maquyen;
this.trangthai = admin.trangthai;
};
admin.getById = (id, callback) => {
  const sqlString = "SELECT * FROM admin WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

admin.getAll = (callback) => {
  const sqlString = "SELECT * FROM admin";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

admin.insert = (admin, callback) => {
  const sqlString = "INSERT INTO admin SET ?";
  db.query(sqlString, admin, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

admin.update = (admin, id, callback) => {
  const sqlString = "UPDATE admin SET ? WHERE id = ?";
  db.query(sqlString, [admin, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

admin.delete = (id, callback) => {
  db.query("DELETE FROM admin WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default admin;
