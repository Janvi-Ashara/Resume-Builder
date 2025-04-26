import styles from './landing.module.css';
import { Link } from 'react-router-dom';
import Navbar from '../../uikit/Navbar/Navbar';
import picture_resume from './../images/person_Resume.png'
import picture_job from './../images/resume.png'


function LandingPage(){
   
    return(
    <div className={styles.container}>
        <Navbar array={[""]}/>
        <div>
        </div>
        <div className={styles.q1}>
            <div className={styles.question}><h1>What is a Resume?</h1></div>
            <div className={styles.answer}>
                <div className={styles.img}><img src={picture_job} alt="professional cartoon resume"></img></div>
                <div className={styles.text}>
                    <h3>
                        <li>A resume is a formal document that provides an overview of your professional qualifications, including your relevant work experience, skills, education, and notable accomplishments</li><br/>
                        <li>Usually paired with a cover letter, a resume helps you demonstrate your abilities and convince employers you’re qualified and hireable</li></h3>
                </div>
            </div>
        </div>
        
        <div className={styles.q2}>
            <div className={styles.question}><h1>Why Is a Resume Important?</h1></div>
                <div className={styles.answer}>
                <div className={styles.text}>
                    <h3><li>A resume is an important tool for your job search because it offers a page or two where you can display your top skills and qualities</li><br/><li>Resumes help employers make hiring decisions and help you get your first interview</li><br/><li>That's why it matters how you structure your resume and what information you decide to include</li><br/><li> In this article, you'll learn why a resume is important and get actionable resume tips that may help you achieve your next career move</li></h3>
                </div>
                <div className={styles.img}><img src={picture_resume} alt="professional cartoon resume"></img></div>
            </div>
        </div>

        <div className={styles.createButton}><h2>Take your first step and <Link className={styles.link} to="/personaldetails">Begin Creating</Link></h2></div>
       
    </div>
)}

export default LandingPage;