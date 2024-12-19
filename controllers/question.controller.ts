import { Request, Response } from 'express'
import { QuestionModel } from '../database/models/question.model'
import { ExamModel } from '../database/models/exam.model'

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = new QuestionModel(req.body)
    const savedQuestion = await question.save()
    return res
      .status(201)
      .json({ data: savedQuestion, message: 'Question created successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error creating question', error })
  }
}

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await QuestionModel.find()
    return res
      .status(200)
      .json({ data: questions, message: 'Questions fetched successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error fetching questions', error })
  }
}

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await QuestionModel.findById(req.params.id)
    if (!question) {
      return res.status(404).json({ message: 'Question not found' })
    }
    return res
      .status(200)
      .json({ data: question, message: 'Question fetched successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error fetching question', error })
  }
}

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' })
    }
    return res
      .status(200)
      .json({ data: updatedQuestion, message: 'Question updated successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error updating question', error })
  }
}

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const deletedQuestion = await QuestionModel.findByIdAndDelete(req.params.id)
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' })
    }
    return res.status(200).json({ message: 'Question deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error deleting question', error })
  }
}
