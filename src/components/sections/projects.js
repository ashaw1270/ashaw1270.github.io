import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    width: 100%;
    position: relative;
    margin-top: 20px;
    display: grid;
    grid-gap: 25px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-gap: 20px;
    }
  }

  .projects-grid.single-paper {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
      max-width: 100%;
      margin-left: 0;
      margin-right: 0;
    }
  }

  .projects-grid.multiple-papers {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

    @media (min-width: 1200px) {
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .project-links {
    display: flex;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    gap: 0.5rem;

    a.button {
      ${({ theme }) => theme.mixins.button};
      flex: 1;
      text-align: center;
      &:first-child {
        margin-right: 0.75rem;
      }
    }
  }
`;

const StyledProject = styled.li`
  position: relative;
  width: 100%;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 2.5rem 2rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
    border: 1px solid var(--lightest-navy);
  }

  .project-title {
    margin: 0 0 15px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    line-height: 1.3;
    font-weight: 600;

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-authors {
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 400;
    line-height: 1.4;

    .author-label {
      color: var(--slate);
      margin-right: 8px;
    }
  }

  .project-venues {
    margin-bottom: 20px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 400;
    line-height: 1.5;

    .venue-label {
      color: var(--slate);
      margin-right: 8px;
    }

    ul {
      ${({ theme }) => theme.mixins.resetList};
      margin-top: 6px;
    }

    li {
      position: relative;
      padding-left: 18px;
      margin-bottom: 4px;

      &:before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--slate);
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      display: inline;
      white-space: normal;

      &:after {
        display: none;
      }

      &:hover,
      &:focus-visible {
        text-decoration: underline;
        text-decoration-color: var(--green);
        text-underline-offset: 0.2em;
        text-decoration-thickness: 1px;
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: 17px;
    line-height: 1.5;
    flex-grow: 1;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              authors
              paper
              code
              date
              venues {
                name
                url
                notes
              }
            }
            html
          }
        }
      }
    }
  `);

  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const projects = data.projects.edges.filter(({ node }) => node);
  const gridClass = projects.length === 1 ? 'single-paper' : 'multiple-papers';

  const projectInner = node => {
    const { frontmatter, html } = node;
    const { paper, code, title, authors, venues } = frontmatter;

    return (
      <div className="project-inner">
        <header>
          <h3 className="project-title">{title}</h3>

          <div className="project-links">
            <a className="button" href={paper} target="_blank" rel="noreferrer">
              Paper
            </a>

            <a className="button" href={code} target="_blank" rel="noreferrer">
              Code
            </a>
          </div>

          {authors && (
            <div className="project-authors">
              <span className="author-label">Authors:</span>
              {authors}
            </div>
          )}

          {venues?.length > 0 && (
            <div className="project-venues">
              {venues.length === 1 ? (
                <>
                  <span className="venue-label">Venue:</span>
                  {venues[0].url ? (
                    <a href={venues[0].url} target="_blank" rel="noreferrer">
                      {venues[0].name}
                    </a>
                  ) : (
                    <span>{venues[0].name}</span>
                  )}
                  {venues[0].notes && <span> ({venues[0].notes})</span>}
                </>
              ) : (
                <>
                  <span className="venue-label">Venues:</span>
                  <ul>
                    {venues.map((venue, i) => (
                      <li key={i}>
                        {venue.url ? (
                          <a href={venue.url} target="_blank" rel="noreferrer">
                            {venue.name}
                          </a>
                        ) : (
                          <span>{venue.name}</span>
                        )}
                        {venue.notes && <span> ({venue.notes})</span>}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
        </header>
      </div>
    );
  };

  return (
    <StyledProjectsSection id="papers">
      <h2 className="numbered-heading" ref={revealTitle}>
        Papers
      </h2>

      <ul className={`projects-grid ${gridClass}`}>
        {prefersReducedMotion ? (
          <>
            {projects &&
              projects.map(({ node }, i) => (
                <StyledProject key={i}>{projectInner(node)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projects &&
              projects.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledProject
                    key={i}
                    ref={el => (revealProjects.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    {projectInner(node)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>
    </StyledProjectsSection>
  );
};

export default Projects;
