// src/pages/public/Home.jsx
import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function Home() {
  return (
    <div className="container py-4">
      <Carousel>
        {[1,2,3].map(i => (
          <Carousel.Item key={i}>
            <img className="d-block w-100 rounded" src={`/images/book${i}.jpeg`} alt={`Book ${i}`}/>
          </Carousel.Item>
        ))}
      </Carousel>
      <section className="mt-4 text-center">
        <h2 className="text-success fw-bold">Why BookNest?</h2>
        <p className="lead px-md-5">
          BookNest brings the world’s knowledge to your fingertips. eBooks and eLibraries are eco-friendly,
          accessible, and always available — learning without limits.
        </p>
      </section>
    </div>
  );
}