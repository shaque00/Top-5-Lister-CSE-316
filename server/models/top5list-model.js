const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String, required: true },
        likes: {type: Number, required: true},
        dislikes: {type: Number, required: true},
        views: {type: Number, required: true},
        date: {type: String, required: true},
        comments: {type: [String], required: true},
        ldMap: {type: Map, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
