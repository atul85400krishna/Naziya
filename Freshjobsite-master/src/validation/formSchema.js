import * as Yup from "yup";

export const loginSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be atleast 6 characters")
    .required("Please enter your Password"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter your Email"),
});

export const registerSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter your Phone number"),
  password: Yup.string()
    .min(6, "Password must be atleast 6 characters")
    .required("Please enter your Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please enter confirm password"),
  name: Yup.string(),
});

export const withdrawSchema = Yup.object({
  name: Yup.string().required("Please enter Beneficiary name"),
  upiId: Yup.string().required("Please enter your UPI ID"),
  acc: Yup.string().required("Please enter account no."),
  IFSC: Yup.string().required("Please enter bank IFSC code"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter your Phone number"),
});

export const postJobSchema = Yup.object({
  title: Yup.string().required("This field is required"),
  company_name: Yup.string().required("This field is required"),
  job_desc: Yup.string().required("This field is required"),
  emptype: Yup.string().required("This field is required"),
  location: Yup.string().required("This field is required"),
  worktype: Yup.string().required("This field is required"),
  responsibilities: Yup.string("This field is required"),
  benifits: Yup.string(),
  minsalary: Yup.string().required("This field is required"),
  maxsalary: Yup.string().required("This field is required"),
  salarytype: Yup.string().required("This field is required"),
  skills: Yup.array().of(Yup.string()),
  // postdate: "2823-89-22",
});

export const profileSchema = Yup.object({
  email: Yup.string()
    .email("Enter valid email")
    .required("This field is required"),
  name: Yup.string().required("This field is required"),
  role: Yup.string(),
  picture: Yup.string(),
  phone_number: Yup.string(),
  location: Yup.string(),
  designation: Yup.string(),
  top_skills: Yup.string(),
  skills: Yup.array().of(Yup.string()),
  tools: Yup.array().of(Yup.string()),
  languages: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("This field is required"),
      proficiency: Yup.string().required("This field is required"),
    })
  ),
  proficiency: Yup.string(),
  desired_salary: Yup.string(),
  desired_company_size: Yup.string(),
  employment_interest: Yup.array().of(Yup.string()),
  desired_location: Yup.array().of(Yup.string()),
  work_experience: Yup.array().of(
    Yup.object().shape({
      company_name: Yup.string().required("This field is required"),
      designation: Yup.string().required("This field is required"),
      employment_type: Yup.string(),
      description: Yup.string(),
      duration_from: Yup.string().required("This field is required"),
      duration_to: Yup.string().required("This field is required"),
      location: Yup.string(),
      skills: Yup.array().of(Yup.string()),
    })
  ),
  education: Yup.array().of(
    Yup.object().shape({
      school_name: Yup.string().required("This field is required"),
      degree: Yup.string().required("This field is required"),
      grade: Yup.string().required("This field is required"),
      description: Yup.string(),
      duration_from: Yup.string().required("This field is required"),
      duration_to: Yup.string().required("This field is required"),
      location: Yup.string(),
    })
  ),
});
