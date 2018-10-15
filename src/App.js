import React, { Component } from "react";
import "./App.css";
import { queryByAuthor } from "./Api";
import { connect } from "react-redux";
import { fetchBooksSuccess, search } from "./redux/rootReducer";

class App extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this._fetchData(this.props.searchTerm);
  }

  _fetchData = async searchTerm => {
    try {
      const response = await queryByAuthor(searchTerm);
      this.props.fetchBooksSuccess(response);
      if (response) {
        this.setState({ isLoading: false });
      }
    } catch (e) {
      console.error("failed to fetch");
    }
  };

  render() {
    return (
      <div className="App">
        {this._renderSearchBar()}
        {this.state.isLoading ? "loading..." : this._renderBooks()}
      </div>
    );
  }

  _handleSearchOnChange = event => {
    const searchTerm = event.target.value.toLowerCase();
    this.props.search(searchTerm);
    this._fetchData(searchTerm);
  };

  _renderSearchBar() {
    return (
      <div>
        Search Author:{" "}
        <input
          type="text"
          value={this.props.searchTerm}
          onChange={this._handleSearchOnChange}
        />
      </div>
    );
  }

  _renderBooks() {
    const { books } = this.props;
    let booksWithTitles = [];
    if (books) {
      booksWithTitles = books.map(book => book.volumeInfo.title.toLowerCase());
    }

    return (
      <ul>
        {booksWithTitles.map((title, index) => {
          return <li key={index}>{title}</li>;
        })}
      </ul>
    );
  }
}

// Step 3: Connect your component to redux state
const mapStateToProps = state => ({
  books: state.books,
  searchTerm: state.searchTerm
});

export default connect(
  mapStateToProps,
  { fetchBooksSuccess, search } // mapDispatchToProps
)(App);
