import {useState, useRef, useEffect} from "react";

const NestedComments = ({comments,deleteComment, addComment})=>{
    const [text, setText] = useState("");
    const wrapperRef=useRef(null);
    const [isOpen, setIsOpen]=useState({});

    useEffect(()=>{

        function handleClickOutside(e){
            if(!wrapperRef?.current?.contains(e.target)){
               setIsOpen({});
            }
        }


        document.addEventListener("click", handleClickOutside);

        return ()=>{
            document.removeEventListener("click", handleClickOutside);
        }
    },[]);


    function handleAddComment(id){
        //const text = prompt("Enter Text");

        if(!text || !text.trim())return;
        
        addComment(id,text.trim());
        setText("");
        setIsOpen({});
        
    }

    function handleDeleteComment(id){
        deleteComment(id);
    }
    

    return (
        <div>

            <div className="comment-container" ref={wrapperRef}>
                {comments?.map((node,index)=>(
                <div className="comment-node" key={node.id}>
                  {node.label}

                  <span className="review-container">
                    <span className="btn-container" onClick={()=> setIsOpen({[node?.id]:true})}><button className="btn-node">Reply</button></span>
                    <span className="img-container" onClick={()=> handleDeleteComment(node.id)}><img className="img-node" src="data:image/png;base64,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" alt="delete-icon"/></span>
                  </span>

                  {isOpen[node?.id] && (<div className="comment-node">
                    <input className="input-text" type="text" autoFocus={true} value={text} onChange={(e)=> setText(e.target.value)}/>
                    <span ><button className="btn-node" onClick={()=>handleAddComment(node?.id)}>Add Comment</button></span>
                  </div>)}

                  {node?.children?.length > 0 && <NestedComments comments={node.children} addComment={addComment} deleteComment={deleteComment}/>}
                </div>
                 ))}

                
            </div>
        </div>
    )

}


export default NestedComments;
