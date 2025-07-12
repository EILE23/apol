import Badge from "../ui/Badge";

export default function ProjectTagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {tags.map((tag) => (
        <Badge key={tag} variant="default" size="sm">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
