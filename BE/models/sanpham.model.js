import db from "../common/db";
const sanpham = (sanpham) => {
this.masp = sanpham.masp;
this.tensp = sanpham.tensp;
this.model = sanpham.model;
this.id_danhmuc = sanpham.id_danhmuc;
this.id_thuonghieu = sanpham.id_thuonghieu;
this.id_xuatxu = sanpham.id_xuatxu;
this.id_chatlieu = sanpham.id_chatlieu;
this.id_kieudang = sanpham.id_kieudang;
this.mo_ta = sanpham.mo_ta;
this.hinh_anh = sanpham.hinh_anh;
this.san_pham_moi = sanpham.san_pham_moi;
this.san_pham_noi_bat = sanpham.san_pham_noi_bat;
this.ngay_tao = sanpham.ngay_tao;
this.ngay_cap_nhat = sanpham.ngay_cap_nhat;
};
sanpham.getById = (id, callback) => {
  const sqlString = "SELECT * FROM sanpham WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

sanpham.getAll = (callback) => {
  const sqlString = "SELECT * FROM sanpham";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

sanpham.insert = (sanpham, callback) => {
  const sqlString = "INSERT INTO sanpham SET ?";
  db.query(sqlString, sanpham, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

sanpham.update = (sanpham, id, callback) => {
  const sqlString = "UPDATE sanpham SET ? WHERE id = ?";
  db.query(sqlString, [sanpham, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

sanpham.delete = (id, callback) => {
  db.query("DELETE FROM sanpham WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default sanpham;
