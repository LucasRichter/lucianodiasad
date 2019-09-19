import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import Event from './Event'
import Text from './Text'
import GuestForm from './GuestForm'

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

const Events = ({ events, colors }) => {
  const [event, setEvent] = useState('')

  return (
    <Fragment>
      <Slider {...settings}>
        {!events.length
          ? <Text color={colors.ternary} fontSize='18px'>Não há próximos semninários</Text>
          : events.map((event, index) => (
            <Event
              key={event.title}
              event={event}
              colors={colors}
              onClick={() => setEvent(event._id)}
            />
          ))}
      </Slider>
      <GuestForm
        open={Boolean(event)}
        event={event}
        onClose={() => setEvent('')}
      />
    </Fragment>
  )
}

Events.propTypes = {
  events: PropTypes.array.isRequired,
  colors: PropTypes.object
}

export default Events
