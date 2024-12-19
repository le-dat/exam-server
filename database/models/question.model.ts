import { Schema, model, Document } from 'mongoose'

interface IQuestion extends Document {
  question: string
  options: string[]
  correctAnswer: string
  difficulty: string
  explanation?: string
  type: string
}

const questionSchema = new Schema<IQuestion>(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    difficulty: { type: String, required: true },
    explanation: { type: String },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export const QuestionModel = model<IQuestion>('Question', questionSchema)
