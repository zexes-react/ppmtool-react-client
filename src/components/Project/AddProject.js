import React, {Component} from 'react';

class AddProject extends Component {
    state = {
        projectName: "",
        projectIdentifier: "",
        description: "",
        startDate: "",
        endDate: ""
    }

    //alternative LONG METHOD: -> pick each field name and do a setState, hence each field will have its own changeHandler
    onChangeHandler = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const newProject = {...this.state} // we could have used the longer route here by doing e.g {projectName: this.state.projectName, ...}
        console.log(newProject);
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project form</h5>
                            <hr/>
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg "
                                           placeholder="Project Name" name={"projectName"}
                                           value={this.state.projectName}
                                            onChange={this.onChangeHandler}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder="Unique Project ID" name="projectIdentifier"
                                           value={this.state.projectIdentifier}
                                           onChange={this.onChangeHandler}/>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg"
                                              placeholder="Project Description" name="description"
                                              value={this.state.description}
                                              onChange={this.onChangeHandler}/>
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="startDate"
                                           value={this.state.startDate}
                                           onChange={this.onChangeHandler}/>
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="endDate"
                                           value={this.state.endDate}
                                           onChange={this.onChangeHandler}/>
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProject;