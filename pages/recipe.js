import { withRouter } from "next/router";
import { Component } from "react";
import fetch from "isomorphic-unfetch";

import Layout from "../components/Layout.js";
import TagLink from "../components/TagLink";

const renderTags = tags => tags.map((tag, i) => <TagLink key={i} {...tag} />);

const parse = html => {
  const p = /<p>(.+?)<\/p>/gi;
  const matches = html.match(p);
  console.log(matches.map(line => line.substring(3, line.length - 4)));
};

const Page = ({ title, name, added, tags, ingredients, method }) => {
  // parse(ingredients);
  return (
    <Layout>
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
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

Page.getInitialProps = async ({ req, query: { id } }) => {
  const api = req ? `${req.protocol}://${req.get("Host")}/api` : "/api";
  return await fetch(`${api}/recipes/${id}`).then(res => res.json());
};

export default withRouter(Page);
