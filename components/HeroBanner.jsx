import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { urlFor } from '../lib/client';

function HeroBanner({ heroBanner }) {
  const {
    smallText,
    midText,
    largeText1,
    image,
    product,
    buttonText,
    desc,
  } = heroBanner;

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img src={urlFor(image)} alt="headphones" className="hero-banner-image" />

        <div>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;

HeroBanner.propTypes = {
  heroBanner: PropTypes.instanceOf(Object).isRequired,
};

// 小坑:
// heroBanner 的 product 名稱，一定要和 Prodects 裡面的產品其中一項一樣，才能夠找到相對應的路徑
