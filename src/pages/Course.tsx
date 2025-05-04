import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { courses } from '../data/courses';
import Navbar from '../components/Navbar';
import { Course as CourseType, EnrolledCourse } from '../types';

interface CourseProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CourseHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const CourseTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const CourseInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`;

const CourseDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const LessonsSection = styled.section`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const LessonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LessonItem = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme, completed }) =>
    completed ? theme.colors.success + '20' : theme.colors.background};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateX(5px);
  }
`;

const LessonCheckbox = styled.div<{ completed: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme, completed }) =>
    completed ? theme.colors.success : theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.success};
`;

const LessonInfo = styled.div`
  flex: 1;
`;

const LessonTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
`;

const LessonDuration = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  margin: 2rem 0;
  overflow: hidden;
`;

const Progress = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: width 0.3s ease-in-out;
`;

const EnrollButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;

const Course = ({ toggleTheme, isDarkTheme }: CourseProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseType | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    const foundCourse = courses.find((c) => c.id === Number(id));
    if (foundCourse) {
      setCourse(foundCourse);
      // Check if user is enrolled
      const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
      const enrolledCourse = enrolledCourses.find((ec: EnrolledCourse) => ec.courseId === Number(id));
      if (enrolledCourse) {
        setEnrolled(true);
        setCompletedLessons(enrolledCourse.completedLessons);
        setProgress(enrolledCourse.progress);
      }
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleEnroll = () => {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const newEnrolledCourse: EnrolledCourse = {
      courseId: Number(id),
      progress: 0,
      completedLessons: []
    };
    enrolledCourses.push(newEnrolledCourse);
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    setEnrolled(true);
  };

  const toggleLesson = (lessonId: number) => {
    if (!enrolled) return;

    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const courseIndex = enrolledCourses.findIndex((ec: EnrolledCourse) => ec.courseId === Number(id));
    
    if (courseIndex !== -1) {
      const course = enrolledCourses[courseIndex];
      const lessonIndex = course.completedLessons.indexOf(lessonId);
      
      if (lessonIndex === -1) {
        course.completedLessons.push(lessonId);
      } else {
        course.completedLessons.splice(lessonIndex, 1);
      }
      
      course.progress = (course.completedLessons.length / (course?.lessons?.length || 1)) * 100;
      enrolledCourses[courseIndex] = course;
      
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      setCompletedLessons(course.completedLessons);
      setProgress(course.progress);
    }
  };

  if (!course) return null;

  return (
    <>
      <Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <Container>
        <CourseHeader>
          <CourseTitle>{course.title}</CourseTitle>
          <CourseInfo>
            <InfoItem>👨‍🏫 Instructor: {course.instructor}</InfoItem>
            <InfoItem>💰 Price: ${course.price}</InfoItem>
            <InfoItem>📚 Category: {course.category}</InfoItem>
          </CourseInfo>
          <CourseDescription>{course.description}</CourseDescription>
          {enrolled && (
            <ProgressBar>
              <Progress progress={progress} />
            </ProgressBar>
          )}
          <EnrollButton onClick={handleEnroll} disabled={enrolled}>
            {enrolled ? 'Enrolled' : 'Enroll Now'}
          </EnrollButton>
        </CourseHeader>

        <LessonsSection>
          <SectionTitle>Course Content</SectionTitle>
          <LessonList>
            {course.lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                completed={completedLessons.includes(lesson.id)}
                onClick={() => toggleLesson(lesson.id)}
              >
                <LessonCheckbox completed={completedLessons.includes(lesson.id)}>
                  {completedLessons.includes(lesson.id) && '✓'}
                </LessonCheckbox>
                <LessonInfo>
                  <LessonTitle>{lesson.title}</LessonTitle>
                  <LessonDuration>{lesson.duration} minutes</LessonDuration>
                </LessonInfo>
              </LessonItem>
            ))}
          </LessonList>
        </LessonsSection>
      </Container>
    </>
  );
};

export default Course; 