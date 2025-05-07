import React from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { FiGithub, FiChevronsRight, FiTarget, FiUsers, FiShare2 } from "react-icons/fi"; // Added more icons

// --- Re-usable CSS Helper for Themed Scrollbar (Optional) ---
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
  min-height: calc(100vh - 120px); /* Adjust 120px based on actual Nav+Footer height */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
  overflow-y: auto; // Needed for themed scrollbar to apply if content overflows
  ${themedScrollbar} // Apply themed scrollbar

  @media (max-width: 768px) {
    padding: 2.5rem 1rem;
    min-height: calc(100vh - 100px); /* Mobile Nav/Footer might be smaller */
  }
`;

const Content = styled(motion.section)`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Consistent gap */
`;

const PageHeader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const PlatformTitle = styled(motion.h1)`
  font-size: clamp(2.2rem, 5vw, 3.2rem); /* Responsive font size */
  font-weight: 800;
  line-height: 1.2;
  color: ${({ theme }) => theme.heading};
  margin-bottom: 0.25rem;
  span {
    color: ${({ theme }) => theme.accent};
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textMuted || theme.text};
  opacity: 0.9;
  max-width: 600px;
  margin-top: 0.25rem;
  font-weight: 500;

  a {
    color: ${({ theme }) => theme.accent};
    font-weight: 600;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.accentHover};
    }
  }
`;

const SectionDivider = styled(motion.hr)`
  border: 0;
  height: 2px;
  width: 80px;
  background: ${({ theme }) => theme.accent};
  margin: 1.5rem auto; /* Centered */
  opacity: 0.5;
`;

const Paragraph = styled(motion.p)`
  font-size: 1.15rem; /* Slightly increased base for readability */
  line-height: 1.75;
  color: ${({ theme }) => theme.text};
  b, strong {
    color: ${({ theme }) => theme.heading}; /* Make bold text use heading color for emphasis */
    font-weight: 700;
  }
  @media (max-width: 600px) {
    font-size: 1.05rem;
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

const CtaRow = styled(motion.div)`
  display: flex;
  flex-direction: column; /* Stacked by default */
  gap: 1.2rem;
  align-items: center; /* Center items for a more polished look */
  margin-top: 2rem;
  text-align: center;

  @media (min-width: 600px) { /* Side-by-side on larger screens */
    flex-direction: row;
    justify-content: center;
  }
`;

const GitHubButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #f56565; // Changed to the requested color
  color: ${({ theme }) => theme.buttonText};
  padding: 0.9rem 2.2rem;
  border-radius: 50px; /* Pill shape */
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 14px 0 ${({ theme }) => theme.githubButtonShadow};
  transition: background 0.25s ease-out, transform 0.15s ease-out, box-shadow 0.25s ease-out;

  &:hover {
    background: #e53e3e; // Darker shade for hover
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 20px 0 rgba(245, 101, 101, 0.4); // Adjusted shadow color
    text-decoration: none;
  }
`;

const EmailLink = styled(motion.a)`
  color: ${({ theme }) => theme.accent};
  font-size: 1.1rem;
  font-weight: 500;
  word-break: break-all;
  text-decoration: none;
  padding: 0.5rem; // Add some padding for easier clicking

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.accentHover};
  }
`;

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 80 },
  }),
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// --- The About Page Component ---
export default function AboutPage() {
  return (
    <Wrapper>
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
            This open gaming platform is an initiative by{" "}
            <a
              href="https://sanketmagodia.site" // You can update this if you have a specific project page
              target="_blank"
              rel="noopener noreferrer"
            >
              Sanket Magodia
            </a>{" "}
            to create a space for everyone to share and enjoy games.
          </Subtitle>
        </PageHeader>

        <SectionDivider variants={fadeInUp} custom={0.2} />

        <Paragraph variants={fadeInUp} custom={0.3}>
          Welcome! The dream has always been to build a <strong>truly open gaming platform</strong>.
          While there are plenty of sites for retro and indie games, the goal here is to create something
          that’s fundamentally <strong>more open, more collaborative, and more reliable</strong> for everyone.
        </Paragraph>

        <FeatureHighlight variants={fadeInUp} custom={0.4}>
          <FiTarget />
          <div>
            <Paragraph style={{margin: 0}}>
              This project starts with a passion for classic GBA games but aims to grow into a
              vibrant, <strong>open-source platform shaped by its community</strong>. The vision is to create
              a space where users can actively participate.
            </Paragraph>
          </div>
        </FeatureHighlight>


        <Paragraph variants={fadeInUp} custom={0.5}>
           Imagine a place where you can:
        </Paragraph>
        <ul>
          <motion.li variants={fadeInUp} custom={0.55} style={{ listStyleType: "none", paddingLeft: 0}}>
            <FeatureHighlight style={{padding: "0.5rem 0"}}>
                <FiChevronsRight />
                <Paragraph style={{margin: 0}}><strong>Add new games</strong> to expand the library.</Paragraph>
            </FeatureHighlight>
          </motion.li>
          <motion.li variants={fadeInUp} custom={0.6} style={{ listStyleType: "none", paddingLeft: 0}}>
            <FeatureHighlight style={{padding: "0.5rem 0"}}>
                <FiChevronsRight />
                <Paragraph style={{margin: 0}}><strong>Suggest and collaborate on new features.</strong></Paragraph>
            </FeatureHighlight>
          </motion.li>
          <motion.li variants={fadeInUp} custom={0.65} style={{ listStyleType: "none", paddingLeft: 0}}>
            <FeatureHighlight style={{padding: "0.5rem 0"}}>
                <FiChevronsRight />
                <Paragraph style={{margin: 0}}>Help <strong>expand device support</strong> for a seamless experience everywhere.</Paragraph>
            </FeatureHighlight>
          </motion.li>
        </ul>


        <Paragraph variants={fadeInUp} custom={0.7}>
          Whether you’re a gamer, a developer, or simply an enthusiast for open projects,
          you’re invited to join this journey. Let’s build a platform where everyone can
          contribute, share, and enjoy gaming together!
        </Paragraph>

        <CtaRow variants={fadeInUp} custom={0.8}>
          <GitHubButton
            href="https://github.com/SanketMagodia/PlayGent" // Ensure this is the correct/intended repo
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} // framer-motion handles this, can override styled-component hover
            variants={fadeInUp} // Individual animation for button
            custom={0.85}
          >
            <FiGithub size={22} />
            Fork on GitHub
          </GitHubButton>
          <EmailLink
            href="mailto:magodiasanket@gmail.com"
            variants={fadeInUp} // Individual animation for email
            custom={0.9}
          >
            magodiasanket@gmail.com
          </EmailLink>
        </CtaRow>
      </Content>
    </Wrapper>
  );
}