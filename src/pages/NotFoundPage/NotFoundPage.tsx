import React from 'react';

import { Link } from 'react-router-dom';

import './style.css';

export const NotFoundPage = (): JSX.Element => {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="four_zero_four_bg">
            <h1 className="text-center ">404</h1>
          </div>

          <div className="content_box_404">
            <h3 className="text-center">{`Look like you're lost`}</h3>

            <p>the page you are looking for not available!</p>

            <Link to="/" className="link_404">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
