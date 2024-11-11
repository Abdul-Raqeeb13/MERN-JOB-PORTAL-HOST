import React, { useEffect } from 'react'
import '../User CSS/HomeContent.css'
import UserReview from './UserReview';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AOS from 'aos'
import { Link, useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css'


export default function HomeContent() {
  
  const nav = useNavigate()

  useEffect(()=>{
    AOS.init()
  }, [])

  const handleSignupClick = () => {
    // Scroll to top before navigating
    window.scrollTo(0, 0);
    // Navigate to the signup page
    // navigate('/signup');
  };

  const token = localStorage.getItem("Token")
  const navigateToRoute = (index) => {
    if(!token){
      alert("Please login first")
    }
    else if(index === 0){
      nav('/userjobs')
    }
    else if(index === 1){
      nav('/resumebuilder')
    }
    else if (index === 2){
      nav('/buildskills')
    }
    
  }

  return (
    <>
      <section class="services" data-aos="fade-left" data-aos-once="false" data-aos-anchor-placement="top-center" data-aos-easing="ease-in-sine" >
        <h2 className='servicesHeading'> <span className='availabilityStyle'>Available</span> Services</h2>
        <div class="services-grid">
          <div class="service-card" onClick={()=>navigateToRoute(0)}>
            <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8am9iJTIwc2VhcmNofGVufDB8fDB8fHww" alt="Job Search" />
            <h3>Job Search</h3>
            <p>Find jobs that match your skills.</p>
          </div>
          <div class="service-card" onClick={()=>navigateToRoute(1)}>
            <img src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3VtZSUyMGJ1aWxkZXJ8ZW58MHx8MHx8fDA%3D" alt="Resume Builder" />
            <h3>Resume Builder</h3>
            <p>Create a professional resume.</p>
          </div>
          <div class="service-card" onClick={()=>navigateToRoute(2)}>
            <img src="https://img.freepik.com/free-photo/top-view-skills-written-note-along-with-colorful-little-paper-notes-light-background-school-color-notepad-job-office-work-copybook_179666-18275.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid" alt="Resume Builder" />
            <h3>Build Skills</h3>
            <p>Build market trend skills.</p>
          </div>
        </div>
      </section>



      <UserReview />



      <div className="ChooseUsContainer">
        <Container>
        {/* <h3 style={{textAlign:'center'}}>Why Choose US</h3> */}

          <Row className='ChooseUsContainerRow'>


            <Col md={6} style={{textAlign:"center"}}  data-aos="fade-right" data-aos-once="false"  data-aos-easing="ease-in-sine">

              <img className='ChooseUsImage' src="https://img.freepik.com/free-vector/choice-worker-concept_23-2148627427.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid" alt="" />
            </Col>


            <Col md={6} className='ChooseUsText'  data-aos="fade-left" data-aos-once="false"  data-aos-easing="ease-in-sine">
            <h4 className='text-warning'>Why Choose US</h4>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium ad provident culpa omnis est nulla qui sunt adipisci tempora veniam dolore aspernatur maxime, iste temporibus, atque totam officiis quod iusto quaerat aliquid placeat quo tenetur? Saepe ducimus, magnam at hic delectus laudantium omnis officia tempora consectetur, adipisci necessitatibus culpa quibusdam odit libero harum quisquam alias aspernatur ad asperiores! Rerum pariatur aperiam at vel in rem. Ex, inventore minus quasi nobis iusto reiciendis expedita error quae tempora id dolor excepturi. Nobis repellat natus voluptates nihil illum sed iure! Cupiditate vitae, laboriosam aperiam minima, rem eius esse ipsam molestiae recusandae delectus iure.</p>
            </Col>
          </Row>
        </Container>
      </div>



      {/* <section class="cta">
 <Container fluid>
    <Row>
        <Col>Ready to Find Your Dream Job?</Col>
        <Col><Button></Col>
    </Row>
 </Container>
</section> */}

      <section class="faq">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-item">
          <h3>How can I create an account?</h3>
          <p>Simply click on the <span onClick={handleSignupClick}><Link>signup button</Link></span> and fill out the required details.</p>
        </div>
      </section>

      {/* <section class="partners">
        <h2>Trusted by</h2>
        <div class="partners-logos">
          <img src="https://plus.unsplash.com/premium_photo-1700763472959-b503ea89b7ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFydG5lcnMlMjBsb2dvc3xlbnwwfHwwfHx8MA%3D%3D" alt="Partner 1" />
          <img src="https://media.istockphoto.com/id/1179890897/photo/man-holding-a-blank-card-in-hand-stock-photo-mock-up-template-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=eyJ1TWucgZw2bd0Ix03voPcvkPmq2eGfcBN6XZryQqU=" alt="Partner 2" />
        </div>
      </section>

      <section class="newsletter">
        <h2>Stay Updated</h2>
        <form>
          <input type="email" placeholder="Enter your email" class="newsletter-input" />
          <button class="newsletter-button">Subscribe</button>
        </form>
      </section> */}

    </>
  )
}
