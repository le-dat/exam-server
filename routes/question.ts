import { Router } from 'express'
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from '../controllers/question.controller'
import { getRandomQuestionsByDifficulty } from '../controllers/exam.controller'

const questionRoutes = Router()

questionRoutes.get('/:id', getQuestionById)
questionRoutes.get('/', getQuestions)
questionRoutes.post('/', createQuestion)
questionRoutes.put('/:id', updateQuestion)
questionRoutes.delete('/:id', deleteQuestion)
questionRoutes.post('/random', getRandomQuestionsByDifficulty)

export default questionRoutes