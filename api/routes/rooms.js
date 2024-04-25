import express from 'express'

const router = express.Router();
import {createRoom, deleteRoom, editRoom, getRoom, getRooms} from "../controllers/room.js"
import {verifyAdmin} from "../utils/verifyToken.js"

router.post('/:hotelId',verifyAdmin, createRoom)

router.delete('/:id/:hotelId',verifyAdmin, deleteRoom)


router.get('/', getRooms)

router.get('/:id', getRoom)

router.put('/:id',verifyAdmin,editRoom)

export default router;