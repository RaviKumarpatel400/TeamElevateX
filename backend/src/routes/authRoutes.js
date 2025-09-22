import { Router } from 'express'
import { adminLogin, requestOtp, verifyOtp } from '../controllers/authController.js'

const router = Router()

router.post('/login', adminLogin)
router.post('/request-otp', requestOtp)
router.post('/verify-otp', verifyOtp)

export default router


