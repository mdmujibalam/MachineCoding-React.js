import React, { useMemo, useCallback } from "react";

const CheckBox = ({ data, checked, setChecked, parentMap }) => {
  const handleCheck = useCallback(
    (e, node) => {
      setChecked((prev) => {
        let newChecked = { ...prev };
        newChecked = { ...prev, [node.id]: e.target.checked };

        //Update all descendants/childrn
        const updateChildren = (node) => {
          node.children?.forEach((child) => {
            newChecked[child.id] = e.target.checked;
            child.children && updateChildren(child);
          });
        };

        // Update all ancestors/parents
        //   const updateParents = (node) => {
        //     const parentNode = parentMap.get(node.id);
        //     if (!parentNode) return;
        //     const allChildrenChecked = parentNode.children.every(
        //       (child) => newChecked[child.id]
        //     );
        //     newChecked[parentNode.id] = allChildrenChecked;
        //     updateParents(parentNode);
        //   };

        const updateParents = (node) => {
          if (!node) return;

          const allChildrenChecked = node.children.every(
            (child) => newChecked[child.id],
          );
          
          newChecked[node.id] = allChildrenChecked;

          const grandParent = parentMap.get(node.id);
          updateParents(grandParent);
        };

        updateChildren(node);
        updateParents(parentMap.get(node.id));
        return newChecked;
      });
    },
    [checked, setChecked],
  );

  return (
    <div>
      {data.map((node, index) => {
        return (
          <div className="checkbox-item" key={node.id}>
            <input
              type="checkbox"
              name={node.label}
              id={node.id}
              checked={checked[node?.id] || false}
              onChange={(e) => handleCheck(e, node)}
            />
            <span> {node.label}</span>

            {node.children && (
              <CheckBox
                data={node.children}
                checked={checked}
                setChecked={setChecked}
                parentMap={parentMap}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckBox;
