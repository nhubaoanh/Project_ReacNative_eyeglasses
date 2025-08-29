import usersession from "../models/usersession.model";

const usersessionController = {
  getAll: (req, res) => {
    usersession.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    usersession.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    usersession.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    usersession.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    usersession.delete(id, (result) => res.send(result));
  }
};
export default usersessionController