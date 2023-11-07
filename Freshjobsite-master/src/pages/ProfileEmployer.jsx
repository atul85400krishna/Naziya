import NavbarUser from "../components/NavbarUser";
import image from "../assets/images/man_image.png";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import defaultProfile from "../assets/images/default-profile-image.jpg";

const ProfileEmployer = () => {
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState();
  const { state } = useContext(AuthContext);

  const [dataObj, setDataObj] = useState({
    github_profile: "",
    name: "",
    description: "",
    url: "",
  });

  const handelUpdate = async () => {
    const formData = new FormData();

    formData.append("json", JSON.stringify(dataObj));

    try {
      const res = await API(
        "put",
        "/users/employer_update/",
        formData,
        state.token
      );
      toast.success("Profile Updated Successfully");
      getFormDetails();
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setDataObj({ ...dataObj, github_profile: file });
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setShowImage(imageUrl);
    }
  };
  return (
    <div>
      <NavbarUser />
      <main className="employer__profile-container">
        <h2>Profile</h2>
        {editMode ? (
          <div className="employer__profileModel">
            <div className="image_bl">
              <img
                src={showImage || state.profile || defaultProfile}
                width={155}
                height={155}
                alt=""
                className="image_sec-imagesec"
                style={{ position: "relative" }}
              />
              <label
                className="imageSecond"
                style={{
                  backgroundColor: "rgb(90,82,255)",
                  borderRadius: "100%",
                  padding: "5px",
                }}
              >
                <img src={camera} height={18} width={22} />
                <input
                  className="upload23"
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="employer__profile-infoModel">
              <div className="employer__profile-email">
                <div>Name</div>
                <input
                  placeholder="Please Enter name here"
                  onChange={(e) => {
                    setDataObj({ ...dataObj, name: e.target.value });
                  }}
                  value={state?.name}
                />
              </div>
              <div className="employer__profile-email">
                <div>Email</div>
                <input disabled={true} value={state?.email} />
              </div>
              <div className="employer__profile-email">
                <div> Company Description</div>
                <textarea
                  value={state?.description}
                  onChange={(e) => {
                    setDataObj({ ...dataObj, description: e.target.value });
                  }}
                />
              </div>
              <div className="employer__profile-email">
                <div>Url</div>
                <input
                  value={state?.url}
                  onChange={(e) => {
                    setDataObj({ ...dataObj, url: e.target.value });
                  }}
                />
              </div>

              <div className="employer__profile-email">
                {" "}
                <button
                  className="edit-btn"
                  style={{ width: "100%" }}
                  onClick={() => handelUpdate()}
                >
                  {" "}
                  Update profile
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="employer__profile">
            <div className="employer__profile_secondModel">
              <div>
                <img src={state?.profile || defaultProfile} alt="" />
              </div>
              <div className="employer__profile-info">
                <h3>{state?.name}</h3>
                <div className="employer__profile-email">
                  <div>Email</div>
                  <p>{state?.email}</p>
                </div>
              </div>
            </div>
            <div>
              {" "}
              <button
                className="edit-btn"
                style={{ justifyContent: "end" }}
                onClick={() => setEditMode(true)}
              >
                Edit profile
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfileEmployer;
