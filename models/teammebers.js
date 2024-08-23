const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    degree: {
        type: String,
        required: false
    },
    department: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    phone: {
        type: String,
        required: false,
        unique: false
    },
    experience_years: {
        type: String,
        required: false
    },
    joined_date: {
        type: Date,
        required: false
    },
    resigned_date: {
        type: Date,
        required: false
    },
    photo_url: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

export default mongoose.models.teammebers || mongoose.model('teammebers', teamMemberSchema);


