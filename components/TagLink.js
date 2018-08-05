import Link from "next/link";

const slugFromTag = title => title.split(" ").join("-");

const TagLink = ({ tag, count }) => (
  <Link as={`/tag/${slugFromTag(tag)}`} href={`/tag/?id=${tag}`}>
    <a
      style={{
        display: "inline-block",
        background: "lightblue",
        textDecoration: "none",
        color: "black",
        marginTop: 4,
        marginLeft: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 10,
        whiteSpace: "nowrap"
      }}
    >
      {tag.split(" ").join("\u00A0") + (count ? `\u00A0${count}` : "")}
    </a>
  </Link>
);

export default TagLink;
