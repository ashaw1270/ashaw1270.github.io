import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;
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

      <StyledText>
        <div>
          <p>
            Hello! My name is Adam and I'm fascinated by the math that powers machine learning. My
            interest in machine learning began with the release of GPT-4 in the spring of my senior
            year of high school. I was amazed that a program was capable of so many things, but more
            than anything, I was in awe of the fact that{' '}
            <em>
              <strong>someone created this</strong>
            </em>
            . That curiosity quickly turned into a deeper interest in the theory behind these
            models—how they generalize, why they work, and what their limitations are. These days, I
            spend my time exploring the mathematical side of machine learning, especially concepts
            such as VC theory, risk minimization, and more recently, topological data analysis.
          </p>

          <p>
            I just wrapped up my time as an Associate Software Developer Intern at Google on the
            Workspace AI Platform team, which integrates Gemini into products such as Google Docs,
            Slides, and Gmail. As part of my role, I streamlined the creation of custom Gems
            (personalized versions of Gemini) for internal use and sharing with teams. I also
            developed a flexible access control system, allowing creators to specify user access to
            these Gems. Navigating the largest monorepo in the world was an invaluable experience,
            giving me deep exposure to large-scale C++ development and complex system integration.
          </p>

          <p>
            This fall, I am conducting research with Professor{' '}
            <a href="https://scholar.google.com/citations?user=9Vc6Dn0AAAAJ">Alvin Jin</a> at USC in
            the field of topological deep learning. We are investigating the way the topology of
            data (i.e., Betti numbers and other invariants) changes as it passes through successive
            layers of a deep neural network. We are using{' '}
            <a href="https://jmlr.csail.mit.edu/papers/volume21/20-345/20-345.pdf">
              Naitzat et al.
            </a>{' '}
            as motivation, and plan on extending their work to{' '}
            <a href="https://www.ijcai.org/proceedings/2022/0774.pdf">predictive coding networks</a>
            , a novel model architecture that uses an alternative to backpropagation.
          </p>
        </div>
      </StyledText>
    </StyledAboutSection>
  );
};

export default About;
