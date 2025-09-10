import trang_thai_bao_hanh from "../models/trang_thai_bao_hanh.model.js";

const trang_thai_bao_hanhController = {
  getAll: (req, res) => {
    trang_thai_bao_hanh.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    trang_thai_bao_hanh.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    trang_thai_bao_hanh.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    trang_thai_bao_hanh.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    trang_thai_bao_hanh.delete(id, (result) => res.send(result));
  }
};
export default trang_thai_bao_hanhController