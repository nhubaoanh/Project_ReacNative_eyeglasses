import db from "../common/db.js";
const san_pham = (san_pham) => {
this.masp = san_pham.masp;
this.tensp = san_pham.tensp;
this.maloai = san_pham.maloai;
this.thuonghieu = san_pham.thuonghieu;
this.chatlieu = san_pham.chatlieu;
this.mausac = san_pham.mausac;
this.kieudang = san_pham.kieudang;
this.kichthuoc = san_pham.kichthuoc;
this.mota = san_pham.mota;
this.gia = san_pham.gia;
this.tonkho = san_pham.tonkho;
this.mancc = san_pham.mancc;
this.ngaytao = san_pham.ngaytao;
this.hinhanh = san_pham.hinhanh;
};
san_pham.getById = (id, callback) => {
  const sqlString = "SELECT * FROM san_pham WHERE masp = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(null,result[0]);
  });
};

san_pham.getAll = (callback) => {
  const sqlString = "SELECT * FROM san_pham";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

san_pham.insert = (san_pham, callback) => {
  const sqlString = "INSERT INTO san_pham SET ?";
  db.query(sqlString, san_pham, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {san_pham} });
  });
};

san_pham.update = (san_pham, id, callback) => {
  console.log('=== MODEL UPDATE DEBUG ===');
  console.log('Update data:', san_pham);
  console.log('Product ID:', id);
  console.log('hinhanh in data:', san_pham.hinhanh);
  
  const sqlString = "UPDATE san_pham SET ? WHERE masp = ?";
  console.log('SQL query:', sqlString);
  
  db.query(sqlString, [san_pham, id], (err, res) => {
    console.log('Database query result:', { err, res });
    if (err) {
      console.error('Database update error:', err);
      return callback(err);
    }
    console.log('Rows affected:', res.affectedRows);
    console.log('=== END MODEL DEBUG ===');
    callback("Cập nhật thành công");
  });
};

san_pham.delete = (id, callback) => {
  db.query("DELETE FROM san_pham WHERE masp = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default san_pham;
