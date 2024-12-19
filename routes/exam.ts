import { Router } from 'express'
import {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
  addQuestionsToExam,
} from '../controllers/exam.controller'

const examRoutes = Router()

examRoutes.get('/:id', getExamById)
examRoutes.get('/', getExams)
examRoutes.post('/', createExam)
examRoutes.put('/:id', updateExam)
examRoutes.delete('/:id', deleteExam)
examRoutes.post('/:examId/questions', addQuestionsToExam)

export default examRoutes
