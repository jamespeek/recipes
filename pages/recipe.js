import { withRouter } from "next/router";
import { Component } from "react";
import Layout from "../components/Layout.js";
import TagLink from "../components/TagLink";

class Page extends Component {
  state = {
    recipe: null
  };
  componentDidMount() {
    const id = this.props.router.query.id;
    fetch(`http://recipes.peek.ws/api/recipes/${id}`)
      .then(res => res.json())
      .then(recipe => this.setState({ recipe }));
  }
  render() {
    return (
      <Layout>
        <h1>{this.props.router.query.title}</h1>
        {this.renderContent()}
      </Layout>
    );
  }
  renderContent() {
    if (!this.state.recipe) return <div>Loading...</div>;
    const recipe = this.state.recipe[0];
    return (
      <div>
        <div>
          Added by {recipe.email} on {recipe.added}
        </div>
        <div>
          Tags:{" "}
          {recipe.tags
            .split(",")
            .map((tag, i) => <TagLink key={i} tag={tag} />)}
        </div>
        <div dangerouslySetInnerHTML={{ __html: recipe.ingredients }} />
        <div dangerouslySetInnerHTML={{ __html: recipe.method }} />
      </div>
    );
  }
}

export default withRouter(Page);
