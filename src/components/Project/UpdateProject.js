import React, {Component} from 'react';
import {getProject, updateProject} from "../../actions/projectActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class UpdateProject extends Component {

    state = {
        id: "",
        projectName: "",
        projectIdentifier: "",
        description: "",
        startDate: "",
        endDate: "",
        errors: {}
    }

    componentWillReceiveProps(nextProps, next) {
        // const {id,
        //     projectName,
        //     projectIdentifier,
        //     description,
        //     startDate,
        //     endDate} = prevProps.project;
        const project = nextProps.project;
        if(nextProps.errors)
            this.setState({errors: nextProps.errors})


        if (nextProps.project !== this.props.project) {
            // this.setState({
            //     id,
            //     projectName,
            //     projectIdentifier,
            //     description,
            //     startDate,
            //     endDate
            // });
            this.setState({...project})
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params; //destructuring to pick id alone
        this.props.getProject(id, this.props.history)
    }

    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const updateProject = {...this.state} // we could have used the longer route here by doing e.g {projectName: this.state.projectName, ...}

        this.props.updateProject(updateProject, this.props.history)
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
                            <h5 className="display-4 text-center">Update Project form</h5>
                            <hr/>
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="form-group">
                                    <input type="text" className={errors.projectName ? errorStyle: validStyle}
                                        placeholder="Project Name" name="projectName"
                                        value={this.state.projectName}
                                        onChange={this.onChangeHandler}/>
                                    <div className={errors.projectName ? "invalid-feedback": null}>{errors.projectName}</div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className={errors.projectIdentifier ? errorStyle: validStyle}
                                        placeholder="Unique Project ID" name="projectIdentifier"
                                        value={this.state.projectIdentifier}
                                        onChange={this.onChangeHandler}
                                        disabled
                                    />
                                    <div className={errors.projectIdentifier ? "invalid-feedback": null}>{errors.projectIdentifier}</div>
                                </div>
                                <div className="form-group">
                                    <textarea
                                          className={errors.description ? errorStyle: validStyle}
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
                                        onChange={this.onChangeHandler}
                                    />
                                    <div className={errors.startDate ? "invalid-feedback": null}>{errors.startDate}</div>
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date" className={errors.endDate ? errorStyle: validStyle}
                                        name="endDate"
                                        value={this.state.endDate}
                                        onChange={this.onChangeHandler}/>
                                    <div className={errors.endDate ? "invalid-feedback": null}>{errors.endDate}</div>
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project.project,    //state==>>>index project ==>> projectReducer project
    errors: state.errors
});

export default connect(mapStateToProps, {getProject, updateProject})(UpdateProject);