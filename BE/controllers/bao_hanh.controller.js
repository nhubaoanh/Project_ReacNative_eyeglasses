import bao_hanh from "../models/bao_hanh.model.js";

const bao_hanhController = {
  getAll: (req, res) => {
    bao_hanh.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    bao_hanh.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    bao_hanh.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    bao_hanh.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    bao_hanh.delete(id, (result) => res.send(result));
  }
};
export default bao_hanhController