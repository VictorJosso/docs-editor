import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";

interface DocumentIdPageProps {
  params: Promise<{ documentId: Id<"documents"> }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Failed to get token");
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    {
      id: documentId,
    },
    { token }
  );

  //if (!preloadedDocument) {
  //  throw new Error("Failed to preload document");
  //}

  return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentIdPage;
