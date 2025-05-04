import { Course } from '../types';

export const courses: Course[] = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Master the basics of web development including HTML, CSS, and JavaScript. Build responsive websites from scratch.",
    price: 99.99,
    instructor: "John Doe",
    category: "Development",
    lessons: [
      { id: 1, title: "Introduction to HTML", duration: 45, completed: false },
      { id: 2, title: "CSS Styling", duration: 60, completed: false },
      { id: 3, title: "JavaScript Basics", duration: 90, completed: false },
      { id: 4, title: "Responsive Design", duration: 75, completed: false }
    ]
  },
  {
    id: 2,
    title: "Python Programming",
    description: "Learn Python programming from scratch. Cover data structures, algorithms, and practical applications.",
    price: 129.99,
    instructor: "Jane Smith",
    category: "Programming",
    lessons: [
      { id: 1, title: "Python Basics", duration: 60, completed: false },
      { id: 2, title: "Data Structures", duration: 90, completed: false },
      { id: 3, title: "Object-Oriented Programming", duration: 75, completed: false },
      { id: 4, title: "File Handling", duration: 45, completed: false }
    ]
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Learn the fundamentals of user interface and user experience design. Create beautiful and functional designs.",
    price: 89.99,
    instructor: "Mike Johnson",
    category: "Design",
    lessons: [
      { id: 1, title: "Design Principles", duration: 60, completed: false },
      { id: 2, title: "Color Theory", duration: 45, completed: false },
      { id: 3, title: "Typography", duration: 60, completed: false },
      { id: 4, title: "User Research", duration: 90, completed: false }
    ]
  },
  {
    id: 4,
    title: "Data Science Essentials",
    description: "Introduction to data science, statistics, and data visualization using Python and popular libraries.",
    price: 149.99,
    instructor: "Sarah Wilson",
    category: "Data Science",
    lessons: [
      { id: 1, title: "Data Analysis Basics", duration: 75, completed: false },
      { id: 2, title: "Statistical Methods", duration: 90, completed: false },
      { id: 3, title: "Data Visualization", duration: 60, completed: false },
      { id: 4, title: "Machine Learning Intro", duration: 120, completed: false }
    ]
  }
]; 