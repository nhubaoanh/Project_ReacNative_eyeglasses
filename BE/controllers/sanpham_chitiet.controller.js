import sanpham_chitiet from "../models/sanpham_chitiet.model";

const sanpham_chitietController = {
  getAll: (req, res) => {
    sanpham_chitiet.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    sanpham_chitiet.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    sanpham_chitiet.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    sanpham_chitiet.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    sanpham_chitiet.delete(id, (result) => res.send(result));
  }
};
export default sanpham_chitietController