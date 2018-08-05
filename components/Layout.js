import Navigation from "./Navigation";

const Layout = props => (
  <div className="layout">
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
      a:hover {
        color: black;
        text-decoration: underline;
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
