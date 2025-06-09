import mongoose from 'mongoose';

const launchesSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  flightNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  missionName: {
    type: String,
    required: true,
  },
  planetName: {
    type: String,
    required: true,
  },
  rocketName: {
    type: String,
    required: true,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const LaunchesDatabase = mongoose.model('Launch', launchesSchema);

export default LaunchesDatabase;
