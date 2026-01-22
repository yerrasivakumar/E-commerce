import express from 'express';
import {saveAddress,getAddresses,deleteAddress} from '../controllers/addressController.js';

const router = express.Router();

router.post('/add', saveAddress);
router.get('/useraddress/:userId', getAddresses);
router.delete('/deleteaddress/:id', deleteAddress);

export default router;