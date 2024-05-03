import express from 'express';
import { getcomments , addcomments } from '../controller/comments.js';

const router = express.Router();

router.get('/',getcomments);
router.post('/',addcomments);


export default router;