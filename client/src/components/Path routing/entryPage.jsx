import React, { Component } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Education from '../Education/education';
import Experience from '../Experience/experience'
import Srtresume from '../Finish/srt-resume';
import LandingPage from '../Landing Page/landingPage';
import PersonDetails from '../Personal Details/personalDetails';
import Project from '../Project/Project';
import Signup from '../../uikit/register/Signup';
import Login from '../../uikit/register/Login';
import Home from '../../uikit/register/Home';
import Dashboard from '../../uikit/register/Dashboard';
import Error from '../../uikit/register/Error';


class EntryPage extends Component {
    state = {
        personalDetailsValues: [],
        educationDetailsValues: [],
        experienceDetailsValues: [],
        projectDetailsValues: []
    }

    personalData = (data) => {
        this.setState({ personalDetailsValues: data });
    }

    educationData = (data) => {
        this.setState({ educationDetailsValues: data });
    }

    experienceData = (data) => {
        this.setState({ experienceDetailsValues: data });
    }

    projectData = (data) => {
        this.setState({ projectDetailsValues: data });
    }

    render() {

        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Signup />} /> 
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Error />} />
                    <Route path="/" exact element={<LandingPage />}></Route>
                    <Route path="/personaldetails" exact element={<PersonDetails personalDataUpdate={this.personalData} />} />
                    <Route path="/education" exact element={<Education educationDataUpdate={this.educationData} />} />
                    <Route path="/experience" exact element={<Experience experienceDataUpdate={this.experienceData} />} />
                    <Route path="/project" exact element={<Project projectDataUpdate={this.projectData} />} />
                    <Route path="/downloadpdf" exact element={<Srtresume />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default EntryPage;