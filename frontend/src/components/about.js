import React from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { 
  FiGithub, 
  FiChevronsRight, 
  FiStar,
} from "react-icons/fi";

// --- Re-usable CSS Helper for Themed Scrollbar ---
const themedScrollbar = css`
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.body};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.accentLight};
    border-radius: 20px;
    border: 3px solid ${({ theme }) => theme.body};
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.accent};
  }
`;

// --- Styled Components ---
const Wrapper = styled.main`
  font-family: ${({ theme }) => theme.fontFamily};
  min-height: calc(100vh - 120px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 4rem 1.5rem;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
  overflow-y: auto;
  ${themedScrollbar}

  @media (max-width: 768px) {
    padding: 2.5rem 1rem;
    min-height: calc(100vh - 100px);
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 500px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.heroGradientStart || theme.accent + "22"},
    ${({ theme }) => theme.heroGradientEnd || theme.accentLight + "11"}
  );
  z-index: 0;
  opacity: 0.6;
`;

const Content = styled(motion.section)`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 1;
`;

const PageHeader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
`;

const PlatformTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  color: ${({ theme }) => theme.heading};
  margin-bottom: 0.5rem;
  
  span {
    color: ${({ theme }) => theme.accent};
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 6px;
      background: ${({ theme }) => theme.accent};
      bottom: -4px;
      left: 0;
      border-radius: 3px;
      opacity: 0.3;
    }
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textMuted || theme.text};
  opacity: 0.9;
  max-width: 700px;
  margin-top: 1rem;
  font-weight: 500;
  line-height: 1.6;

  a {
    color: ${({ theme }) => theme.accent};
    font-weight: 600;
    text-decoration: none;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -2px;
      left: 0;
      background: ${({ theme }) => theme.accent};
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: ${({ theme }) => theme.accentHover};
      &::after {
        width: 100%;
      }
    }
  }
`;

const SectionDivider = styled(motion.hr)`
  border: 0;
  height: 3px;
  width: 120px;
  background: ${({ theme }) => theme.accent};
  margin: 0.5rem auto 2rem;
  opacity: 0.5;
  border-radius: 2px;
`;

const Paragraph = styled(motion.p)`
  font-size: 1.15rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.text};
  
  b, strong {
    color: ${({ theme }) => theme.heading};
    font-weight: 700;
  }
  
  @media (max-width: 600px) {
    font-size: 1.05rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.heading};
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    width: 40%;
    height: 4px;
    background: ${({ theme }) => theme.accent};
    bottom: -8px;
    left: 0;
    border-radius: 2px;
    opacity: 0.7;
  }
`;

const FeatureHighlight = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;

  svg {
    flex-shrink: 0;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.accent};
    margin-top: 0.25rem;
  }
`;





const TagsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Tag = styled(motion.span)`
  padding: 0.3rem 0.8rem;
  background: ${({ theme }) => theme.tagBg || theme.accent + '22'};
  color: ${({ theme }) => theme.accent};
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const CtaRow = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  margin-top: 3rem;
  padding: 2rem;
  background: ${({ theme }) => theme.ctaBg || (theme.body === '#121212' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)')};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.ctaBorder || 'transparent'};

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const GitHubButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #f56565;
  color: white;
  padding: 0.9rem 2.2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 14px 0 rgba(245, 101, 101, 0.4);
  transition: all 0.25s ease-out;

  &:hover {
    background: #e53e3e;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 20px 0 rgba(245, 101, 101, 0.4);
  }
`;

const EmailLink = styled(motion.a)`
  color: ${({ theme }) => theme.accent};
  font-size: 1.1rem;
  font-weight: 500;
  word-break: break-all;
  text-decoration: none;
  padding: 0.5rem;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.accentHover};
  }
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  opacity: 0.1;
  z-index: 0;
  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
`;

const ParallaxContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, type: "spring", stiffness: 80 },
  }),
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};



const floatAnimation = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut"
    }
  }
};

// --- The Enhanced About Page Component ---
export default function AboutPage() {
  
  
 
  
  const tags = ["Open Source", "Gaming", "Community", "GBA", "Retro", "Indie Games", "Collaboration", "Web Gaming"];
  
  return (
    <Wrapper>
      <HeroBackground />
      <ParallaxContainer>
        <FloatingShape 
          size="100px" 
          top="5%" 
          left="5%" 
          animate="float"
          variants={floatAnimation}
        />
        <FloatingShape 
          size="70px" 
          top="20%" 
          right="10%" 
          animate="float"
          variants={{
            float: {
              y: [0, -15, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: 0.5
              }
            }
          }}
        />
        <FloatingShape 
          size="120px" 
          bottom="15%" 
          right="15%" 
          animate="float"
          variants={{
            float: {
              y: [0, -8, 0],
              transition: {
                duration: 3.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: 1
              }
            }
          }}
        />
        
        <Content
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <PageHeader variants={fadeInUp}>
            <PlatformTitle custom={0}>
              About <span>Our Vision</span>
            </PlatformTitle>
            <Subtitle custom={0.1}>
              Hi, I am {" "}
              <a
                href="https://sanketmagodia.site"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sanket Magodia
              </a>{" "}
             , I want to create an inclusive, vibrant space where everyone can share, 
              contribute to, and enjoy games without limitations.
            </Subtitle>
          </PageHeader>

          <SectionDivider variants={fadeInUp} custom={0.2} />
          
          <TagsContainer variants={staggerContainer}>
            {tags.map((tag, index) => (
              <Tag 
                key={index}
                variants={fadeInUp}
                custom={0.2 + index * 0.05}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </Tag>
            ))}
          </TagsContainer>

          <Paragraph variants={fadeInUp} custom={0.3}>
            Welcome! The dream has always been to build a <strong>truly open gaming platform</strong>.
            While there are plenty of sites for retro and indie games, the goal here is to create something
            that's fundamentally <strong>more open, more collaborative, and more reliable</strong> for everyone.
            This isn't just another gaming website—it's a movement to make gaming more accessible and community-driven.
          </Paragraph>

          

          <SectionTitle variants={fadeInUp} custom={0.5}>
            Mission
          </SectionTitle>

          <FeatureHighlight variants={fadeInUp} custom={0.55}>
            <FiStar />
            <div>
              <Paragraph style={{margin: 0}}>
                This project starts with a passion for classic GBA games but aims to grow into a
                vibrant, <strong>open-source platform shaped by its community</strong>. The vision is to create
                a space where users are not just consumers, but active participants in shaping the platform's future.
              </Paragraph>
            </div>
          </FeatureHighlight>

          <SectionTitle variants={fadeInUp} custom={0.6}>
            What We're Building
          </SectionTitle>

          <Paragraph variants={fadeInUp} custom={0.65}>
             Imagine a place where you can:
          </Paragraph>
          
          <motion.ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
            <motion.li variants={fadeInUp} custom={0.7}>
              <FeatureHighlight style={{padding: "0.5rem 0"}}>
                  <FiChevronsRight />
                  <Paragraph style={{margin: 0}}><strong>Add new games</strong> to expand the library, creating a diverse collection everyone can enjoy.</Paragraph>
              </FeatureHighlight>
            </motion.li>
            <motion.li variants={fadeInUp} custom={0.75}>
              <FeatureHighlight style={{padding: "0.5rem 0"}}>
                  <FiChevronsRight />
                  <Paragraph style={{margin: 0}}><strong>Suggest and collaborate on new features</strong> that enhance the gaming experience for everyone.</Paragraph>
              </FeatureHighlight>
            </motion.li>
            <motion.li variants={fadeInUp} custom={0.8}>
              <FeatureHighlight style={{padding: "0.5rem 0"}}>
                  <FiChevronsRight />
                  <Paragraph style={{margin: 0}}>Help <strong>expand device support</strong> for a seamless experience on phones, tablets, desktops, and even unconventional devices.</Paragraph>
              </FeatureHighlight>
            </motion.li>
            <motion.li variants={fadeInUp} custom={0.85}>
              <FeatureHighlight style={{padding: "0.5rem 0"}}>
                  <FiChevronsRight />
                  <Paragraph style={{margin: 0}}><strong>Create communities</strong> around your favorite games and connect with players who share your passion.</Paragraph>
              </FeatureHighlight>
            </motion.li>
            <motion.li variants={fadeInUp} custom={0.9}>
              <FeatureHighlight style={{padding: "0.5rem 0"}}>
                  <FiChevronsRight />
                  <Paragraph style={{margin: 0}}><strong>Participate in tournaments</strong> and events that bring the community together in friendly competition.</Paragraph>
              </FeatureHighlight>
            </motion.li>
          </motion.ul>

          

          

          <Paragraph variants={fadeInUp} custom={1.7}>
            Whether you're a gamer, a developer, or simply an enthusiast for open projects,
            you're invited to join this journey. Let's build a platform where everyone can
            contribute, share, and enjoy gaming together! Our community is growing every day,
            and we'd love for you to be part of this exciting adventure.
          </Paragraph>

          <CtaRow variants={fadeInUp} custom={1.8}>
            <GitHubButton
              href="https://github.com/SanketMagodia/PlayGent"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              variants={fadeInUp}
              custom={1.85}
            >
              <FiGithub size={22} />
              Fork on GitHub
            </GitHubButton>
            <EmailLink
              href="mailto:magodiasanket@gmail.com"
              variants={fadeInUp}
              custom={1.9}
            >
              magodiasanket@gmail.com
            </EmailLink>
          </CtaRow>
        </Content>
      </ParallaxContainer>
    </Wrapper>
  );
}