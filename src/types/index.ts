export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  instructor: string;
  category: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  duration: number;
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  enrolledCourses: EnrolledCourse[];
}

export interface EnrolledCourse {
  courseId: number;
  progress: number;
  completedLessons: number[];
}

export interface NewsletterSubscription {
  name: string;
  email: string;
  date: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
} 