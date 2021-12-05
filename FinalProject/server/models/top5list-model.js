const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String, required: true },
        owner: {type: String, required: true},
        viewNumber: {type: Number, required: true },
        likeNumber: {type: Number, required: true },
        dislikeNumber: {type: Number, required: true },
        comments: { type: [[String]], required: true },
        published: {type: Boolean, required: true},
        publishDate: {type: Date, required: false},
        publishDateString: {type: String, required: false}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
