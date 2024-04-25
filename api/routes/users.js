import express from 'express'

const router = express.Router();

import { createUser, deleteUser, editUser, getUser, getUsers } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

router.get('/checkAuthentication',verifyToken,(req,res,next)=>{
    res.send("Hello user")
})


router.delete('/:id',verifyUser, deleteUser)


router.get('/',verifyAdmin,getUsers)

router.get('/:id',verifyUser, getUser)

router.put('/:id',verifyUser,editUser)

export default router;