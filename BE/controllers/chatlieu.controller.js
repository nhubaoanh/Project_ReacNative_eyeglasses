import chatlieu from "../models/chatlieu.model";

const chatlieuController = {
  getAll: (req, res) => {
    chatlieu.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    chatlieu.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    chatlieu.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    chatlieu.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    chatlieu.delete(id, (result) => res.send(result));
  }
};
export default chatlieuController