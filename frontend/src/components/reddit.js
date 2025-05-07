import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "../ThemeContext"; // Adjust path as needed

// Your color palettes
const lightThemeColors = {
  background: "#ffffff",
  text: "#2d3748",
  textSecondary: "#4a5568",
  heading: "#1a202c",
  primary: "#4299e1",
  primaryGradient: "linear-gradient(90deg, #4299e1 0%, #63b3ed 100%)",
  primaryHoverGradient: "linear-gradient(90deg, #63b3ed 0%, #90cdf4 100%)",
  primaryShadow: "rgba(66, 153, 225, 0.3)",
  cardBg: "#ffffff",
  cardBorder: "#e2e8f0",
  cardShadow: "rgba(0, 0, 0, 0.08)",
  miniGameText: "#4299e1",
  miniGameTextSecondary: "#4a5568",
  miniGameBg: "#f7fafc",
  miniGameBorder: "#e2e8f0",
  miniGameShadow: "rgba(0, 0, 0, 0.06)",
  miniGameSquareBg: "#edf2f7",
  miniGameSquareBorder: "rgba(66, 153, 225, 0.5)",
};
const darkThemeColors = {
  text: "#e2e8f0",
  textSecondary: "#a0aec0",
  heading: "#ffffff",
  primary: "#f56565",
  primaryGradient: "linear-gradient(90deg, #f56565 0%, #fc8181 100%)",
  primaryHoverGradient: "linear-gradient(90deg, #fc8181 0%, #feb2b2 100%)",
  primaryShadow: "rgba(245, 101, 101, 0.3)",
  cardBg: "#1a202c",
  cardBorder: "#2d3748",
  cardShadow: "rgba(0, 0, 0, 0.4)",
  miniGameText: "#f56565",
  miniGameTextSecondary: "#a0aec0",
  miniGameBg: "#1a202c",
  miniGameBorder: "#2d3748",
  miniGameShadow: "rgba(0, 0, 0, 0.3)",
  miniGameSquareBg: "#2d3748",
  miniGameSquareBorder: "rgba(245, 101, 101, 0.5)",
};

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 0;
`;

const Box = styled.div`
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px ${({ theme }) => theme.cardShadow};
  border: 1.5px solid ${({ theme }) => theme.cardBorder};
  width: 320px;
  min-height: 220px;
  padding: 1.2rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: background 0.3s, color 0.3s;
  @media (max-width: 1100px) {
    width: 100%;
    min-width: 0;
    max-width: 500px;
  }
`;

const SubredditHeader = styled.div`
  font-size: 1.18rem;
  font-weight: 800;
  margin-bottom: 0.2rem;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 0.5px;
`;

const Title = styled.a`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: 1.06rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    filter: brightness(1.2);
  }
`;

const PostMeta = styled.div`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.5rem;
`;

// Helper to fetch posts
const fetchPosts = async (subreddit, type = "new", limit = 3) => {
  const url = `https://www.reddit.com/r/${subreddit}/${type}.json?limit=${limit}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.data?.children || [];
};

export default function RedditThreeBox() {
  const { dark } = useTheme();
  const theme = dark ? darkThemeColors : lightThemeColors;

  const [posts, setPosts] = useState({
    GameBoy: [],
    RetroGaming: [],
    Gaming: [],
  });

  useEffect(() => {
    const load = async () => {
      const [gameboy, retro, gaming] = await Promise.all([
        fetchPosts("GameBoy", "new", 3),
        fetchPosts("RetroGaming", "new", 3),
        fetchPosts("Gaming", "new", 3),
      ]);
      setPosts({
        GameBoy: gameboy,
        RetroGaming: retro,
        Gaming: gaming,
      });
    };
    load();
    // Optionally, add polling for live updates
    // const interval = setInterval(load, 60000); // every 60s
    // return () => clearInterval(interval);
  }, []);

  const boxes = [
    { name: "GameBoy", posts: posts.GameBoy },
    { name: "RetroGaming", posts: posts.RetroGaming },
    { name: "Gaming", posts: posts.Gaming },
  ];

  return (
    <Container>
      {boxes.map(({ name, posts }) => (
        <Box key={name} theme={theme}>
          <SubredditHeader theme={theme}>r/{name}</SubredditHeader>
          {posts.length === 0 && <PostMeta theme={theme}>Loading...</PostMeta>}
          {posts.map(({ data }) => (
            <div key={data.id}>
              <Title
                href={`https://reddit.com${data.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
                theme={theme}
              >
                {data.title}
              </Title>
              <PostMeta theme={theme}>
                by u/{data.author} &middot; {data.num_comments} comments
              </PostMeta>
            </div>
          ))}
        </Box>
      ))}
    </Container>
  );
}
