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
            Hello! My name is Adam, and I'm a junior at USC studying Applied Math and CS. My
            interest in machine learning began with the release of GPT-4 in the spring of my senior
            year of high school. I was amazed that a program was capable of so many things, but more
            than anything, I was in awe of the fact that{' '}
            <em>
              <strong>someone created this</strong>
            </em>
            . That curiosity quickly turned into a deeper interest in the theory behind these
            models—how they generalize, why they work, and what their limitations are. These days, I
            spend my time exploring the mathematical side of machine learning, most recently the
            field of topological deep learning.
          </p>
          <p>
            Last summer, I worked as an Associate Software Developer Intern at{' '}
            <a href="https://workspace.google.com/lp/solutions/ai/">Google</a> on the Workspace AI
            Platform team, which integrates Gemini into products such as Google Docs, Slides, and
            Gmail. This school year, I conducted research with Professor{' '}
            <a href="https://scholar.google.com/citations?user=9Vc6Dn0AAAAJ">Alvin Jin</a> at USC in
            topological deep learning, investigating how the topology of data (Betti numbers)
            evolves across successive layers of a deep neural network. We submitted our findings to
            a CS conference and are currently awaiting review. This summer, I will be conducting
            deep learning research at <a href="https://www.anl.gov/">Argonne National Laboratory</a>{' '}
            through the U.S. Department of Energy's SULI program, giving me the opportunity to work
            alongside world-class researchers at one of the nation's leading scientific
            institutions.
            {/* We used{' '}
            <a href="https://jmlr.csail.mit.edu/papers/volume21/20-345/20-345.pdf">
              Naitzat et al.
            </a>{' '}
            as motivation, and extended their work to{' '}
            <a href="https://www.ijcai.org/proceedings/2022/0774.pdf">predictive coding networks</a>
            , a novel architecture that uses an alternative to backpropagation. */}
            {/* As part of my role, I designed and built an access control system for
            custom Gems (personalized Gemini instances) and streamlined the creation and secure
            sharing of these Gems across Google Workspace teams. Navigating the largest monorepo in
            the world was an invaluable experience, giving me deep exposure to large-scale C++
            development and complex system integration. */}
          </p>
          In my free time, I play guitar, listen to music, and go on bike rides. Recently I've been
          consumed by bluegrass music, and I'm trying to teach myself the mandolin — you wouldn't
          believe how hard it is to find a lefty one for a reasonable price! This semester I'm
          studying abroad in Edinburgh, Scotland, and having a fantastic time exploring the city and
          traveling around Europe.
          <p></p>
        </div>
      </StyledText>
    </StyledAboutSection>
  );
};

export default About;
