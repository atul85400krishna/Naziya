import { useContext, useEffect, useState } from "react";
import NavbarUser from "./../components/NavbarUser";
import "./styles/personality.css";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Spinner from "../components/Spinner";
import { API, AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ReactionsValue, savedReactions } from "../redux/actions/index";
import { useSelector } from "react-redux";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));
const customIcons = {
  1: {
    icon: (
      <SentimentVeryDissatisfiedIcon sx={{ fontSize: 50, color: "#5a52ff" }} />
    ),
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon sx={{ fontSize: 50, color: "#5a52ff" }} />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon sx={{ fontSize: 50, color: "#5a52ff" }} />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 50, color: "#5a52ff" }} />,
    label: "Satisfied",
  },
  5: {
    icon: (
      <SentimentVerySatisfiedIcon sx={{ fontSize: 50, color: "#5a52ff" }} />
    ),
    label: "Very Satisfied",
  },
};
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}
IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};
const questio = [
  "1. You have a PhD in aaloooo 'Keeping Things Neat and Tidy'",
  "2. In your world, the phrase 'same old, same old' is extinct.",
  "3. Your social battery lasts longer than a Tesla on a full charge",
  "4. You're the go-to person for deciding who gets the last slice of pizza.",
  "5. You could give a TED talk on the art of overthinking.",
];
const initialValues = [
  { id: 1, rating: 0 },
  { id: 2, rating: 0 },
  { id: 3, rating: 0 },
  { id: 4, rating: 0 },
  { id: 5, rating: 0 },
];

const PersonalityQuestion = ({ question, index, values, setValue }) => {
  const recentReaction = useSelector((state) => state.reducer.recentReaction);
  console.log("recent", recentReaction);
  return (
    <div className="personality__question">
      <div className="question__text">{question}</div>

      <StyledRating
        disabled={recentReaction}
        value={values[index]?.rating}
        onChange={(event, newValue) => {
          const updatedValues = values.map((item) => {
            console.log(item.id === index + 1, item.id, index + 1);

            if (item.id === index + 1) return { ...item, rating: newValue };
            return item;
          });
          // ReactionsValue(updatedValues);
          setValue(updatedValues);
        }}
        IconContainerComponent={IconContainer}
        getLabelText={(value) => customIcons[value].label}
        highlightSelectedOnly
        sx={{ width: 350 }}
      />
    </div>
  );
};

const PersonalityAssessment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const initialValues = useSelector((state) => state.reducer.recentvalue);
  // console.log("initial", initialValues);
  const recentReaction = useSelector((state) => state.reducer.recentReaction);
  console.log(initialValues);
  const { state } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const modifyObj = [];
  questions?.forEach((item, index) => {
    modifyObj.push({
      id: item?.id,
      rating: initialValues[index]?.rating,
    });
  });
  const [answers, setAnswers] = useState(modifyObj);
  console.log("initial", initialValues);
  console.log("modifyObj", modifyObj);
  console.log("questions", questions);

  useEffect(() => {
    if (recentReaction) {
      toast.success("You already submitted");
    }
  }, []);
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await API(
        "post",
        "/users/persionality_assessment/",
        // answers,
        modifyObj,
        state.token
      );
      console.log("rexxxx", res);
      if (res.status === 201) {
        savedReactions(true);
        // window.location.reload();
      }
      toast.success("Submitted Successfully");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getAnswers = async () => {
    setIsLoading1(true);
    try {
      const res = await API(
        "get",
        "/users/persionality_assessment/",
        {},
        state.token
      );
      console.log(res);
      setQuestions(res?.data);
      setIsLoading1(false);
    } catch (error) {
      console.log(error);
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    getAnswers();
  }, [recentReaction]);

  return (
    <>
      <NavbarUser />
      <main className="personality__container">
        <h2>Personality Assessment questions</h2>
        {isLoading1 ? (
          <div className="center">
            <div className="lds-ellipsis center bg-white">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          questions.map((question, index) => (
            <PersonalityQuestion
              // question={question}
              question={question?.question_text}
              index={index}
              key={index}
              // values={answers}
              // setValue={setAnswers}
              values={recentReaction ? questions : initialValues}
              setValue={ReactionsValue}
            />
          ))
        )}

        <div className="assessment__submit">
          <button
            style={recentReaction ? { width: "20%" } : null}
            className={`cardinfo__apply ${
              isLoading ? "cardinfo__apply--jobs" : ""
            }`}
            // disabled={answers.map((item) => item.rating).includes(0)}
            disabled={isLoading || recentReaction}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Spinner size={20} color="white" />
            ) : recentReaction ? (
              "You have already submitted"
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </main>
    </>
  );
};

export default PersonalityAssessment;
