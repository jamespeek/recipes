import { Fragment } from "react";
import Link from "next/link";

const TagLink = ({ id, name, recipes }) => (
  <Fragment>
    <Link as={`/tag/${id}`} href={`/tag/?id=${id}`}>
      <a>
        {name.split(" ").join("\u00A0") + (recipes ? `\u00A0${recipes}` : "")}
      </a>
    </Link>
    <style jsx>{`
      a {
        display: inline-block;
        background: lightblue;
        color: black;
        margin: 4px 2px;
        padding: 0px 8px;
        border-radius: 10px;
        whitespace: nowrap;
      }
    `}</style>
  </Fragment>
);

export default TagLink;
