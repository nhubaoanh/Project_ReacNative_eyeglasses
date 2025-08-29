import mausac from "../models/mausac.model";

const mausacController = {
  getAll: (req, res) => {
    mausac.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    mausac.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    mausac.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    mausac.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    mausac.delete(id, (result) => res.send(result));
  }
};
export default mausacController