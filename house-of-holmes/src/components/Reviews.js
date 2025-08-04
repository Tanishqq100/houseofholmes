import React from 'react';
import { useTranslation } from 'react-i18next';

const Reviews = () => {
  const { t } = useTranslation();

  const reviewData = [
    {
      text: "For my newest endeavor I wanted to create a clothing line reflective of what I wanted to see in the world. Tabitha took my ideas and transformed them into the vision I had for my clothing! With her expertise in the apparel world, Tabitha was there every step of the way with helpful suggestions and creative solutions to bring my line to fruition. From fabric choices to line sheets, this lady is on it! Her team has been awesome at working with me and rolling with my evolving ideas. I'm super proud to be working with Tabitha and her team!",
      author: "Carrie Marill",
      company: "PUNK WASP"
    },
    {
      text: "Tabitha and House of Holmes are fantastic! As an artist and designer, my product is very important to me. Not only is Tabitha extremely knowledgeable, but she cares deeply about the end result. She takes my ideas and works with me through the entire process. Tabitha takes pride in her work, and it shows in the way she treats me and my projects. I am thrilled to have found House of Holmes because I know that everything is quality. On top of all of that, she is such a great person and gives off such great energy!",
      author: "Dustin Roa",
      company: "THE CELLAR SHOP"
    }
  ];

  return (
    <section id="reviews">
      <h2>{t('reviews.title')}</h2>
      {reviewData.map((review, index) => (
        <div key={index} className="review-item">
          <div className="review-quote">"</div>
          <p>{review.text}</p>
          <h4>
            <cite>
              - {review.author}, {review.company}
            </cite>
          </h4>
        </div>
      ))}
    </section>
  );
};

export default Reviews; 