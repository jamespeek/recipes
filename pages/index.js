import { Component } from "react";
import Layout from "../components/Layout";
import RecipeLink from "../components/RecipeLink";
import TagLink from "../components/TagLink";

const api = "http://recipes.peek.ws/api";
const added = count => `${api}/recipes/added/${count}`;
const updated = count => `${api}/recipes/updated/${count}`;
const tags = `${api}/tags`;

const renderLinks = recipes =>
  recipes.map((recipe, i) => <RecipeLink key={i} {...recipe} />);

const renderTags = tags => {
  return Object.keys(tags).map((tag, i) => (
    <TagLink key={i} tag={tag} count={tags[tag]} />
  ));
};

const renderTagCategories = categories => {
  return Object.keys(categories).map((category, i) => {
    const tags = categories[category];
    return (
      <div key={i}>
        <h3>{category}</h3>
        <div>{renderTags(tags)}</div>
      </div>
    );
  });
};

class Page extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    const feeds = [tags, updated(10), added(10)];
    Promise.all(feeds.map(url => fetch(url)))
      .then(res => Promise.all(res.map(res => res.json())))
      .then(([tags, updated, added]) =>
        this.setState({ isLoading: false, tags, updated, added })
      );
  }
  render() {
    return <Layout>{this.renderContent()}</Layout>;
  }
  renderContent() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    console.log(this.state.tags);
    return (
      <div>
        <h2>Recently Added</h2>
        <div>{renderLinks(this.state.added)}</div>
        <h2>Recently Updated</h2>
        <div>{renderLinks(this.state.updated)}</div>
        <h2>Recipe Tags</h2>
        <div>{renderTagCategories(this.state.tags)}</div>
      </div>
    );
  }
}

export default Page;
