'use strict';

module.exports = (capability) => {
  return (req, res, next) => {
    if (req.user.can(capability)) {
      console.log('We got to here');
      next();
    } else {
      next('You dont have Permissions!');
    }
  };
};
