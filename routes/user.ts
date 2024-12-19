import { Router } from 'express'
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  me,
} from '../controllers/user.controller'
import { authenticateToken } from '../middleware/auth.middleware'

const userRoutes = Router()

userRoutes.get('/me', authenticateToken, me)
userRoutes.get('/', authenticateToken, getAllUsers)
userRoutes.post('/', authenticateToken, createUser)
userRoutes.get('/:id', authenticateToken, getUser)
userRoutes.put('/:id', authenticateToken, updateUser)
userRoutes.delete('/:id', authenticateToken, deleteUser)

export default userRoutes
