import kichco from "../models/kichco.model";

const kichcoController = {
  getAll: (req, res) => {
    kichco.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    kichco.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    kichco.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    kichco.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    kichco.delete(id, (result) => res.send(result));
  }
};
export default kichcoController