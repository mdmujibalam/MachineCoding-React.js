import { useState } from "react";
import NestedComments from "./components/NestedComments.jsx";
import commentsData from "./constants/data.jsx";
import "./App.css";

export default function App() {
  const [comments, setComments] = useState(commentsData);

  function deleteComment(id) {
    const updateDeleteComment = (data) => {
      return data
        ?.filter((node) => node?.id !== id)
        ?.map((currNode) => {
          if (currNode?.children?.length > 0) {
            return {
              ...currNode,
              children: updateDeleteComment(currNode?.children),
            };
          } else {
            return currNode;
          }
        });
    };

    setComments((prev) => updateDeleteComment(prev));
  }

  function addComment(id, text) {
    const updateComment = (data) => {
      return data?.map((node) => {
        if (node.id === id) {
          const newId = Date.now();
          const newNode = {
            id: newId,
            label: text,
          };
          return { ...node, children: [...(node?.children || []), newNode] };
        } else if (node?.children?.length > 0) {
          return { ...node, children: updateComment(node?.children) };
        } else {
          return node;
        }
      });
    };

    setComments((prev) => updateComment(prev));
  }

  return (
    <div>
      <NestedComments
        comments={comments}
        addComment={addComment}
        deleteComment={deleteComment}
      />
    </div>
  );
}
