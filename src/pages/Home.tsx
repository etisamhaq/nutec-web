import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses';
import Navbar from '../components/Navbar';
import { NewsletterSubscription } from '../types';

interface HomeProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: white;
  border-radius: 1rem;
  margin-bottom: 4rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const FeaturedSection = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const CourseCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
  }
`;

const CourseImage = styled.div`
  height: 200px;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
`;

const CourseContent = styled.div`
  padding: 1.5rem;
`;

const CourseTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const CourseDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const CoursePrice = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 0.25rem;
  text-decoration: none;
  transition: background-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const NewsletterSection = styled.section`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 3rem;
  border-radius: 1rem;
  text-align: center;
`;

const NewsletterForm = styled.form`
  max-width: 500px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Home = ({ toggleTheme, isDarkTheme }: HomeProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
    const newSubscription: NewsletterSubscription = {
      ...formData,
      date: new Date().toISOString()
    };
    subscriptions.push(newSubscription);
    localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
    setFormData({ name: '', email: '' });
    alert('Thank you for subscribing!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <Container>
        <Hero>
          <HeroTitle>Welcome to Nutec Learning</HeroTitle>
          <HeroSubtitle>
            Discover a world of knowledge with our expert-led courses. Start your learning journey today!
          </HeroSubtitle>
        </Hero>

        <FeaturedSection>
          <SectionTitle>Featured Courses</SectionTitle>
          <CourseGrid>
            {courses.slice(0, 4).map((course) => (
              <CourseCard
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CourseImage>{course.title[0]}</CourseImage>
                <CourseContent>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseDescription>{course.description}</CourseDescription>
                  <CoursePrice>${course.price}</CoursePrice>
                  <Button to={`/course/${course.id}`}>Learn More</Button>
                </CourseContent>
              </CourseCard>
            ))}
          </CourseGrid>
        </FeaturedSection>

        <NewsletterSection>
          <SectionTitle>Subscribe to Our Newsletter</SectionTitle>
          <NewsletterForm onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <SubmitButton type="submit">Subscribe</SubmitButton>
          </NewsletterForm>
        </NewsletterSection>
      </Container>
    </>
  );
};

export default Home; 