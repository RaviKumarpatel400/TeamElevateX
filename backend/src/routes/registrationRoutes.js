import { Router } from 'express'
import { requireAdmin } from '../middleware/auth.js'
import { createRegistration, listRegistrations, exportRegistrationsCsv } from '../controllers/registrationController.js'

const router = Router()

// Public create
router.post('/', createRegistration)

// Admin list and export
router.get('/', requireAdmin, listRegistrations)
router.get('/export', requireAdmin, exportRegistrationsCsv)

export default router


