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


(don_hang.getAll = (callback) => {
  db.query(
    `SELECT 
        dh.madh, dh.makh, dh.ngaydat, dh.tongtien, dh.matrangthai, dh.diachi_giao,dh.paymentMethod,
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
}),
  (don_hang.getById = (id, callback) => {
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
  }),
  (don_hang.insert = (don_hang, callback) => {
    const sqlString = "INSERT INTO don_hang SET ?";
    db.query(sqlString, don_hang, (err, res) => {
      if (err) return callback(err);
      callback({ id: res.insertId, ...{ tableName } });
      console.log({ id: res.insertId, ...{ tableName } });
    });
  });

don_hang.insertOrder = (data, callback) => {
    // 1. CHUẨN BỊ DỮ LIỆU

    // Đảm bảo ngaydat ở định dạng MySQL DATETIME
    const ngaydat_mysql = new Date(data.ngaydat)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

    // Đảm bảo tongtien là NUMBER
    const tongtien_val = Number(data.tongtien) || 0;
    const itemsJson = JSON.stringify(data.items);
    const sql = `
        CALL CreateNewOrder(?, ?, ?, ?, ?, ?, ?, @new_madh);
        SELECT @new_madh AS madh;
    `;

    // Mảng tham số truyền vào Procedure (theo đúng 7 tham số IN đã sửa)
    const params = [
      data.makh, // p_makh (INT)
      ngaydat_mysql, // p_ngaydat (DATETIME)
      tongtien_val, // p_tongtien (DECIMAL)
      data.matrangthai, // p_matrangthai (INT)
      data.diachi_giao, // p_diachi_giao (VARCHAR)
      data.paymentMethod, // p_phuongthuc (VARCHAR) - cho cột paymentMethod (NOT NULL)
      itemsJson, // p_items_json (JSON string)
    ];

    // 3. Thực thi query
    db.query(sql, params, (err, results) => {
        if (err) {
            console.error("Lỗi khi gọi Stored Procedure:", err);
            return callback(err);
        }

        // Lấy ID đơn hàng mới
        const newMadh =
            results[1] && results[1].length > 0 ? results[1][0].madh : null;

        callback(null, {
            madh: newMadh,
            message: "Tạo đơn hàng thành công qua SP",
        });
    });
};

don_hang.getMyOrders = (makh, callback) => {
  const sqlString = "CALL GetAllOrdersByCustomer(?)";
  db.query(sqlString, [makh], (err, res) => {
    if (err) return callback(err);
    callback(null, res[0]);
  });
},


don_hang.update = (don_hang, id, callback) => {
  const sqlString = "UPDATE don_hang SET ? WHERE madh = ?";
  db.query(sqlString, [don_hang, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

don_hang.delete = (id, callback) => {
  db.query("DELETE FROM don_hang WHERE madh = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default don_hang;
