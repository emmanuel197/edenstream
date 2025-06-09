const sliderSettings = (slidesToShow = 7, slidesToScroll = 5, dots = false, numOfSlidesOnMobile = 2) => {
  return {
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    initialSlide: 0,
    dots: dots,
    responsive: [
      {
        breakpoint: 1024, // Desktop
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 900, // Tablet (landscape)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 768, // Tablet (portrait)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 1,
          dots: true,
          infinite: true,
        }
      },
      {
        breakpoint: 600, // Small tablets/large phones
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: true,
          infinite: true,
        }
      },
      {
        breakpoint: 480, // Mobile phones
        settings: {
          slidesToShow: numOfSlidesOnMobile,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: true,
          infinite: true,
        }
      }
    ]
  };
}

export default sliderSettings;