import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import Event from './Event'
import Text from './Text'
import colors from '../helpers/colors'

const settings = {
  dots: false,
  infinite: true,
  adaptiveHeight: true,
  lazyLoad: 'ondemand',
  fade: true,
  autoplay: true,
  speed: 1500,
  slidesToShow: 1,
  id: 'teste2',
  slidesToScroll: 1
}

const Events = ({ events }) => {
  return (
    <Slider {...settings}>
      {!events.length
        ? <Text color={colors.dark} fontSize='18px'>Não há próximos semninários</Text>
        : events.map((event, index) => (
          <Event
            key={event.title}
            event={event}
          />
        ))}
    </Slider>
  )
}

Events.propTypes = {
  events: PropTypes.array.isRequired
}

export default Events
