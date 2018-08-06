import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";

import Navigation from "./Navigation";

Router.onRouteChangeStart = url => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Layout = props => (
  <div className="layout">
    <Head>
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    </Head>
    <Navigation />
    <div className="content">{props.children}</div>
    <style jsx global>{`
      html,
      body,
      #__next {
        margin: 0px;
        font-family: sans-serif;
        height: 100%;
      }
      a {
        color: black;
        text-decoration: none;
      }
    `}</style>
    <style jsx>{`
      .layout {
        height: 100%;
        display: grid;
        grid-template-columns: 300px auto;
      }
      .content {
        padding: 40px;
        overflow: scroll;
      }
    `}</style>
  </div>
);

export default Layout;
