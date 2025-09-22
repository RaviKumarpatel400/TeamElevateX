import { Router } from 'express'
import { requireAdmin } from '../middleware/auth.js'
import { createApplication, listApplications, updateApplicationStatus } from '../controllers/applicationController.js'

const router = Router()

// Public create
router.post('/', createApplication)

// Admin list and update status
router.get('/', requireAdmin, listApplications)
router.patch('/:id/status', requireAdmin, updateApplicationStatus)

export default router


