import db from "../common/db";
const phieukiemke_chitiet = (phieukiemke_chitiet) => {
this.id = phieukiemke_chitiet.id;
this.mact = phieukiemke_chitiet.mact;
this.soluong_bandau = phieukiemke_chitiet.soluong_bandau;
this.soluong_kiemke = phieukiemke_chitiet.soluong_kiemke;
this.chenh_lech = phieukiemke_chitiet.chenh_lech;
this.nguyennhan = phieukiemke_chitiet.nguyennhan;
};
phieukiemke_chitiet.getById = (id, callback) => {
  const sqlString = "SELECT * FROM phieukiemke_chitiet WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

phieukiemke_chitiet.getAll = (callback) => {
  const sqlString = "SELECT * FROM phieukiemke_chitiet";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

phieukiemke_chitiet.insert = (phieukiemke_chitiet, callback) => {
  const sqlString = "INSERT INTO phieukiemke_chitiet SET ?";
  db.query(sqlString, phieukiemke_chitiet, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

phieukiemke_chitiet.update = (phieukiemke_chitiet, id, callback) => {
  const sqlString = "UPDATE phieukiemke_chitiet SET ? WHERE id = ?";
  db.query(sqlString, [phieukiemke_chitiet, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

phieukiemke_chitiet.delete = (id, callback) => {
  db.query("DELETE FROM phieukiemke_chitiet WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default phieukiemke_chitiet;
