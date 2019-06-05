import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo'
import Pages from '../components/Page';
import withData from '../lib/withData';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps }
  }
  render() {
    const { Component, apollo, pageProps } = this.props;
    return(
      <Container>
        <ApolloProvider client={apollo}>
          <Pages>
            <Component {...pageProps }/>
          </Pages>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp);
