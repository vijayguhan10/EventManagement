const express = require('express');
const router = express.Router();
const endformController = require('../Controller/EndformController');
router.post('/endform', endformController.createEndform);
router.get('/endforms', endformController.getAllEndforms);
router.post('/endform/iqac', endformController.getEndformByIQAC);
router.put('/endform/:id', endformController.updateEndform);
router.delete('/endform/:id', endformController.deleteEndform);
module.exports = router;
