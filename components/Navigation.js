import { Component } from "react";
import Link from "next/link";
import Router from "next/router";

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
    loading: false,
    recipes: []
  };
  onChange = ({ target: { value } }) => {
    this.setState({ loading: true });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.fetchQuery(value), 300);
  };
  onKeyPress = ({ key }) => {
    if (key === "Enter") {
      if (this.state.recipes.length) {
        const first = this.state.recipes[0];
        const url = "/recipe/" + first.id;
        Router.push(url);
      }
      console.log("load first result!");
    }
  };
  fetchQuery(query) {
    const api = process.env.API;
    this.setState({ loading: true });
    fetch(`${api}/recipes/search/all?q=${query}`)
      .then(res => res.json())
      .then(recipes => this.setState({ loading: false, recipes }));
  }
  renderRecipes(recipes) {
    return recipes.map((recipe, i) => <Result key={i} {...recipe} />);
  }
  render() {
    let results = null;
    if (this.state.loading) results = <Spinner>Loading...</Spinner>;
    else if (this.state.recipes)
      results = this.renderRecipes(this.state.recipes);
    return (
      <div className="navigation">
        <Link href="/">
          <a>Home</a>
        </Link>
        <input
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          placeholder="Search..."
        />
        <div className="results">{results}</div>
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

const Spinner = props => (
  <div>
    {props.children}
    <style jsx>{`
      div {
        padding: 15px 20px;
        font-size: 14px;
        padding: 15px 20px;
      }
    `}</style>
  </div>
);

export default Navigation;
