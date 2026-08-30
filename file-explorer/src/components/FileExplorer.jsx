import { useState, useEffect } from "react";

const FileExplorer = ({ data, addFileOrFolder, removeFileOrFolder }) => {
  //console.log(data);
  const [isExpanded, setIsExpanded] = useState({});

  function handleClick(id) {
    setIsExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleFileFolderClick(isFolder, id) {
    const text = prompt("Enter Text");

    if (text == "") return;

    addFileOrFolder(id, isFolder, text);
  }

  return (
    <div className="main-container">
      {data?.map((node, index) => (
        <div key={node?.id}>
          <span
            className="isFolder-container"
            onClick={() => handleClick(node?.id)}
          >
            {node?.isFolder == true ? (isExpanded[node?.id] ? "-" : "+") : ""}
          </span>

          <span>{node.name}</span>

          {node?.isFolder && (
            <span className="icon-container">
              <span onClick={() => handleFileFolderClick(true, node?.id)}>
                <img
                  src="https://thumbs.dreamstime.com/b/add-folder-thin-line-icon-add-folder-icon-100736188.jpg"
                  alt="add-folder-icon"
                  className="icon"
                />
              </span>

              <span onClick={() => handleFileFolderClick(false, node?.id)}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1091/1091916.png"
                  alt="add-file-icon"
                  className="icon"
                />
              </span>
            </span>
          )}

          {isExpanded[node?.id] && node?.children?.length && (
            <FileExplorer
              data={node.children}
              addFileOrFolder={addFileOrFolder}
              removeFileOrFolder={removeFileOrFolder}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FileExplorer;
