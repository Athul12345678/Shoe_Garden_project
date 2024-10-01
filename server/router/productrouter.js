const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const productrouter = express.Router();
const { Addproduct, Display, Deleteproduct, findById, updateDatas } = require('../control/productcontrol');

productrouter.route('/addproduct').post(upload.single('productimage'), Addproduct);
productrouter.route('/display').get(Display);
productrouter.route('/delete/:id').delete(Deleteproduct);
productrouter.route('/edit/:id').get(findById);
productrouter.route("/updateData").put(updateDatas);

module.exports = productrouter;
