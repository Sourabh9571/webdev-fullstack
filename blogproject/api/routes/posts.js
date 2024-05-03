import { getposts ,addpost } from '../controller/posts.js';
import express from 'express';

const router = express.Router();

router.get('/',getposts);
router.post('/',addpost);


export default router;