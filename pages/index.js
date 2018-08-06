import { Component } from "react";
import fetch from "isomorphic-unfetch";

import Layout from "../components/Layout";
import RecipeLink from "../components/RecipeLink";
import TagLink from "../components/TagLink";

const renderLinks = recipes =>
  recipes.map((recipe, i) => <RecipeLink key={i} {...recipe} />);

const renderTags = tags => {
  return Object.values(tags).map((tag, i) => <TagLink key={i} {...tag} />);
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

const Page = ({ added, updated, tags }) => (
  <Layout>
    <h2>Recently Added</h2>
    <div>{renderLinks(added)}</div>
    <h2>Recently Updated</h2>
    <div>{renderLinks(updated)}</div>
    <h2>Recipe Tags</h2>
    <div>{renderTagCategories(tags)}</div>
  </Layout>
);

Page.getInitialProps = async ({ req }) => {
  const api = process.env.API;
  const urls = ["recipes/added/10", "recipes/updated/10", "tags"];
  const reqs = urls.map(url => fetch(`${api}/${url}`).then(res => res.json()));
  const [added, updated, tags] = await Promise.all(reqs);
  return {
    added,
    updated,
    tags
  };
};

export default Page;
