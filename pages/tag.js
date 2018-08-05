import { withRouter } from "next/router";
import { Component } from "react";

import Layout from "../components/Layout";
import RecipeLink from "../components/RecipeLink";

const tagFromId = id => id.split("-").join(" ");

const Page = ({ tag, recipes }) => (
  <Layout>
    <div>
      <h1>Recipes tagged with {tag}</h1>
      {recipes.map((recipe, i) => <RecipeLink key={i} {...recipe} />)}
    </div>
  </Layout>
);

Page.getInitialProps = async function(context) {
  const tag = tagFromId(context.query.id);
  const recipes = await fetch(`http://recipes.peek.ws/api/tags/${tag}`).then(
    res => res.json()
  );
  return { tag, recipes };
};

export default withRouter(Page);
