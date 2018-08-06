import { withRouter } from "next/router";
import { Component } from "react";

import Layout from "../components/Layout";
import RecipeLink from "../components/RecipeLink";

const tagFromId = id => id.split("-").join(" ");

const Page = ({ name, recipes }) => (
  <Layout>
    <div>
      <h1>Recipes tagged with {name}</h1>
      {recipes.map((recipe, i) => <RecipeLink key={i} {...recipe} />)}
    </div>
  </Layout>
);

Page.getInitialProps = async ({ req, query: { id } }) => {
  const api = req ? `${req.protocol}://${req.get("Host")}/api` : "/api";
  return await fetch(`${api}/tags/${id}`).then(res => res.json());
};

export default withRouter(Page);
