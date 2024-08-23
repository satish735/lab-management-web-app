const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobLocationSchema = new Schema({
    id: Number,
    name: String,
    city: String,
    state: String,
    countryCode: String,
    countryName: String
});

const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    departmentId: Number,
    departmentName: String,
    jobLocations: [JobLocationSchema],
    jobType: Number,
    experience: String,
    salaryRange: {
        currency: String,
        cultureInfo: String
    },
    publishedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('job', JobSchema);
