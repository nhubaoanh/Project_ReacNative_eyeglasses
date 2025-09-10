import don_hang from "../models/don_hang.model.js";

const don_hangController = {
  getAll: (req, res) => {
    don_hang.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    don_hang.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    don_hang.insert(data, (result) => res.send(result));
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