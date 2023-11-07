import suitcase from "../assets/icons/suitcase.svg";
import payment from "../assets/icons/payment.svg";
import locationIcon from "../assets/icons/location.svg";
import { useNavigate } from "react-router-dom";
import "./styles/postjob.css";
import NavbarUser from "./../components/NavbarUser";
import {
  RadioGroup,
  Box,
  FormControlLabel,
  Stack,
  TextField,
  Radio,
  Autocomplete,
} from "@mui/material";
import MultipleTags from "../components/MultipleTags";
import Dropdown from "../components/Dropdown";
import { useFormik } from "formik";
import { postJobSchema } from "../validation/formSchema";
import { API, AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const CardInfo = ({ data, image }) => {
  return (
    <div>
      <div className="job-card job-card--card-info">
        <div className="job-card__logo">
          <img src={image} alt="" />
        </div>
        <div className="job-card__info">
          <div className="card-info__top">
            <h3>{data?.title || "Job Title here"}</h3>
          </div>
          <div className="card-info__middle">
            <div className="card-middle__company-info">
              <span className="company-info__name">
                {data?.company_name || "United Health Group"}
              </span>
              {/* <span className="company-info__time">2 days ago</span> */}
            </div>
            <div className="card-middle__job-info">
              <span className="company-info__location">
                <img src={locationIcon} alt="location" />
                <p>{data?.location || "Job country here"}</p>
              </span>
              <span className="company-info__location company-info__work">
                <img src={suitcase} alt="work" />
                <p>
                  Work :{" "}
                  {data?.worktype +
                    `${data?.worktype && data?.emptype && ", "}` +
                    data?.emptype || "Location Type here"}
                </p>
              </span>
              <span className="company-info__location company-info__salary">
                <img src={payment} alt="salary" />
                <p>
                  {(data?.minsalary &&
                    data?.maxsalary &&
                    `$${data?.minsalary}-${data?.maxsalary} per ${
                      data?.salarytype === "Monthly" ? "month" : "year"
                    }`) ||
                    "Job salary here"}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardDescription = ({ data }) => {
  return (
    <div className="job-description">
      <h3>Job Description:</h3>
      <p>{data?.job_desc || "Job description here"}</p>
      <h3>Required Skills:</h3>
      <ul className="card-bottom__list">
        {data?.skills && data?.skills?.length > 0
          ? data?.skills.map((skill) => <li>{skill}</li>)
          : "Required skills here"}
      </ul>
      <h3>Key Responsibilities:</h3>
      <ul>
        {data?.responsibilities
          ?.split(/\r?\n/)
          ?.filter((item) => item.trim() !== "").length > 0
          ? data?.responsibilities
              ?.split(/\r?\n/)
              ?.filter((item) => item.trim() !== "")
              ?.map((item) => <li key={item}>{item}</li>)
          : "Job responsibilities here"}
      </ul>
      <h3>Salary and Benefit:</h3>
      <ul>
        {data?.benifits?.split(/\r?\n/)?.filter((item) => item.trim() !== "")
          .length > 0
          ? data?.benifits
              ?.split(/\r?\n/)
              ?.filter((item) => item.trim() !== "")
              ?.map((item) => <li>{item}</li>)
          : "Job benefits here"}
      </ul>
    </div>
  );
};

const initialValues = {
  title: "",
  job_desc: "",
  emptype: "Full time",
  location: "",
  worktype: "",
  responsibilities: "",
  benifits: "",
  minsalary: "",
  maxsalary: "",
  salarytype: "Monthly",
  skills: [],
};

const PostJob = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useContext(AuthContext);
  const [showImage, setShowImage] = useState();
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: postJobSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        setIsLoading(true);
        const payload = {
          title: values.title,
          job_desc: values.job_desc,
          emptype: values.emptype,
          location: values.location,
          worktype: values.worktype,
          responsibilities: values.responsibilities,
          benifits: values.benifits,
          salarytype: values.salarytype,
          salary: `$${values.minsalary}-${values.maxsalary}`,
          skills: JSON.stringify(values.skills),
        };
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("job_desc", values.job_desc);
        formData.append("emptype", values.emptype);
        formData.append("location", values.location);
        formData.append("worktype", values.worktype);
        formData.append("company_name", values.company_name);
        formData.append("responsibilities", values.responsibilities);
        formData.append("benifits", values.benifits);
        formData.append("salarytype", values.salarytype);
        formData.append("salary", `$${values.minsalary}-${values.maxsalary}`);
        formData.append("skills", JSON.stringify(values.skills));
        formData.append("source_picture", image);
        const res = await API("post", "users/jobpost/", formData, state.token);
        console.log(res);
        toast.success("Job posted successfully");
        navigate("/jobs");
      } catch (error) {
        console.log("error", error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
      }
      setIsLoading(false);
    },
  });

  return (
    <>
      <NavbarUser />
      <main className="post-job__container">
        <section className="post-job__inputs">
          <div className="post-job__form-container">
            <h1 className="job-post__title">Create a Job Post</h1>
            <p className="job-post__autopost">
              To busy to complete the form? Send an email to
              contact@justremote.co with a link or attachment of your listing
              and we'll post it for you!
            </p>
            <form onSubmit={handleSubmit}>
              <TextField
                error={errors.title}
                helperText={errors.title}
                onBlur={handleBlur}
                name="title"
                onChange={handleChange}
                value={values.title}
                type="text"
                label="Job title"
                sx={{ fontSize: 6, width: "100%", marginBottom: 2 }}
              />
              <TextField
                error={errors.company_name}
                helperText={errors.company_name}
                onBlur={handleBlur}
                name="company_name"
                onChange={handleChange}
                value={values.company_name}
                type="text"
                label="Company name"
                sx={{ fontSize: 6, width: "100%" }}
              />
              <TextField
                error={errors.job_desc}
                helperText={errors.job_desc}
                name="job_desc"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.job_desc}
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={5}
                sx={{
                  marginBottom: 2,
                  marginTop: 2,
                  width: "100%",
                  fontSize: 6,
                }}
              />
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={[
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "React.js",
                    "Angular.js",
                    "Nextjs13",
                    "Material UI",
                  ]}
                  value={values.skills}
                  onChange={(event, newValue) =>
                    setFieldValue("skills", newValue)
                  }
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Skills"
                      placeholder="skills"
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />
              </Stack>
              <Dropdown
                label="Employment Type"
                name="emptype"
                value={values.emptype}
                handleChange={(data) =>
                  setFieldValue("emptype", data ? data : "")
                }
                options={["Full time", "Part time"]}
              />
              <Dropdown
                label="Location"
                handleChange={(data) =>
                  setFieldValue("location", data ? data : "")
                }
                options={["Canada", "Ireland", "UK", "USA"]}
              />
              <Dropdown
                label="Location Type"
                handleChange={(data) =>
                  setFieldValue("worktype", data ? data : "")
                }
                options={["Remote", "Onsite", "Inoffice"]}
              />
              <TextField
                name="responsibilities"
                onChange={handleChange}
                value={values.responsibilities}
                id="outlined-multiline-static"
                label="Key Responsibilities"
                multiline
                rows={5}
                sx={{
                  marginTop: 2,
                  width: "100%",
                  fontSize: 6,
                }}
              />
              <TextField
                name="benifits"
                onChange={handleChange}
                value={values.benifits}
                id="outlined-multiline-static"
                label="Benefits"
                multiline
                rows={5}
                sx={{
                  marginBottom: 2,
                  marginTop: 2,
                  width: "100%",
                  fontSize: 6,
                }}
              />
              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              >
                <TextField
                  // error={error}
                  // helperText={error}
                  name="minsalary"
                  onChange={handleChange}
                  value={values.minsalary}
                  type="text"
                  label="Min salary"
                  sx={{ fontSize: 6, width: "100%" }}
                />
                <TextField
                  // error={error}
                  // helperText={error}
                  name="maxsalary"
                  onChange={handleChange}
                  value={values.maxsalary}
                  type="text"
                  label="Max salary"
                  sx={{ fontSize: 6, width: "100%" }}
                />
              </Box>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="salarytype"
                value={values.salarytype}
                onChange={handleChange}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                }}
              >
                <FormControlLabel
                  value="Monthly"
                  control={<Radio />}
                  label="Monthly"
                />
                <FormControlLabel
                  value="Yearly"
                  control={<Radio />}
                  label="Yearly"
                />
              </RadioGroup>
              <label htmlFor="img-input" className="img-upload">
                <input
                  name=""
                  id="img-input"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setImage(file);
                      setShowImage(imageUrl);
                    }
                  }}
                />
                {showImage ? (
                  <img src={showImage} alt="" width={100} height={100} />
                ) : (
                  <div>Select an image for logo</div>
                )}
              </label>
              <div className="job-post__submit">
                <button type="submit">Post</button>
              </div>
            </form>
          </div>
        </section>
        <section className="post-job__display">
          <CardInfo data={values} image={showImage} />
          <CardDescription data={values} />
        </section>
      </main>
    </>
  );
};

export default PostJob;
