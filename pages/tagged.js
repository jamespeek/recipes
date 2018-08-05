import { withRouter } from "next/router";
import { Component } from "react";
import Layout from "../components/Layout";
import RecipeLink from "../components/RecipeLink";

class Page extends Component {
  state = {
    recipes: null
  };
  componentDidMount() {
    const { tag } = this.props.router.query;
    fetch(`http://recipes.peek.ws/api/tags/${tag}`)
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }));
  }
  render() {
    return <Layout>{this.renderContent()}</Layout>;
  }
  renderContent() {
    if (!this.state.recipes) {
      return <div>Loading...</div>;
    }
    const { tag } = this.props.router.query;
    return (
      <div>
        <h1>Recipes tagged with {tag}</h1>
        {this.state.recipes.map((recipe, i) => (
          <RecipeLink key={i} {...recipe} />
        ))}
      </div>
    );
  }
}

export default withRouter(Page);
