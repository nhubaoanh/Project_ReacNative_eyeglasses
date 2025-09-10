import lich_hen from "../models/lich_hen.model.js";

const lich_henController = {
  getAll: (req, res) => {
    lich_hen.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    lich_hen.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    lich_hen.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    lich_hen.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    lich_hen.delete(id, (result) => res.send(result));
  }
};
export default lich_henController