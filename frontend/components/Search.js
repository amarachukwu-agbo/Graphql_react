import React, { Component } from 'react';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import DownShift from 'downshift';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { ApolloConsumer } from 'react-apollo';
import Router from 'next/router';


const SEARCH_TERM_QUERY = gql`
  query SEARCH_TERM_QUERY($searchTerm: String!) {
    items(where: {
      OR: [{
        title_contains: $searchTerm
      }, { description_contains: $searchTerm }]
    }) {
      id
      title
      image
    }
  }
`;

const routeToItem = (item) => {
  console.log(item)
  Router.push({
    pathname: '/item',
    query: {
      id: item.id
    }
  });
}

export default class Search extends Component {
  state = {
    searchTerm: '',
    searchResults: [],
    loading: true
  }

  onChange = debounce(async (e, client) => {
    this.setState({
      loading: true
    });
    const res = await client.query({
      query: SEARCH_TERM_QUERY,
      variables: {searchTerm: e.target.value }
    });
    this.setState({
      searchResults: res.data.items,
      loading: false
    });
  }, 350)
  render() {
    const { loading, searchResults } = this.state;
    return (
      <SearchStyles>
          <DownShift onChange={item => routeToItem(item)}
            itemToString={item => item === null ? '': item.title}>
            {({
              getInputProps,
              getItemProps,
              isOpen,
              inputValue,
              highlightedIndex,
            }) => (
              <div>
              <ApolloConsumer>
                {(client) => (
                  <input
                    {...getInputProps({
                      type: "search",
                      placeholder: "Search for an item",
                      className: loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client)}
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (<DropDown>
                {
                  this.state.searchResults.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={highlightedIndex === index}
                    >
                      <img width="50" src={item.image} alt={item.title}/>
                      {item.title}
                    </DropDownItem>
                  ))
                }
              </DropDown>)}
              { !loading && !searchResults.length && <DropDownItem>
                No item was found for {inputValue}
              </DropDownItem>}
              </div>
            )}
          </DownShift>
      </SearchStyles>
    )
  }
}
