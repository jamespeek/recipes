import { Component } from "react";
import fetch from "isomorphic-unfetch";

import Layout from "../components/Layout";
import RecipeLink from "../components/RecipeLink";
import TagLink from "../components/TagLink";

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

Page.getInitialProps = async function() {
  const api = "http://recipes.peek.ws/api";
  const added = await fetch(`${api}/recipes/added/10`).then(res => res.json());
  const updated = await fetch(`${api}/recipes/updated/10`).then(res =>
    res.json()
  );
  const tags = await fetch(`${api}/tags`).then(res => res.json());

  return {
    added,
    updated,
    tags
  };
};

export default Page;
