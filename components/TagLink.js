import Link from "next/link";

const TagLink = props => (
  <Link href={`/tagged?tag=${props.tag}`}>
    <a
      style={{
        background: "lightblue",
        textDecoration: "none",
        color: "black",
        marginLeft: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 10
      }}
    >
      {"" + props.tag + (props.count ? ` (${props.count})` : "")}
    </a>
  </Link>
);

export default TagLink;
