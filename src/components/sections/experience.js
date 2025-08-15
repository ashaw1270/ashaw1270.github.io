import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledExperienceSection = styled.section`
  max-width: 700px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledToggleContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const StyledToggleButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 12px 20px;
  margin: 0;
  border: 1px solid var(--green);
  border-radius: 0;
  background-color: ${({ isActive }) => (isActive ? 'var(--green)' : 'transparent')};
  color: ${({ isActive }) => (isActive ? 'var(--navy)' : 'var(--green)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:first-child {
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    border-right: 0.5px solid var(--green);
  }

  &:last-child {
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    border-left: 0.5px solid var(--green);
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: var(--fz-xxs);
  }

  &:hover,
  &:focus {
    background-color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--green-tint)')};
    color: ${({ isActive }) => (isActive ? 'var(--navy)' : 'var(--green)')};
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--green);
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const Experience = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
      research: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/research/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              professor
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const [experienceType, setExperienceType] = useState('jobs'); // 'jobs' or 'research'
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Get current data based on experience type
  const currentData = experienceType === 'jobs' ? data.jobs.edges : data.research.edges;

  // Reset active tab when switching experience type
  useEffect(() => {
    setActiveTabId(0);
    setTabFocus(null);
  }, [experienceType]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledExperienceSection id="experience" ref={revealContainer}>
      <h2 className="numbered-heading">Experience</h2>

      <StyledToggleContainer>
        <StyledToggleButton
          isActive={experienceType === 'jobs'}
          onClick={() => setExperienceType('jobs')}>
          Work
        </StyledToggleButton>
        <StyledToggleButton
          isActive={experienceType === 'research'}
          onClick={() => setExperienceType('research')}>
          Research
        </StyledToggleButton>
      </StyledToggleContainer>

      <div className="inner">
        <StyledTabList
          role="tablist"
          aria-label={`${experienceType} tabs`}
          onKeyDown={e => onKeyDown(e)}>
          {currentData &&
            currentData.map(({ node }, i) => {
              const { company } = node.frontmatter;
              const displayName =
                experienceType === 'research' ? node.frontmatter.professor || company : company;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{displayName}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {currentData &&
            currentData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, url, company, range } = frontmatter;
              const isResearch = experienceType === 'research';
              const professor = frontmatter.professor;
              const displayName = isResearch ? professor || company : company;

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <h3>
                      <span>{title}</span>
                      {isResearch ? (
                        <>
                          &nbsp;with&nbsp;
                          <span className="company">
                            {url ? (
                              <a href={url} className="inline-link">
                                {displayName}
                              </a>
                            ) : (
                              displayName
                            )}
                          </span>
                        </>
                      ) : (
                        <span className="company">
                          &nbsp;@&nbsp;
                          <a href={url} className="inline-link">
                            {company}
                          </a>
                        </span>
                      )}
                    </h3>

                    <p className="range">{range}</p>

                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledExperienceSection>
  );
};

export default Experience;
