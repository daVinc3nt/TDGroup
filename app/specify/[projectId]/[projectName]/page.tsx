"use client";

import BlogItem from "@/components/write/specify/blog";
import { useParams } from "next/navigation";

export default function Test() {
  const { projectId, projectName } = useParams();

  // Khi params chưa có, bạn có thể xử lý việc này bằng cách hiển thị loading hoặc xử lý khác
  if (!projectId || !projectName) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BlogItem
        project_id={projectId.toString()}
        fileName={projectName.toString()}
      />
    </div>
  );
}
