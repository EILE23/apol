import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
//뷰어
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
