import { withRouter } from "next/router";
import { Component } from "react";
import fetch from "isomorphic-unfetch";

import Layout from "../components/Layout.js";
import TagLink from "../components/TagLink";

const renderTags = tags =>
  tags && tags.split(",").map((tag, i) => <TagLink key={i} tag={tag} />);

const Page = ({
  recipe: { title, name, added, tags, ingredients, method }
}) => {
  return (
    <Layout>
      <div>
        <h1>{title}</h1>
        <div>
          Added by {name} on {added}
        </div>
        <div>{renderTags(tags)}</div>
        <div dangerouslySetInnerHTML={{ __html: ingredients }} />
        <div dangerouslySetInnerHTML={{ __html: method }} />
      </div>
    </Layout>
  );
};

Page.getInitialProps = async function(context) {
  const { id } = context.query;
  const recipe = await fetch(`http://recipes.peek.ws/api/recipes/${id}`).then(
    res => res.json()
  );
  return { recipe };
};

export default withRouter(Page);
