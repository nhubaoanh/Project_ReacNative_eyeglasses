import vai_tro_nv from "../models/vai_tro_nv.model.js";

const vai_tro_nvController = {
  getAll: (req, res) => {
    vai_tro_nv.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    vai_tro_nv.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    vai_tro_nv.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    vai_tro_nv.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    vai_tro_nv.delete(id, (result) => res.send(result));
  }
};
export default vai_tro_nvController