import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Heading, Card, Flex, Box } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/app/components";
const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
      <Flex className="space-x-3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
    </Box>
  );
};

export default LoadingIssueDetailPage;
