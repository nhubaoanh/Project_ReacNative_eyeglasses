import quyen from "../models/quyen.model";

const quyenController = {
  getAll: (req, res) => {
    quyen.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    quyen.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    quyen.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    quyen.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    quyen.delete(id, (result) => res.send(result));
  }
};
export default quyenController