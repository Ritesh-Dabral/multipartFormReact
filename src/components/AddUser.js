import React,{useState} from 'react';
import axios from 'axios';
import * as EmailValidator from 'email-validator';

function AddUser() {
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [email,setEmail] = useState('');
    const [contact,setContact] = useState('');
    const [file,setFile] = useState(null);
    const [err,setErr]  =    useState('');
    const [success,setSuccess] = useState(false);

    //image handle
    const handleImageUpload = (e) =>{
        setFile(e.target.files[0]); 
    }
    //form handle
    const handleSubmit = (e) =>{
        e.preventDefault();
        var checkReq = true;
        if(fname==='' || lname==='' || email==='' || contact==='')
            checkReq = false;

        if(checkReq===false){
            setErr('One or more field(s) blank');
            setSuccess(false);
        }
        else{
            var emailCheck = EmailValidator.validate(email);
            if(!emailCheck){
                setErr('Invalid email type!!');
                setSuccess(false);
            }
            else{
                const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if(contact.length===10 && regex.test(contact)){

                        console.log(file.type);

                        const formData = new FormData(); 

                        formData.append("fname", fname);
                        formData.append("lname", lname);
                        formData.append("email", email);
                        formData.append("contact", contact);
                        formData.append("image", file);

                        console.log('before submit: ',formData);

                        axios.post('http://localhost:8085/add',formData)
                        .then(res=>{
                            setFname('');
                            setLname('');
                            setEmail('');
                            setContact('');
                            setErr('Data Submitted Successfully');
                            setFile(null);
                            setSuccess(true);
                        })
                        .catch(error=>{
                            setErr(error.message);
                        })
                }
                else{
                    setErr('Invalid contact length or characters');
                    setSuccess(false);
                }
            }
        }

    }

    return (
        <div>
            <h1>User Details</h1>
            <form className="ui form">
                <div className="field">
                    <label>First Name</label>
                    <input type="text" name="first-name" placeholder="First Name" 
                        value={fname}  onChange={(e)=>{setFname(e.target.value); setErr('');}} 
                    />
                </div>
                <div className="field">
                    <label>Last Name</label>
                    <input type="text" name="last-name" placeholder="Last Name"
                        value={lname}  onChange={(e)=>{setLname(e.target.value); setErr('');}}
                    />
                </div>
                <div className="field">
                    <label>EmailID</label>
                    <input type="email" name="email" placeholder="Email"
                        value={email}  onChange={(e)=>{setEmail(e.target.value);setErr('');}}
                    />
                </div>
                <div className="field">
                    <label>Contact No.</label>
                    <input type="text" name="contact" placeholder="Contact No."
                        value={contact}  onChange={(e)=>{setContact(e.target.value);setErr('');}}
                    />
                </div>
                <div className="field">
                    <label>Upload Avatar</label>
                    <input type="file" name="avatar" 
                        onChange = {handleImageUpload}
                        accept=".jpg"
                    />
                </div>
                <button className="ui button" type="submit" onClick={handleSubmit}>Submit</button>
                <div className="errorUI">
                    {
                        success?(<span style={{"color":"green"}}>{err}</span>):(<span style={{"color":"red"}}>{err}</span>)
                    }
                </div>
            </form>
        </div>
    )
}

export default AddUser
