import Link from "next/link";

const RecipeLink = ({ id, title }) => (
  <div>
    <Link as={`/recipe/${id}`} href={`/recipe?id=${id}`}>
      <a dangerouslySetInnerHTML={{ __html: title }} />
    </Link>
    <style jsx>{`
      a:hover {
        text-decoration: underline;
      }
    `}</style>
  </div>
);

export default RecipeLink;
