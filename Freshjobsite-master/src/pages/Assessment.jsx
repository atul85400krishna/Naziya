import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API, AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useMediaQuery } from "@mui/material";

const Assessment = () => {
  const [value, setValue] = useState("");
  const { pathname } = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state, updateSkills } = useContext(AuthContext);
  const [skill, setSkill] = useState();
  const navigate = useNavigate();
  const test = pathname.slice(12);
  const matches = useMediaQuery("(min-width:600px)");

  const getAssessments = async () => {
    const token = state.token;
    try {
      const res = await API("get", "users/skills/", {}, token);
      console.log(res);
      updateSkills(res?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAssessments();
  }, []);

  useEffect(() => {
    setSkill(state?.skills?.find((obj) => obj.skill_id == test));
  }, [state?.skills]);

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmitTest = async () => {
    const token = state.token;
    try {
      const res = await API(
        "post",
        "users/submit_answers/",
        {
          skill_id: test,
          question_id: currentQuestion + 1,
          answer_id: value,
        },
        token
      );
      console.log(res);
      setValue("");
      navigate("/assessments");
    } catch (error) {
      console.log("error", error);
      toast.error("Error with submitting response");
    }
    navigate("/assessments");
  };

  const getAssessmentQuestions = async () => {
    const token = state.token;
    try {
      const res = await API(
        "post",
        "users/questions/",
        { skill_id: test },
        token
      );
      console.log("skill questions", res);
      setQuestions(res?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAssessmentQuestions();
  }, []);

  const sendAnswer = async (submit) => {
    console.log("submit", submit);
    setIsLoading(true);
    const token = state.token;
    try {
      const res = await API(
        "post",
        "users/submit_answers/",
        submit
          ? {
              skill_id: test,
              question_id: currentQuestion + 1,
              answer_id: value,
              button: "Submit",
            }
          : {
              skill_id: test,
              question_id: currentQuestion + 1,
              answer_id: value,
            },
        token
      );
      console.log(`answer with ${submit}`, res);
      setValue("");
      if (submit) {
        navigate("/assessments");
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error with submitting response");
    }
    setIsLoading(false);
  };

  function confirmBack() {
    if (
      confirm(
        "Your current progress will be lost! Are you sure you want to end this test?"
      )
    ) {
      window.removeEventListener("popstate", confirmBack);
      window.history.back();
      console.log("call to cancel test");
      handleSubmitTest();
    } else window.history.pushState(null, document.title, location.href);
  }

  useEffect(() => {
    window.history.pushState(null, document.title, location.href);
    window.addEventListener("popstate", confirmBack);
    return () => {
      window.removeEventListener("popstate", confirmBack);
    };
  }, []);

  useEffect(() => {
    const unloadCallback = (event) => {
      console.log("before");
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const [duration, setDuration] = useState(600);

  useEffect(() => {
    if (skill?.start_time) {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const start = new Date(skill?.start_time);
        var newDateObj = new Date(start.getTime() + 10 * 60000);
        const remainingTime = Math.max((newDateObj - currentTime) / 1000, 0);
        setDuration(remainingTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [skill?.start_time]);

  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  console.log(currentQuestion, "-", questions.length, value);
  return (
    <div className="question__container">
      <div className="question__question">
        <h2>{skill?.skill} Assessment Test</h2>
        <div className="question__number">
          Question {currentQuestion + 1} of {questions?.length}
        </div>
        <div className="question__text">
          {questions[currentQuestion]?.question}
        </div>
        {/* <div className="question__note">
          <span className="bold">Quick Note : </span> If you’re having problem
          with submitting any of the questions, please click “Reload Questions”
        </div>
        <div className="question__report">
          <button onClick={getAssessmentQuestions}>Reload Questions</button>
          <button>Report a problem</button>
        </div> */}
      </div>
      <FormControl
        sx={{
          margin: matches ? "1.5rem" : ".5rem",
          marginLeft: !matches ? ".5rem" : "0",
        }}
        className="options__form"
      >
        <div className="assessment__time">
          <h3>Select one option</h3>
          <div>
            {minutes == 0 ? "0" : ""}
            {minutes}:{String(seconds).length === 1 ? "0" : ""}
            {seconds}
          </div>
        </div>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          sx={{ minWidth: "20rem" }}
        >
          {questions &&
            questions.length > 0 &&
            questions[currentQuestion]?.answers?.map((option) => (
              <FormControlLabel
                value={option.answer_id}
                control={
                  <Radio
                    sx={{
                      marginRight: "1rem",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                  />
                }
                label={option.answer_text}
                sx={{
                  boxShadow: "0px 4px 24px 0px rgba(0, 31, 63, 0.08)",
                  padding: "1rem",
                  borderRadius: "1rem",
                  margin: ".5rem 1rem",
                  marginLeft: "0",
                  width: "100%",
                  backgroundColor: value == option.answer_id ? "#5a52ff" : "",
                  color: value == option.answer_id ? "white" : "#000000",
                  fontSize: 20,
                }}
                key={option.answer_id}
              />
            ))}
        </RadioGroup>
        <div className="next__btn">
          {currentQuestion < questions.length - 1 ? (
            <>
              {currentQuestion !== 0 && (
                <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                  {"Previous Question"}
                </button>
              )}
              <button onClick={() => sendAnswer(false)} disabled={value === ""}>
                {isLoading ? (
                  <Spinner size={25} color="white" />
                ) : (
                  "Next Question"
                )}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                {"Previous Question"}
              </button>
              <button onClick={() => sendAnswer(true)} disabled={value === ""}>
                {isLoading ? (
                  <Spinner size={25} color="white" />
                ) : (
                  "Submit Test"
                )}
              </button>
            </>
          )}
        </div>
      </FormControl>
    </div>
  );
};

export default Assessment;
