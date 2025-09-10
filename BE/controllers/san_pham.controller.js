import san_pham from "../models/san_pham.model.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const san_phamController = {
  getAll: (req, res) => {
    san_pham.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
  san_pham.getById(req.params.id, (err, product) => {
    if (err) return res.status(500).json({ success: false, error: err });
    res.json(product); // trả về object thay vì array
  });
},


  insert: (req, res) => {
    const data = req.body;
    san_pham.insert(data, (result) => res.send(result));
  },

/*************  ✨ Windsurf Command 🌟  *************/
  /**
   * Update a product by id
   * @param {integer} req.params.id - Product id
   * @param {object} req.body - Product data to be updated
   * @param {string} [req.body.imageBase64] - Base64 encoded image
   * @returns {json} Success and public path of the uploaded image
  */update: (req, res) => {
  try {
    const id = req.params.id;
    const data = { ...req.body };
    
    console.log('=== BACKEND UPDATE DEBUG ===');
    console.log('Product ID:', id);
    console.log('Has imageBase64:', !!data.imageBase64);

    const imageBase64 = data.imageBase64;
    if (imageBase64 && typeof imageBase64 === 'string') {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const uploadsDir = path.join(__dirname, '..', 'uploads', 'products');
      fs.mkdirSync(uploadsDir, { recursive: true });

      let base64Body = imageBase64;
      let ext = 'jpg';
      const matches = imageBase64.match(/^data:(image\/(png|jpg|jpeg|webp));base64,(.*)$/i);
      if (matches && matches.length === 4) {
        ext = matches[2] === 'jpeg' ? 'jpg' : matches[2];
        base64Body = matches[3];
      }

      const filename = `product_${id}_${Date.now()}.${ext}`;
      const filePath = path.join(uploadsDir, filename);
      fs.writeFileSync(filePath, Buffer.from(base64Body, 'base64'));

      // Public path for client - FIX DÒNG NÀY
      const publicPath = `/uploads/products/${filename}`;
      data.hinhanh = publicPath;
      delete data.imageBase64;
      
      console.log('Image saved to:', filePath);
      console.log('Public path:', publicPath);
    }

    // FIX DATETIME FORMAT - chỉ update những field cần thiết
    const updateData = {
      tensp: data.tensp,
      thuonghieu: data.thuonghieu,
      gia: data.gia,
      mausac: data.mausac,
      kieudang: data.kieudang,
      kichthuoc: data.kichthuoc,
      chatlieu: data.chatlieu,
      mota: data.mota,
      tonkho: data.tonkho,
      hinhanh: data.hinhanh  // Chỉ update hinhanh nếu có
    };

    // Loại bỏ các field undefined
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    console.log('Data to update in DB:', updateData);
    console.log('Calling san_pham.update with ID:', id);
    
    san_pham.update(updateData, id, (result) => {
      console.log('Model update callback result:', result);
      console.log('=== END BACKEND DEBUG ===');
      
      return res.json({
        success: true,
        message: result,
        hinhanh: data.hinhanh || null
      });
    });
  } catch (err) {
    console.error('Update product error:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
},

  delete: (req, res) => {
    const id = req.params.id;
    san_pham.delete(id, (result) => res.send(result));
  }
};
export default san_phamController