import React from 'react';
import PropTypes from 'prop-types';

const Emoji = ({
  type,
}) => {
  let emoji;

  switch (type) {
    case 'money':
      emoji = '💰';
      break;
    case 'chart':
      emoji = '📈';
      break;
    case 'wings-money':
      emoji = '💸';
      break;
    case 'tada':
      emoji = '🎉';
      break;
    case 'sad':
      emoji = '😞';
      break;
    default:
      emoji = '';
  }

  return (
    <h3>
      <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">{emoji}</span>
    </h3>
  );
};

Emoji.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Emoji;
