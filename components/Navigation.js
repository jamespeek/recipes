import { Component } from "react";
import Link from "next/link";

// http://recipes.peek.ws/api/recipes/search?q=waffles
// http://recipes.peek.ws/api/recipes/search/all?q=waffles

const Result = ({ id, title }) => (
  <div>
    <Link as={`/recipe/${id}`} href={`/recipe?id=${id}`}>
      <a dangerouslySetInnerHTML={{ __html: title }} />
    </Link>
    <style jsx>{`
      a {
        display: block;
        color: white;
        font-size: 14px;
        padding: 15px 20px;
        text-decoration: none;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        border-bottom: 1px solid #333;
      }
      a:hover {
        background: #333333;
      }
    `}</style>
  </div>
);

class Navigation extends Component {
  timeout = 0;
  state = {
    recipes: []
  };
  onChange = event => {
    const query = event.target.value;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.fetchQuery(query), 300);
  };
  fetchQuery(query) {
    fetch(`http://recipes.peek.ws/api/recipes/search/all?q=${query}`)
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }));
  }
  renderResults() {
    const { recipes } = this.state;
    return recipes.map(recipe => <Result {...recipe} />);
  }
  render() {
    return (
      <div className="navigation">
        <Link href="/">
          <a>Home</a>
        </Link>
        <input onChange={this.onChange} placeholder="Search..." />
        <div className="results">{this.renderResults()}</div>
        <style jsx>{`
          .navigation {
            display: flex;
            flex-direction: column;
            width: 300px;
            height: 100%;
            color: white;
            background: #222;
          }
          .results {
            flex: 1;
            padding: 15px 0px;
            overflow: scroll;
            height: 300px;
          }
          a {
            color: white;
            display: block;
            text-decoration: none;
            line-height: 60px;
            padding-left: 20px;
          }
          input {
            width: 100%;
            padding: 14px 20px;
            font-size: 14px;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    );
  }
}

export default Navigation;
