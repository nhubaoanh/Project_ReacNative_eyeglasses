import loai_giao_dich from "../models/loai_giao_dich.model.js";

const loai_giao_dichController = {
  getAll: (req, res) => {
    loai_giao_dich.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    loai_giao_dich.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    loai_giao_dich.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    loai_giao_dich.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    loai_giao_dich.delete(id, (result) => res.send(result));
  }
};
export default loai_giao_dichController