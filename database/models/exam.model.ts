import mongoose, { Schema, Document } from 'mongoose'
import { QuestionModel } from './question.model'

interface Exam extends Document {
  title: string
  description: string
  duration: string
  bestScore?: number
  passingScore?: number
  questions: (typeof QuestionModel)[]
}

const ExamSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    bestScore: { type: Number },
    passingScore: { type: Number },
    questions: {
      type: [Schema.Types.ObjectId],
      ref: 'Question',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const ExamModel = mongoose.model<Exam>('Exam', ExamSchema)
