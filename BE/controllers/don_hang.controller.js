import don_hang from "../models/don_hang.model.js";

const don_hangController = {
  // getAll: (req, res) => {
  //   don_hang.getAll((result) => res.send(result));
  // },

  // getById: (req, res) => {
  //   const id = req.params.id;
  //   don_hang.getById(id, (result) => res.send(result));
  // },
  getAll : (req, res) => {
    don_hang.getAll((err, rows) => {
      if (err) return res.status(500).json({ success: false, message: "Lỗi server" });

      // gom nhóm orders + items
      const orders = [];
      const orderMap = {};

      rows.forEach(row => {
        if (!orderMap[row.madh]) {
          orderMap[row.madh] = {
            madh: row.madh,
            makh: row.makh,
            ngaydat: row.ngaydat,
            tongtien: row.tongtien,
            matrangthai: row.matrangthai,
            diachi_giao: row.diachi_giao,
            items: []
          };
          orders.push(orderMap[row.madh]);
        }

        if (row.masp) {
          orderMap[row.madh].items.push({
            masp: row.masp,
            tensp: row.tensp,
            hinhanh: row.hinhanh,
            soluong: row.soluong,
            dongia: row.dongia
          });
        }
      });

      res.json({ success: true, data: orders });
    });
  },

  getById : (req, res) => {
    don_hang.getById(req.params.id, (err, rows) => {
      if (err) return res.status(500).json({ success: false, message: "Lỗi server" });
      res.json({ success: true, data: rows });
    });
  },

  insert: (req, res) => {
    const data = req.body;
    don_hang.insert(data, (result) => res.send(result));
  },

  insertorder : (req, res) => {
    const data = req.body;
    don_hang.insertOrder(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    don_hang.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    don_hang.delete(id, (result) => res.send(result));
  }
};
export default don_hangController