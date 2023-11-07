import { useContext, useEffect, useState } from "react";
import NavbarUser from "../components/NavbarUser";
import { API, AuthContext } from "../context/AuthContext";
import "./styles/notifications.css";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
import defaultProfile from "../assets/images/default-profile-image.jpg";

const Notification = ({ data }) => {
  const output = 1;
  const date = (() => new Date(data?.created_at))(output).toLocaleString();

  return (
    <div className="notification">
      <img src={defaultProfile} alt="profile" />
      <div>
        <p>{data?.message}</p>
        <span>{date}</span>
      </div>
    </div>
  );
};

// data?.source_picture
//             ? BASE_URL + "/" + data?.source_picture
//             :

const Notifications = () => {
  const { state } = useContext(AuthContext);
  const [notifications, setNotifications] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getNotifications = async () => {
    try {
      const res = await API("get", "/users/notifications/", {}, state.token);
      console.log("notee", res);
      setNotifications(res?.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <>
      <NavbarUser />
      <div className="notifications__container">
        <h3>Notifications</h3>
        <main className="notifications">
          {isLoading ? (
            <div className="center">
              <div className="lds-ellipsis center bg-white">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : notifications?.length > 0 ? (
            notifications?.map((notification) => {
              return (
                <Notification data={notification} key={notification?.message} />
              );
            })
          ) : (
            <div>No new Notifications</div>
          )}
        </main>
      </div>
    </>
  );
};

export default Notifications;
