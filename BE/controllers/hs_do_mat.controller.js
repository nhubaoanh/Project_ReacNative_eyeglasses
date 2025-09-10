import hs_do_mat from "../models/hs_do_mat.model.js";

const hs_do_matController = {
  getAll: (req, res) => {
    hs_do_mat.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    hs_do_mat.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    hs_do_mat.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    hs_do_mat.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    hs_do_mat.delete(id, (result) => res.send(result));
  }
};
export default hs_do_matController