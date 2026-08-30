import { useState, useEffect } from "react";
import jsonData from "./utils/data.json";
import FileExplorer from "./components/FileExplorer";
import "./App.css";

function App() {
  const [fileData, setFileData] = useState(jsonData);

  function addFileOrFolder(id, isFolder, name) {
    function updateData(data) {
      return data?.map((node, index) => {
        if (node?.id == id && node?.isFolder) {
          const newId = Date.now();

          return {
            ...node,
            children: [
              ...(node.children || []),
              {
                id: newId,
                name,
                isFolder,
              },
            ],
          };
        } else if (node?.children?.length) {
          return { ...node, children: updateData(node?.children) };
        } else {
          return node;
        }
      });
    }

    setFileData((prev) => updateData(prev));
  }

  function removeFileOrFolder(id) {
    function updateData(data) {}

    setFileData((prev) => updateData(prev));
  }

  return (
    <div className="App">
      <FileExplorer
        data={fileData}
        addFileOrFolder={addFileOrFolder}
        removeFileOrFolder={removeFileOrFolder}
      />
    </div>
  );
}

export default App;
