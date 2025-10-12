import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;
    width: 100%;
    max-width: 1000px;

    @media (max-width: 768px) {
      display: block;
    }
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const StyledHeroContent = styled.div`
  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

const StyledHeroPic = styled.div`
  position: relative;
  max-width: 300px;
  justify-self: end;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
    justify-self: center;
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

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Adam Shaw.</h2>;
  // const three = <h3 className="big-heading">I make data talk.</h3>;
  const four = (
    <>
      <p>
        I'm a junior at USC studying Applied Math and CS, concurrently pursuing a master's degree in
        Statistics. I am passionate about machine learning research and I hope to attend a PhD
        program to dive deeper into the field.
      </p>
      <p>
        I just wrapped up my time as an Associate Software Developer Intern at{' '}
        <a href="https://workspace.google.com/lp/solutions/ai/">Google</a>, where I worked on
        integrating Gemini into Workspace products (Docs, Sheets, etc.).
      </p>
    </>
  );
  const five = (
    <a className="email-link" href="/resume.pdf" target="_blank" rel="noreferrer">
      Check out my resume!
    </a>
  );
  const six = (
    <StyledHeroPic>
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
    </StyledHeroPic>
  );

  const textItems = [one, two, /*three,*/ four, five];
  const pictureItems = [six];

  return (
    <StyledHeroSection>
      <div className="inner">
        <StyledHeroContent>
          {prefersReducedMotion ? (
            <>
              {textItems.map((item, i) => (
                <div key={i}>{item}</div>
              ))}
            </>
          ) : (
            <TransitionGroup component={null}>
              {isMounted &&
                textItems.map((item, i) => (
                  <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                    <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          )}
        </StyledHeroContent>

        {prefersReducedMotion ? (
          <>
            {pictureItems.map((item, i) => (
              <div key={`pic-${i}`}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              pictureItems.map((item, i) => (
                <CSSTransition key={`pic-${i}`} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${textItems.length + i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
