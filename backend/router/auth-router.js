const express  = require('express')
const router = express.Router()
const {home,register,login,movieDB,user,movieTheater,movieTickets,totaluser,totaltickets,pendingtickets,confirmtickets,allusers,updateTicketStatus,updateUserStatus,rejectedtickets} = require("../controllers/auth-controller")
const userMiddleware = require("../middleware/user-middleware")


router.post("/register",register)
router.post("/login",login)
router.get("/movieDB",movieDB)
router.get("/theater",movieTheater)
router.get("/user",userMiddleware,user)
router.post("/orderticket",movieTickets)
router.get("/users",totaluser)
router.get("/totalticket",totaltickets)
router.get("/pendingtickets",pendingtickets)
router.get("/confirmTickets",confirmtickets)
router.get("/rejectedtickets",rejectedtickets)
router.get("/allusers",allusers)
router.post("/updateTicketStatus/:userId/:ticketId",updateTicketStatus)
router.post("/updateUserStatus/:userId",updateUserStatus)




module.exports = router;