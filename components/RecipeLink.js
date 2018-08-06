import Link from "next/link";

const RecipeLink = props => (
  <div>
    <Link as={`/recipe/${props.id}`} href={`/recipe?id=${props.id}`}>
      <a dangerouslySetInnerHTML={{ __html: props.title }} />
    </Link>
    <style jsx>{`
      a:hover {
        text-decoration: underline;
      }
    `}</style>
  </div>
);

export default RecipeLink;
