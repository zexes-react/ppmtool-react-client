import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProject} from '../../actions/projectActions';

class AddProject extends Component {
    state = {
        projectName: "",
        projectIdentifier: "",
        description: "",
        startDate: "",
        endDate: "",
        errors: {}
    }

    //life cycle hooks
    //componentWillReceiveProps deprecated
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.errors  !== this.props.errors){
            this.setState({errors: this.props.errors});
        }
    }


    //alternative LONG METHOD: -> pick each field name and do a setState, hence each field will have its own changeHandler
    onChangeHandler = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const newProject = {...this.state} // we could have used the longer route here by doing e.g {projectName: this.state.projectName, ...}

        this.props.createProject(newProject, this.props.history)
    }

    render() {
        const {errors} = this.state;
        const errorStyle = "form-control form-control-lg is-invalid";
        const validStyle = "form-control form-control-lg";

        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project form</h5>
                            <hr/>
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="form-group">
                                    <input type="text" className={errors.projectName ? errorStyle: validStyle}
                                           placeholder="Project Name" name={"projectName"}
                                           value={this.state.projectName}
                                            onChange={this.onChangeHandler}/>
                                    <div className={errors.projectName ? "invalid-feedback": null}>{errors.projectName}</div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className={errors.projectIdentifier ? errorStyle: validStyle}
                                           placeholder="Unique Project ID" name="projectIdentifier"
                                           value={this.state.projectIdentifier}
                                           onChange={this.onChangeHandler}/>
                                    <div className={errors.projectIdentifier ? "invalid-feedback": null}>{errors.projectIdentifier}</div>

                                </div>
                                <div className="form-group">
                                    <textarea className={errors.description ? errorStyle: validStyle}
                                              placeholder="Project Description" name="description"
                                              value={this.state.description}
                                              onChange={this.onChangeHandler}/>
                                    <div className={errors.description ? "invalid-feedback": null}>{errors.description}</div>
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className={errors.startDate ? errorStyle: validStyle}
                                           name="startDate"
                                           value={this.state.startDate}
                                           onChange={this.onChangeHandler}/>
                                    <div className={errors.startDate ? "invalid-feedback": null}>{errors.startDate}</div>
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date" className={errors.endDate ? errorStyle: validStyle}
                                           name="endDate"
                                           value={this.state.endDate}
                                           onChange={this.onChangeHandler}/>
                                    <div className={errors.endDate ? "invalid-feedback": null}>{errors.endDate}</div>
                                </div>

                                <input type="submit"
                                       className="btn btn-primary btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, {createProject}) (AddProject);