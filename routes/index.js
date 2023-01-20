const authRouter = require('./auth')
const usersRouter = require('./users')
const postsRouter = require('./posts')
const categoriesRouter = require('./categories')


function route(app){
    app.use('/api/auth',authRouter)
    app.use('/api/user',usersRouter)
    app.use('/api/posts',postsRouter)
    app.use('/api/categories',categoriesRouter)
    // app.use('/',(req,res)=>{
    //     res.json('success')  
    // })

    
}
module.exports = route;