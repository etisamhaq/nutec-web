import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses';
import Navbar from '../components/Navbar';
import { EnrolledCourse } from '../types';

interface DashboardProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const CourseCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const CourseHeader = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
`;

const CourseTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const CourseInstructor = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const CourseContent = styled.div`
  padding: 1.5rem;
`;

const ProgressSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  margin: 0.5rem 0;
  overflow: hidden;
`;

const Progress = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: width 0.3s ease-in-out;
`;

const ProgressText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const EmptyStateTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  margin-bottom: 2rem;
`;

const Dashboard = ({ toggleTheme, isDarkTheme }: DashboardProps) => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setEnrolledCourses(storedCourses);
  }, []);

  const getEnrolledCourseDetails = (courseId: number) => {
    return courses.find((course) => course.id === courseId);
  };

  return (
    <>
      <Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <Container>
        <Header>
          <Title>My Learning Dashboard</Title>
          <Subtitle>Track your progress and continue learning</Subtitle>
        </Header>

        {enrolledCourses.length === 0 ? (
          <EmptyState>
            <EmptyStateTitle>No Courses Enrolled</EmptyStateTitle>
            <EmptyStateText>
              Start your learning journey by enrolling in a course
            </EmptyStateText>
            <Button to="/">Browse Courses</Button>
          </EmptyState>
        ) : (
          <CourseGrid>
            {enrolledCourses.map((enrolledCourse) => {
              const course = getEnrolledCourseDetails(enrolledCourse.courseId);
              if (!course) return null;

              return (
                <CourseCard
                  key={enrolledCourse.courseId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CourseHeader>
                    <CourseTitle>{course.title}</CourseTitle>
                    <CourseInstructor>by {course.instructor}</CourseInstructor>
                  </CourseHeader>
                  <CourseContent>
                    <ProgressSection>
                      <ProgressText>Course Progress</ProgressText>
                      <ProgressBar>
                        <Progress progress={enrolledCourse.progress} />
                      </ProgressBar>
                      <ProgressText>{Math.round(enrolledCourse.progress)}% Complete</ProgressText>
                    </ProgressSection>
                    <Button to={`/course/${course.id}`}>Continue Learning</Button>
                  </CourseContent>
                </CourseCard>
              );
            })}
          </CourseGrid>
        )}
      </Container>
    </>
  );
};

export default Dashboard; 