import express from 'express'

// Sets up csrf protection
const router = express.Router()

router.get('/',  (req, res, next) => {
  res.status(200).json({message:"pong!"});
})
 
export default router;