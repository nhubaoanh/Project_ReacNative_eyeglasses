import sanpham from "../models/sanpham.model";

const sanphamController = {
  getAll: (req, res) => {
    sanpham.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    sanpham.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    sanpham.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    sanpham.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    sanpham.delete(id, (result) => res.send(result));
  }
};
export default sanphamController