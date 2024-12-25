import { Schema, model, Document } from 'mongoose'
interface IOptionSelectSchema {
  label: string
  value: string
}
interface IQuestion extends Document {
  question: string
  options: string[]
  optionsSelect: IOptionSelectSchema[]
  correctAnswer: string
  difficulty: string
  explanation?: string
  type: string
  grade: string
  subject: string
  level: string
}

const optionSelectSchema = new Schema<IOptionSelectSchema>(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const questionSchema = new Schema<IQuestion>(
  {
    question: { type: String, required: true },
    options: {
      type: [String],
      validate: {
        validator: function (this: any) {
          return this.options.length > 0 || this.optionsSelect.length > 0
        },
        message:
          'Either options or optionsSelect must be provided, but not both.',
      },
    },
    optionsSelect: {
      type: [optionSelectSchema],
      validate: {
        validator: function (this: any) {
          return this.options.length > 0 || this.optionsSelect.length > 0
        },
        message:
          'Either options or optionsSelect must be provided, but not both.',
      },
    },
    correctAnswer: { type: String, required: true },
    difficulty: { type: String, required: true },
    explanation: { type: String },
    type: { type: String, required: true },
    grade: { type: String, required: true },
    subject: { type: String, required: true },
    level: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export const QuestionModel = model<IQuestion>('Question', questionSchema)
