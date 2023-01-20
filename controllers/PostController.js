const Post = require('../models/Post')

class PostController {
    //create post /post
    async create(req, res) {
        const newPost = new Post(req.body);
        try {

            const post = await newPost.save();
            res.status(200).json(post);
            console.log("new post saved", post);

        } catch (err) {
            res.status(500).json(err)
            console.log("new post failed")
        }
    }
    ///testing
    async test(req,res){
        res.status(200).json(req.body);
        console.log(req.body)
    }
    // UPDATE /post/:id
    async update(req, res) {

        try {
            const post = await Post.findByIdAndUpdate(req.params.id);
            if (post.username === req.body.username) {
                try {
                    const updatedPost = await Post.findByIdAndUpdate(
                        req.params.id,
                        { $set: req.body },
                        { new: true }
                    );
                    res.status(200).json(updatedPost);

                } catch (error) {
                    res.status(500).json(error)

                }

            } else {
                res.status(401).json("you cant update")
            }
        } catch (error) {
            res.status(500).json("can not find post")
        }
    }
    async delete(req, res) {
       try {
            const post = await Post.findById(req.params.id);
            if(post){

                console.log(post)
                if(post.username === req.body.username){ //user delete their own post
    
                    await post.delete();
                    res.status(200).json('post has been deleted !')
                }else{
                    res.status(401).json("you can not delete this post")
                }
            }else{
                res.status(401).json("NOT FOUND POST ")
            }

       } catch (error) {
        
       }

    }
    //Get post/:slug
    async getPost(req, res) {
        try {
            const post = await Post.findOne({slug:req.params.slug});
            // console.log(req.params.slug)
            if(post){
                res.status(200).json(post)
            }else{

                res.status(500).json("there no post found");
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }
    //
    async getAllPosts(req, res) {
        const username =req.query.user;
        const category =req.query.cat;

        try {
            let posts;
            if(username){
                posts = await Post.find({username});


            }else if(category){
                posts = await Post.find({   categories: {
                    $in:[category]
                } });

            }else{
                posts = await Post.find();
            }
            res.status(200).json(posts);
        } catch (error) {
            
        }

    }
}
module.exports = new PostController();