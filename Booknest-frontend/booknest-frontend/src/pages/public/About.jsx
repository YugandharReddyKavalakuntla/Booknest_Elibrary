// src/pages/public/About.jsx

import React from "react";

export default function About() {
  const devs = ["yugandhar","karthikeya","akhil","bharath"];
  return (
    <div className="container py-5 text-center">
      <h2 className="text-success fw-bold mb-4">About BookNest</h2>
      <p className="lead px-md-5">
        BookNest is an eLibrary platform designed to provide easy access to knowledge and books anytime, anywhere.
      </p>
      <div className="row mt-5">
        {devs.map(dev => (
          <div className="col-md-3 col-6 mb-4" key={dev}>
            <img src={`/images/${dev}.png`} alt={dev} className="rounded-circle img-fluid shadow" style={{width:150,height:150,objectFit:'cover'}}/>
            <h6 className="mt-2 text-capitalize text-success">{dev}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}