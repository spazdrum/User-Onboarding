import React, {useState} from 'react';
import * as yup from 'yup';
import axios from 'axios';

function Form() {
    const [post, setPost] = useState([]);
    // manage formState
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter full name"),
        email: yup.string().email("Please enter a valid email address").required(),
        password: yup.string().required(),
        terms: yup.boolean().oneOf([true], "Please agree to the Terms & Conditions")
    });

    const validateChange = e => {
        yup.reach(formSchema, e.target.name).validate(e.target.value).then(valid => {
            setErrors({ ...errors, [e.target.name]: "" });
        })
        .catch(err => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
    };

    // onSubmit
    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => {
                setPost(response.data);
                setFormState({
                    name: "",
                    email: "",
                    password: "",
                    terms: ""
                });
            })
            .catch(err => console.log(err.response));
    };

    // onChange
    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">Name
                <input type="text" name="name" placeholder="Please enter full name" onchange={inputChange} value={formState.name} />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlFor="email">Email
                <input type="email" name="email" placeholder="Enter email" onChange={inputChange} value={formState.email} />
                {errors.name.length > 0 ? (<p className="error">{errors.email}</p>) : null}
            </label>
            <label htmlFor="password">Password
                <input id="password" type="password" name="password" onChange={inputChange} value={formState.password} />
                {errors.name.length > 0 ? <p className="error">{errors.password}</p> : null}
            </label>
            <label htmlFor="terms" className="terms">
                <input type="checkbox" name="terms" checked={formState.terms} onChange={inputChange} />
                Terms & Conditions
            </label>
            {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
            <button type="submit">
                Submit
            </button>
        </form>
    );
}

export default Form;
