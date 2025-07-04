import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Adam and I'm fascinated by the math that powers machine learning. My
              interest in machine learning began with the release of GPT-4 in the spring of my
              senior year of high school. I was amazed that a program was capable of so many things,
              but more than anything, I was in awe of the fact that{' '}
              <em>
                <strong>someone created this</strong>
              </em>
              . That curiosity quickly turned into a deeper interest in the theory behind these
              models—how they generalize, why they work, and what their limitations are. These days,
              I spend my time exploring the mathematical side of machine learning, especially
              concepts such as VC theory, risk minimization, and more recently, topological data
              analysis.
            </p>

            <p>
              I'm currently an Associate Software Developer Intern at Google on the Workspace AI
              Platform team, which integrates Gemini into products such as Google Docs, Slides, and
              Gmail. As part of my role, I am streamlining the creation of custom Gems (personalized
              versions of Gemini) for internal use and sharing with teams. I am also developing a
              flexible access control system, allowing creators to specify user access to these
              Gems. Navigating the largest monorepo in the world has been an invaluable experience,
              giving me deep exposure to large-scale C++ development and complex system integration.
            </p>

            <p>
              This upcoming fall, I will be conducting research with Professor{' '}
              <a href="https://scholar.google.com/citations?user=9Vc6Dn0AAAAJ">Alvin Jin</a> at USC
              in the field of topological deep learning. We are investigating the way the topology
              of data changes as it passes through successive layers of a deep neural network. We
              are using the paper{' '}
              <a href="https://jmlr.csail.mit.edu/papers/volume21/20-345/20-345.pdf">
                Topology of Deep Neural Networks
              </a>{' '}
              (Naitzat et al.) as motivation, and plan on extending their work to classification of
              multiple classes.
            </p>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
