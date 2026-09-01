import DocumentViewer from "@/components/viewer/DocumentViewer";
import Sidebar from "@/components/editor/Sidebar";

export default function Home() {
  return (
    <main className="flex h-screen overflow-hidden bg-black">
      <DocumentViewer />
      <Sidebar />
    </main>
  );
}