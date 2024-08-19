import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  //if (typeof params.id !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  await delay(1000);
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.CreatedAt.toDateString()}</Text>
      </Flex>
    </div>
  );
};

export default IssueDetailPage;
