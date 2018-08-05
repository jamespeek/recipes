import Link from "next/link";

const RecipeLink = props => (
  <div>
    <Link as={`/recipe/${props.id}`} href={`/recipe?id=${props.id}`}>
      <a>{props.title}</a>
    </Link>
  </div>
);

export default RecipeLink;
