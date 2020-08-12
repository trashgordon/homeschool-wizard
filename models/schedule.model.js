const Joi = require('joi');
const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  name: String,
  dayOfWeek: String,
  events: [ Object ]
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

function validateSchedule(schedule) {
  const schema = new Joi.object({
    name: Joi
      .string()
      .minlength(4)
      .maxlength(50)
      .required(),
    dayOfWeek: Joi
      .string()
      .minlength(3)
      .maxlength(3)
      .required()
  });

  return schema.validate(schedule);
}


// schedule name
// day of week
// events

