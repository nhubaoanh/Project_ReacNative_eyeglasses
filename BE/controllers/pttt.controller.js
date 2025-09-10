import pttt from "../models/pttt.model.js";

const ptttController = {
  getAll: (req, res) => {
    pttt.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    pttt.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    pttt.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    pttt.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    pttt.delete(id, (result) => res.send(result));
  }
};
export default ptttController