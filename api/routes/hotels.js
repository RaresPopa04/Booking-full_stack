import express from 'express'

import Hotel from '../models/Hotel.js'
const router = express.Router();

import { countByCity, countByType, createHotel, deleteHotel, editHotel, getHotel, getHotels } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

router.post('/',verifyAdmin, createHotel)

router.delete('/:id',verifyAdmin, deleteHotel)



router.get('/countByCity',countByCity)
router.get('/countByType',countByType)

router.get('/', getHotels)

router.get('/:id', getHotel)

router.put('/:id',verifyAdmin,editHotel)


export default router;