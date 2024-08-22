import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function WorkspaceCard({
  image,
  name,
  emoji,
  workspaceId,
}: {
  image: string;
  name?: string;
  emoji?: string;
  workspaceId?: string;
}) {
  return (
    <Link href={`/Workspace/${workspaceId}`}>
      <Card className="shadow-2xl hover:scale-110 transition-all">
        <CardContent className="overflow-hidden rounded-t-md">
          <Image className="w-full object-cover" width={512} height={512} src={image} alt="Image" />
        </CardContent>
        <CardFooter className="px-2 mt-3">
          <h1 className="text-xl">{emoji} {name}</h1>
        </CardFooter>
      </Card>
    </Link>
  );
}
