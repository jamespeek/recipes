import Link from "next/link";

const RecipeLink = props => (
  <div>
    <Link href={`/recipe?id=${props.id}&title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </div>
);

export default RecipeLink;
