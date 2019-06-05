import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import Header from './Header';
import Meta from './Meta';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

Router.onRouteChangeStart = ()  => {
  NProgress.start();
}

Router.onRouteChangeComplete = ()  => {
  NProgress.done();
}

Router.onRouteChangeError = ()  => {
  NProgress.done();
}

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offwhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

const StyledPage = styled.div`
  background: white;
  color: ${ props => props.theme.black };
`;

const Inner = styled.div`
  max-width: ${ props => props.theme.maxWidth };
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
  @font-face {
    font-family: 'radnikanext';
    src: url('/static/radnikanext-medium-webfont')
    format('woff2');
    font-weight: normal;
  }
  html {
    font-size: 10px;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-size: 1.5rem;
    font-family: 'radnikanext';
    padding: 0;
    margin: 0;
    line-height: 2;
    a {
      text-decoration: none;
      color: ${theme.black};
    }
  }
`;

const Page = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Meta />
        <Header />
        <Inner>
          { children }
        </Inner>
      </StyledPage>
    </ThemeProvider>
  );
};

export default Page;
