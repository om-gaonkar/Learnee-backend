import mongoose from "mongoose";
const subjects = [
  "Mathematics",
  "Science",
  "English",
  "Social Studies",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
];
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },

    // subject: {
    //   type: String,
    //   required: [true, "Subject is required"],
    //   trim: true,
    // },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      enum: [
        "Mathematics",
        "Science",
        "English",
        "Social Studies",
        "Computer Science",
        "Physics",
        "Chemistry",
        "Biology",
      ],
      trim: true,
    },
    grade: {
      type: Number,
      required: [true, "Grade is required"],
      min: [1, "Grade must be at least 1"],
      max: [12, "Grade cannot exceed 12"],
    },

    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: [0, "Price cannot be negative"],
    },

    teacher: {
      name: {
        type: String,
        required: [true, "Teacher name is required"],
        trim: true,
        maxlength: [100, "Teacher name cannot exceed 100 characters"],
      },

      rating: {
        type: Number,
        required: true,
        min: [0, "Rating cannot be less than 0"],
        max: [5, "Rating cannot exceed 5"],
        default: 0,
      },
    },

    duration: {
      type: String,
      required: [true, "Course duration is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
