import db from "../common/db.js";
const don_hang = (don_hang) => {
this.madh = don_hang.madh;
this.makh = don_hang.makh;
this.ngaydat = don_hang.ngaydat;
this.tongtien = don_hang.tongtien;
this.matrangthai = don_hang.matrangthai;
this.mapt = don_hang.mapt;
this.diachi_giao = don_hang.diachi_giao;
};
// };
// don_hang.getById = (id, callback) => {
//   const sqlString = "SELECT * FROM don_hang WHERE id = ? ";
//   db.query(sqlString, id, (err, result) => {
//     if (err) return callback(err);
//     callback(result);
//   });
// };

// don_hang.getAll = (callback) => {
//   const sqlString = "SELECT * FROM don_hang";
//   db.query(sqlString, (err, result) => {
//     if (err) return callback(err);
//     callback(result);
//   });
// };

don_hang.getAll = (callback) => {
    db.query(
      `SELECT 
        dh.madh, dh.makh, dh.ngaydat, dh.tongtien, dh.matrangthai, dh.diachi_giao,
        ctdh.masp, ctdh.soluong, ctdh.dongia,
        sp.tensp, sp.hinhanh
      FROM don_hang dh
      LEFT JOIN ct_don_hang ctdh ON dh.madh = ctdh.madh
      LEFT JOIN san_pham sp ON ctdh.masp = sp.masp
      ORDER BY dh.madh DESC`,
      (err, rows) => {
        if (err) return callback(err);
        callback(null, rows);
      }
    );
  },

don_hang.getById = (id, callback) => {
    db.query(
      `SELECT 
        dh.madh, dh.makh, dh.ngaydat, dh.tongtien, dh.matrangthai, dh.diachi_giao,
        ctdh.masp, ctdh.soluong, ctdh.dongia,
        sp.tensp, sp.hinhanh
      FROM don_hang dh
      LEFT JOIN ct_don_hang ctdh ON dh.madh = ctdh.madh
      LEFT JOIN san_pham sp ON ctdh.masp = sp.masp
      WHERE dh.madh = ?`,
      [id],
      (err, rows) => {
        if (err) return callback(err);
        callback(null, rows);
      }
    );
  },


don_hang.insert = (don_hang, callback) => {
  const sqlString = "INSERT INTO don_hang SET ?";
  db.query(sqlString, don_hang, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

don_hang.update = (don_hang, id, callback) => {
  const sqlString = "UPDATE don_hang SET ? WHERE id = ?";
  db.query(sqlString, [don_hang, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

don_hang.delete = (id, callback) => {
  db.query("DELETE FROM don_hang WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default don_hang;
