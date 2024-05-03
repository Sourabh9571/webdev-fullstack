import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import {
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { makerequest } from "../../../postrequest";

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const descref = useRef("");
  const [image, setimage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimage(file);
    }
  };

  const queryClient = useQueryClient();

  function mutationfun(newPost) {
    return makerequest.post("/posts", newPost);
  }
  const mutation = useMutation({
    mutationFn: mutationfun,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleShareClick = async (e) => {
    e.preventDefault();
    let imageurl = "";
    if (image) imageurl = await upload();
    const desc = descref.current.value;
    mutation.mutate({ desc, image: imageurl });
    setimage(null);
  };

  const upload = async () => {
    try {
      const formdata = new FormData();
      formdata.append("file", image);
      const res = await makerequest.post("/upload", formdata);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilepic} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              ref={descref}
            />
          </div>
          <div className="right">
            {image && (
              <img className="file" alt="" src={URL.createObjectURL(image)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              // style={{""}}
              onChange={handleFileChange}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleShareClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
