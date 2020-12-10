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
        endDate: ""
    }

    componentWillReceiveProps(nextProps, next) {
        // const {id,
        //     projectName,
        //     projectIdentifier,
        //     description,
        //     startDate,
        //     endDate} = prevProps.project;
        const project = nextProps.project;

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
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Update Project form</h5>
                            <hr/>
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg "
                                        placeholder="Project Name"
                                        name="projectName"
                                        value={this.state.projectName}
                                        onChange={this.onChangeHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Unique Project ID"
                                        name="projectIdentifier"
                                        value={this.state.projectIdentifier}
                                        onChange={this.onChangeHandler}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                  <textarea
                      className="form-control form-control-lg"
                      placeholder="Project Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChangeHandler}
                  />
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="startDate"
                                        value={this.state.startDate}
                                        onChange={this.onChangeHandler}
                                    />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="endDate"
                                        value={this.state.endDate}
                                        onChange={this.onChangeHandler}
                                    />
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
    project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project.project       //state==>>>index project ==>> projectReducer project
});

export default connect(mapStateToProps, {getProject, updateProject})(UpdateProject);