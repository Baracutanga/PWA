import express from "express";
import Post from '../models/Posts.js';
const router = express.Router();

router.get('/', async(req, res) => {
    try{
        const post = await Post.find();
        res.json(post);
    } catch (err) {
        res.status(500).send('Erro ao procurar post')
    }
});

router.post('/', async (req, res) => {
    try{
        const post = new Post(req.body);
        await post.save();
    
        res.status(201).json(post);
    } catch (err) {
        res.status(500).send('Erro ao criar post');
    }
})

export default router;