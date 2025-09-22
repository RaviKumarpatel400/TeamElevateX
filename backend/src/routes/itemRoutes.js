import { Router } from 'express'
import { requireAdmin } from '../middleware/auth.js'
import { createItem, listItems, getItem, updateItem, deleteItem } from '../controllers/itemController.js'

const router = Router()

// Public listing and single fetch
router.get('/', listItems)
router.get('/:id', getItem)

// Admin protected CRUD
router.post('/', requireAdmin, createItem)
router.put('/:id', requireAdmin, updateItem)
router.delete('/:id', requireAdmin, deleteItem)

export default router


