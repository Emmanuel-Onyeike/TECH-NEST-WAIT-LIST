import {joinWaitlist, getWaitlist } from "../controllers/waitlistController.js"
import express from "express"

const router = express.Router()
router.post('/join', joinWaitlist)
router.get('/waitlist', getWaitlist)

export default router