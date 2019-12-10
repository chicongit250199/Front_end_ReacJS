import React, {Component} from 'react';
// import Select from 'react-select';
// import AddEngineer from '../../../../container/engineer/AddEngineer';
import Form from 'react-validation/build/form';
// import Button from 'react-validation/build/button';
import Input from 'react-validation/build/input';
import {isEmail, isEmpty, isNumeric} from 'validator';
import "react-datepicker/dist/react-datepicker.css";
import Register from '../../container/login/RegisterMethod'
import CheckButton from 'react-validation/build/button';
// import { Combobox } from 'react-widgets' 
const required = (value) => {
    if (isEmpty(value)) {
        return <div className="alert alert-danger">This field is required</div>;
    }
}
const phone = (value) => {
    if (!isNumeric(value, [
        {
            no_symbols: false
        }
    ])) {
        return <div className="alert alert-danger">The phone number contains only numbers.</div>;
    }
    else if (value.trim().length < 10) {
        return <div className="alert alert-danger">The phone number can't less than 10 letters.</div>;
    } 
    else if (value.trim().length > 15) {
        return <div className="alert alert-danger">The phone number can't more than 15 letters.</div>;
    }
}
const email = (value) => {
    if (!isEmail(value)) {
        return <div className="alert alert-danger">Invalid email format.</div>;
    }
}
// function handleOptionChange(changeEvent){
//     this.setState({
//       selectedrole: changeEvent.target.value
//     });
//   }


class registerFunc extends Component {
    constructor(props) {
        super(props);
        this.state = {
                email: "",
              username: "",
              password: "",
              role: "",
              fullName: "",
              phone: "",
              address: "", 
              city: "",
              country: ""
        };

    }
    isChange = (event) => {
        const fieldName = event.target.name;
        const value = event.target.value;
        this.setState({[fieldName]: value});
    }

    submitRegister = async() => {
        // '0: normal user,\n1: garage shop; 2: admin',
        console.log(this.state.RadioRole)
        let role = this.state.role;
        if (role === "Normal User"){
            role = 0;
        }
        if (role === "Garage Shop"){
            role = 1;
        }
        else role = 2;
        let register = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            role: role,
            fullName: this.state.fullName,
            phone: this.state.phoneNumber,
            address: this.state.address,
            city: this.state.city,
            country: this.state.country
        }
            Register(register).then(regist => {
                console.log(regist.status);

                // console.log(regist.status.code);
                    if (regist.id) {
                        window.location = "/login";
                        alert("You have create Account");
                    } else {   
                        alert(regist.error);
                            this.setState({msg: regist.error});
                    }
                });
    }
    redirect() {
        window.location = "/login";
    }
    onSubmit(e) {
        e.preventDefault();
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            this.submitRegister();
            // this.register();
        }
    }
    render() {
        // let role = ['Normal User','Garage Shop','Admin'];
        return (
            <div className="container">
                <div className="portlet-body">
                    <div className="tab-content">
                        <span
                            style={{
                            color: "red"
                        }}>
                            {this.state.msg}</span>
                        <div className="tab-pane active" id="tab_1_1">
                            <div className="form-register" id= "form-register">
                                <Form
                                    onSubmit={e => this.onSubmit(e)}
                                    ref={c => {
                                    this.form = c
                                }}>
                                    <div className="lableregister">
                                    <label className="registerlb">Regist new user</label>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">User Name</label>
                                                <input
                                                    type="text"
                                                    id= "username"
                                                    name="username"
                                                    onChange={(event) => this.isChange(event)}
                                                    validations={[required]}
                                                    className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Password</label>
                                                <Input
                                                    type="text"
                                                    name="password"
                                                    onChange={(event) => this.isChange(event)}
                                                    validations={[required]}
                                                    className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Confirm Password</label>
                                                <Input
                                                    type="text"
                                                    name="confirmPass"
                                                    onChange={(event) => this.isChange(event)}
                                                    validations={[required]}
                                                    className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                            <label className="control-label">Roles</label>
                                            <Input type="checkbox" name="role" value={true} 
                                            
                                             />
                                            {/* <div className="radio">
                                                <label>
                                                    <Input type="radio" name= "RadioRole"
                                                    checked={this.state.RadioRole}
                                                    onChange={(event) => this.isChange(event)}
                                                    />
                                                    Garage Shop
                                                </label>
                                                </div> */}
                                            </div>
                                        
                                        </div>
                                        <div className="col-md-6">
                                            {/* Row 2 */}
                                            <div className="form-group">
                                                <label className="control-label">Email</label>
                                                <Input
                                                    type="text"
                                                    name="email"
                                                    onChange={(event) => this.isChange(event)}
                                                    validations={[required, email]}
                                                    className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Phone Number</label>
                                                <Input
                                                    type="text"
                                                    name="phoneNumber"
                                                    onChange={(event) => this.isChange(event)}
                                                    validations={[required, phone]}
                                                    className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Address</label>
                                                <Input
                                                    type="text"
                                                    name="address"
                                                    onChange={(event) => this.isChange(event)}
                                                    validations={[required]}
                                                    className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Country</label>
                                                <Input
                                                    type="text"
                                                    name="country"
                                                    onChange={(event) => this.isChange(event)}
                                                    validations={[required]}
                                                    className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div
                                        className="margin-top-20"
                                        style={{
                                        textAlign: 'center'
                                    }}>
                                        <button
                                            type="submit"
                                            className="btn green"
                                        >
                                            Register
                                        </button>
                                        <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c }} />
                                    </div>
                                </div>
                                </Form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default registerFunc;