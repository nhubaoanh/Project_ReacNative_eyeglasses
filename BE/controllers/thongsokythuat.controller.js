import thongsokythuat from "../models/thongsokythuat.model";

const thongsokythuatController = {
  getAll: (req, res) => {
    thongsokythuat.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    thongsokythuat.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    thongsokythuat.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    thongsokythuat.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    thongsokythuat.delete(id, (result) => res.send(result));
  }
};
export default thongsokythuatController