import React, { Component } from "react";
import "./App.css";
import { queryByAuthor } from "./Api";
import { connect } from "react-redux";
import { fetchBooksSuccess, search } from "./redux/rootReducer";

class App extends Component {
  state = {
    loadingStatus: "loading" // loading, loaded, failed
  };

  componentDidMount() {
    this._fetchData(this.props.searchTerm);
  }

  _fetchData = async searchTerm => {
    try {
      const response = await queryByAuthor(searchTerm);
      this.props.fetchBooksSuccess(response);
      if (response) {
        this.setState({ loadingStatus: "loaded" });
      }
    } catch (e) {
      console.error("failed to fetch");
      this.setState({ loadingStatus: "failed" });
    }
  };

  render() {
    return (
      <div className="App">
        {this._renderSearchBar()}
        {this.state.loadingStatus === "loading"
          ? this.state.loadingStatus
          : null}
        {this._renderBooks()}
        {this.state.loadingStatus === "failed" && this._renderErrorMessage()}
      </div>
    );
  }

  _handleSearchOnChange = event => {
    console.log(event.target.value);
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

  _renderErrorMessage() {
    return <div>Error in loading data</div>;
  }
}

// Step 3: Connect your component to redux state
const mapStateToProps = state => ({
  books: state.books,
  searchTerm: state.searchTerm
});

export default connect(
  mapStateToProps,
  { fetchBooksSuccess, search }
)(App);
