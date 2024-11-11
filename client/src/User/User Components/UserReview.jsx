import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Container } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import '../User CSS/UserReview.css';
import AOS from 'aos'
import 'aos/dist/aos.css'


export default function UserReview() {
    // Review data (image, username, and reviewText)
    const reviews = [
        {
            image: 'https://img.freepik.com/free-photo/teenager-boy-portrait_23-2148105678.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid',
            username: 'John Doe',
            reviewText: 'This is an amazing product! It changed the way I manage my tasks.'
        },
        {
            image: 'https://img.freepik.com/free-photo/overweight-man-glasses-wearing-black-t-shirt-looking-camera-with-sad-expression-standing-pink-wall_141793-57460.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid',
            username: 'Mike Smith',
            reviewText: 'I absolutely love the design and user experience. Highly recommend!'
        },
        {
            image: 'https://img.freepik.com/free-photo/portrait-young-man-with-green-hoodie_23-2148514952.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid',
            username: 'Alex Johnson',
            reviewText: 'A very intuitive interface, making task management a breeze.'
        },
        {
            image: 'https://img.freepik.com/free-photo/portrait-young-man-wearing-heart-his-face-made-moisturizer_23-2149259929.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid',
            username: 'Samuel Adams',
            reviewText: 'This app has transformed my productivity. Highly efficient!'
        },
        {
            image: 'https://img.freepik.com/free-photo/close-up-photo-surprised-caucasian-man-black-shirt_132075-8193.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid',
            username: 'Chris Evans',
            reviewText: 'Incredible app with top-notch features. Easy to use and understand.'
        },
        {
            image: 'https://img.freepik.com/free-photo/young-beautiful-woman-wearing-red-shirt-showing-kiss-gesture-isolated-yellow-wall_141793-36021.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid',
            username: 'Sophia Lee',
            reviewText: 'A must-have for anyone who wants to manage tasks more effectively.'
        }
    ];

    const [startIndex, setStartIndex] = useState(0); // State to track visible reviews

    // Show 3 reviews at a time
    const visibleReviews = reviews.slice(startIndex, startIndex + 3);

    // Handle next and previous buttons
    const handleNext = () => {
        if (startIndex + 3 < reviews.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    useEffect(()=>{
        AOS.init()
      }, [])

    return (
        <>

<section class="services" data-aos="fade-left" data-aos-once="false" data-aos-anchor-placement="top-center" data-aos-easing="ease-in-sine" >
            <h2 className='reviewHeading'>Customer <span className='reviewStyle'>Reviews</span></h2>
            <Container className="user-review-section" data-aos="fade-right" data-aos-once="false"  data-aos-easing="ease-in-sine">
                    <ArrowBackIcon onClick={handlePrev} className="arrow-icon" />
                <div className="slider-container">

                    {/* Display the visible reviews */}
                    <div className="review-cards">
                        {visibleReviews.map((review, index) => (
                            <Card sx={{ maxWidth: 400 }} key={index} className="review-card">
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={review.image}
                                        alt={`User review ${review.username}`}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {review.username}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {review.reviewText}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </div>

                </div>
                    <ArrowForwardIcon onClick={handleNext} className="arrow-icon" />
            </Container>
            </section>
        </>
    );
}
