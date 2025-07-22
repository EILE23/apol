import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

export default function ToastViewer({ markdown }: { markdown: string }) {
  return (
    <Viewer
      initialValue={markdown}
      theme="dark"
      height="auto"
      usageStatistics={false}
    />
  );
}
