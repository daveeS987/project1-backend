'use strict';

module.exports = (capability) => {
  return (req, res, next) => {
    if (req.user.can(capability)) {
      next();
    } else {
      next('You dont have Permissions!');
    }
  };
};
