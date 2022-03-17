const { Actors } = require('../models');

exports.getAllActosr = catchAsync(async (req, res) => {
  const data = await Actors.findAll();

  res.status(200).json({
    status: 'success',
    data: { data }
  });
});
