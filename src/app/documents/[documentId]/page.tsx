import { Editor } from "../../../components/editor/editor";
import { Toolbar } from "../../../components/editor/toolbar/toolbar";
import { Navbar } from "./navbar";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}
const documentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  console.log(documentId);
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Navbar />
      <Toolbar />
      <Editor />
    </div>
  );
};

export default documentIdPage;
