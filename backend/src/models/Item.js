import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: ['event', 'hackathon', 'workshop'],
			required: true,
		},
		title: { type: String, required: true },
		description: { type: String, required: true },
		date: { type: Date, required: true },
		location: { type: String, required: true },
		imageUrl: { type: String },
		isPublished: { type: Boolean, default: true },
	},
	{ timestamps: true }
)

export default mongoose.model('Item', ItemSchema)


