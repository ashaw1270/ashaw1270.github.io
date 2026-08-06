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
            Hello! My name is Adam, and I'm a senior at USC studying Applied Math and CS. My
            interest in machine learning began with the release of GPT-4 in the spring of my senior
            year of high school. I was amazed that a program was capable of so many things, but more
            than anything, I was in awe of the fact that{' '}
            <em>
              <strong>someone created this</strong>
            </em>
            . That curiosity quickly turned into a deeper interest in the theory behind these
            models—how they generalize, why they work, and what their limitations are. These days, I
            spend my time exploring the mathematical side of machine learning, most recently by
            designing learned preconditioners for lattice quantum chromodynamics.
          </p>
          <p>
            This past summer (2026), I conducted deep learning research at{' '}
            <a href="https://www.anl.gov/">Argonne National Laboratory</a> through the U.S.
            Department of Energy's SULI program, where I developed learned preconditioners for
            solving the Dirac equation in lattice quantum chromodynamics. I plan to submit this work
            to a workshop soon. During my junior year (2025–2026), I conducted research in
            topological deep learning with Professor Alvin Jin at USC, investigating how the
            topology of data (Betti numbers) evolves across successive layers of a deep neural
            network. That work was accepted to the 2026 Topology, Algebra, and Geometry in Data
            Science (TAG-DS) conference (to be published soon) and the ICML 2026 Workshop on
            Weight-Space Symmetries (non-archival); a preprint is available{' '}
            <a href="https://arxiv.org/abs/2608.02816">here</a>. In Summer 2025, I worked as an
            Associate Software Developer Intern at{' '}
            <a href="https://workspace.google.com/lp/solutions/ai/">Google</a> on the Workspace AI
            Platform team, which integrates Gemini into products such as Google Docs, Slides, and
            Gmail.
          </p>
          In my free time, I play guitar, listen to music, and go on bike rides. Recently I've been
          consumed by bluegrass music, and I'm trying to teach myself the mandolin — you wouldn't
          believe how hard it is to find a lefty one for a reasonable price! Last semester I was
          studying abroad in Edinburgh, Scotland, and I had a fantastic time exploring the city and
          traveling around Europe. And I'm back in LA now getting ready for my senior year at USC!
          <p></p>
        </div>
      </StyledText>
    </StyledAboutSection>
  );
};

export default About;
