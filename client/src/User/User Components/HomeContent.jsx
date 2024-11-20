import React, { useEffect, useState } from 'react';
import '../User CSS/HomeContent.css';
import UserReview from './UserReview';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import AOS from 'aos';
import { Link, useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomeContent() {
  const nav = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleSignupClick = () => {
    // Scroll to top before navigating
    window.scrollTo(0, 0);
  };

  const token = localStorage.getItem('Token');

  const navigateToRoute = (index) => {
    if (!token) {
      setShowAlert(true); // Show the alert if the user is not logged in
      setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
    } else if (index === 0) {
      nav('/userjobs');
    } else if (index === 1) {
      nav('/resumebuilder');
    } else if (index === 2) {
      nav('/buildskills');
    }
  };

  return (
    <>
      {/* Bootstrap Alert */}
      {showAlert && (
        <Alert
          variant="warning"
          className="text-center fixed-top m-3"
          style={{
            zIndex: 1050,
            maxWidth: '400px',
            margin: 'auto',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          <strong>Please log in first!</strong>
        </Alert>
      )}

      <section
        className="services"
        data-aos="fade-left"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
        data-aos-easing="ease-in-sine"
      >
        <h2 className="servicesHeading">
          {' '}
          <span className="availabilityStyle">Available</span> Services
        </h2>
        <div className="services-grid">
          <div className="service-card" onClick={() => navigateToRoute(0)}>
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8am9iJTIwc2VhcmNofGVufDB8fDB8fHww"
              alt="Job Search"
            />
            <h3>Job Search</h3>
            <p>Find jobs that match your skills.</p>
          </div>
          <div className="service-card" onClick={() => navigateToRoute(1)}>
            <img
              src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3VtZSUyMGJ1aWxkZXJ8ZW58MHx8MHx8fDA%3D"
              alt="Resume Builder"
            />
            <h3>Resume Builder</h3>
            <p>Create a professional resume.</p>
          </div>
          <div className="service-card" onClick={() => navigateToRoute(2)}>
            <img
              src="https://img.freepik.com/free-photo/top-view-skills-written-note-along-with-colorful-little-paper-notes-light-background-school-color-notepad-job-office-work-copybook_179666-18275.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid"
              alt="Build Skills"
            />
            <h3>Build Skills</h3>
            <p>Build market trend skills.</p>
          </div>
        </div>
      </section>

      <UserReview />

      <div className="ChooseUsContainer">
        <Container>
          <Row className="ChooseUsContainerRow">
            <Col
              md={6}
              style={{ textAlign: 'center' }}
              data-aos="fade-right"
              data-aos-once="false"
              data-aos-easing="ease-in-sine"
            >
              <img
                className="ChooseUsImage"
                src="https://img.freepik.com/free-vector/choice-worker-concept_23-2148627427.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid"
                alt=""
              />
            </Col>

            <Col
              md={6}
              className="ChooseUsText"
              data-aos="fade-left"
              data-aos-once="false"
              data-aos-easing="ease-in-sine"
            >
              <h4 className="text-warning">Why Choose US</h4>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Praesentium ad provident culpa omnis est nulla qui sunt
                adipisci tempora veniam dolore aspernatur maxime, iste
                temporibus, atque totam officiis quod iusto quaerat aliquid
                placeat quo tenetur? Saepe ducimus, magnam at hic delectus
                laudantium omnis officia tempora consectetur, adipisci
                necessitatibus culpa quibusdam odit libero harum quisquam alias
                aspernatur ad asperiores! Rerum pariatur aperiam at vel in rem.
                Ex, inventore minus quasi nobis iusto reiciendis expedita error
                quae tempora id dolor excepturi. Nobis repellat natus voluptates
                nihil illum sed iure! Cupiditate vitae, laboriosam aperiam
                minima, rem eius esse ipsam molestiae recusandae delectus iure.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>How can I create an account?</h3>
          <p>
            Simply click on the{' '}
            <span onClick={handleSignupClick}>
              <Link>signup button</Link>
            </span>{' '}
            and fill out the required details.
          </p>
        </div>
      </section>
    </>
  );
}
