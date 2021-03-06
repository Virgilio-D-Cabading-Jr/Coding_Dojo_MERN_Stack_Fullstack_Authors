import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

////////////////////////////////////////////////////
//  CREATE AUTHOR VIEW
////////////////////////////////////////////////////

const CreateAuthorView = () => {
    // //// FIELDS /////////////////////////////////
    const [name, setName] = useState("");
    const [age, setAge] = useState(18);
    const [genre, setGenre] = useState("drama");
    const [classic, setClassic] = useState(false);
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    // //// CREATE AUTHOR IN DATABASE //////////////
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/authors/new", { name, age, genre, classic })
            .then(res => {
                console.log("🌈🦄🌈 Submitted Create to Database  🌈🦄🌈:", res);
                history.push("/authors")
            })
            .catch(err => {
                console.log("err.response.data:", JSON.stringify(err.response.data));
                const errorResponse = err.response.data.errors;
                const errorArray = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArray.push(errorResponse[key].message);
                }
                setErrors(errorArray);
            })
    }

    // **** Name Input Change Handler ********
    const handleNameChange = e => {
        const inputLength = e.target.value.length;
        if (inputLength < 3 && inputLength > 0) {
            setErrors(["name must be at least 3 characters in length"])
        } else {
            setErrors([]);
        }
        setName(e.target.value);
    }

    // //// OUTPUT /////////////////////////////////
    return (<div>
        <h2>Add a new Author:</h2>
        {/* <p>Errors: { JSON.stringify(errors) }</p> */}
        {/* **** Show Errors ******** */}
        {
            errors
                ? errors.map((error, idx) =>
                    <p key={idx} className='text-danger text-center bg-warning'>
                        <strong>{error}</strong>
                    </p>)
                : <p className='bg-info'><strong>&nbsp;</strong></p>
        }
        {/* **** Input Form ******** */}
        <form onSubmit={e => handleSubmit(e)} >
            {/* **** Name ******** */}
            <div className="form-group mb-2">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control"
                    id="name" placeholder="Enter author's name"
                    value={name}
                    min="1" step="1"
                    onChange={e => handleNameChange(e)} />
            </div>
            {/* **** Age ******** */}
            <div className="form-group mb-2">
                <label htmlFor="age">Age (in years):</label>
                <input type="number" className="form-control"
                    id="age"
                    value={age}
                    onChange={e => setAge(e.target.value)} />
            </div>
            {/* **** Genre ******** */}
            <span>Genre:</span>
            <select className="form-control" value={genre} onChange={e => setGenre(e.target.value)}>
                <option value="drama">Drama</option>
                <option value="comedy">Comedy</option>
                <option value="thriller">Thriller</option>
            </select>
            <span>Classic: </span>
            <input type="checkbox"
                checked={ classic }
                onChange={e => setClassic(e.target.checked)}
            />
            <div className='row mt-2'>
                <p className='btn btn-secondary round-btn col' onClick={e => setName("")}><strong>Cancel</strong></p>
                <button type="submit" className="btn btn-success round-btn col">
                    <strong>Submit New Author</strong>
                </button>
            </div>
        </form>
    </div>)
}

export default CreateAuthorView