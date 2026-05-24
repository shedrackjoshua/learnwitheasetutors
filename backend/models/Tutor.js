import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
    name: String,
    subject: String,
    ratings: [
        {
            childId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            score: { type: Number, min: 1, max: 5 },
            comment: String,
        },
    ],
});

tutorSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) return 0;
    const sum = this.ratings.reduce((acc, r) => acc + r.score, 0);
    return sum / this.ratings.length;
});

export default mongoose.model('Tutor', tutorSchema);