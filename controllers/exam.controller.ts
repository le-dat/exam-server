import { Request, Response } from 'express'
import { ExamModel } from '../database/models/exam.model'
import { QuestionModel } from '../database/models/question.model'

export const createExam = async (req: Request, res: Response) => {
  try {
    const exam = new ExamModel(req.body)
    const savedExam = await exam.save()
    return res
      .status(201)
      .json({ data: savedExam, message: 'Exam created successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error creating exam', error })
  }
}

export const addQuestionsToExam = async (req: Request, res: Response) => {
  try {
    const { examId } = req.params
    const { questionIds } = req.body

    const exam = await ExamModel.findById(examId)
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' })
    }

    const questions = await QuestionModel.find({ _id: { $in: questionIds } })
    if (questions.length !== questionIds.length) {
      return res
        .status(404)
        .json({ message: 'One or more questions not found' })
    }

    exam.questions.push(...questions.map((question: any) => question._id))
    await exam.save()

    return res
      .status(200)
      .json({ data: exam, message: 'Questions added to exam successfully' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error adding questions to exam', error })
  }
}

export const getExams = async (req: Request, res: Response) => {
  try {
    const exams = await ExamModel.find().populate('questions')
    return res
      .status(200)
      .json({ data: exams, message: 'Exams fetched successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error fetching exams', error })
  }
}

export const getExamById = async (req: Request, res: Response) => {
  try {
    const exam = await ExamModel.findById(req.params.id).populate('questions')
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' })
    }
    return res
      .status(200)
      .json({ data: exam, message: 'Exam fetched successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ data: error, message: 'Error fetching exam' })
  }
}

export const updateExam = async (req: Request, res: Response) => {
  try {
    const updatedExam = await ExamModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('questions')
    if (!updatedExam) {
      return res.status(404).json({ message: 'Exam not found' })
    }
    return res
      .status(200)
      .json({ data: updatedExam, message: 'Exam updated successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ data: error, message: 'Error updating exam' })
  }
}

export const deleteExam = async (req: Request, res: Response) => {
  try {
    const deletedExam = await ExamModel.findByIdAndDelete(req.params.id)
    if (!deletedExam) {
      return res.status(404).json({ message: 'Exam not found' })
    }
    return res.status(200).json({ message: 'Exam deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ data: error, message: 'Error deleting exam' })
  }
}

export const getRandomQuestionsByDifficulty = async (
  req: Request,
  res: Response
) => {
  try {
    const { easySize, mediumSize, hardSize, subject } = req.body
    const difficulties = ['easy', 'medium', 'hard']
    const sizes = [easySize, mediumSize, hardSize]

    const questions = await Promise.all(
      difficulties.map((difficulty, index) =>
        QuestionModel.aggregate([
          { $match: { difficulty, subject } },
          { $sample: { size: parseInt(sizes[index], 10) } },
        ])
      )
    )

    const combinedQuestions = questions.flat()

    if (!combinedQuestions.length) {
      return res
        .status(404)
        .json({ message: 'No questions found for the specified difficulties' })
    }

    return res.status(200).json({
      data: combinedQuestions,
      message: 'Questions fetched successfully',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error fetching questions', error })
  }
}
