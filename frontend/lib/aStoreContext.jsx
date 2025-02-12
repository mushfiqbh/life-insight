import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [userInfoList, setUserInfoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catalog, setCatalog] = useState([]);
  const [posts, setPosts] = useState([]);
  const [nonLabeledPosts, setNonLabeledPosts] = useState([]);

  const updateNonLabeledPosts = () => {
    const labelList = catalog.map((item) => item.label);
    const otherPosts = posts.filter((item) => !labelList.includes(item.label));
    setNonLabeledPosts(otherPosts);
  };

  const updateUserInfoByOwner = async (targetId, data) => {
    if (userInfo.permission.includes("ownership")) {
      const response = await axios.put(
        url + "/api/user/update/" + targetId,
        data,
        { headers: { token } }
      );

      if (response.status === 200) {
        const update = userInfoList.map((user) => {
          if (user._id === targetId) {
            return { ...user, permission: data.permission };
          } else {
            return user;
          }
        });
        setUserInfoList(update);
      } else {
        console.log(response.error);
      }
    }
  };

  const contextValue = {
    loading,
    setLoading,
    catalog,
    setCatalog,
    deleteCatalog,
    nonLabeledPosts,
    updateUserInfoByOwner,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
