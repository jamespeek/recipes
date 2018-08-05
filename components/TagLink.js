import { Fragment } from "react";
import Link from "next/link";

const slugFromTag = title => title.split(" ").join("-");

const TagLink = ({ tag, count }) => (
  <Fragment>
    <Link as={`/tag/${slugFromTag(tag)}`} href={`/tag/?id=${tag}`}>
      <a>{tag.split(" ").join("\u00A0") + (count ? `\u00A0${count}` : "")}</a>
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
