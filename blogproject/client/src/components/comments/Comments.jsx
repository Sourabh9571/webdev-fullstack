import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/AuthContextProvider";
import { useQuery } from "@tanstack/react-query";
import { makerequest } from "../../../postrequest";
import moment from "moment";

const Comments = ({ postid }) => {
  const queryfun = () => {
    // Return the promise returned by makerequest.get()
    return makerequest
      .get("/comments?postid=" + postid)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        throw error; // Throw the error to be handled by React Query
      });
  };
  const { isLoading, error, data } = useQuery(
    {
      queryKey: ["comments"],
      queryFn: queryfun,
    }
    //  () => {
    // Return the promise returned by makerequest.get()
    // return makerequest
    //   .get("/comments?postid=" + postid)
    //   .then((res) => {
    //     return res.data;
    //   })
    //   .catch((error) => {
    //     throw error; // Throw the error to be handled by React Query
    //   });
    // }
  );
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilepic} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>

      {isloading
        ? "loading"
        : data.map((comment) => (
            <div className="comment">
              <img src={comment.profilepic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.description}</p>
              </div>
              <span className="date">
                {moment(comment.createdat).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
