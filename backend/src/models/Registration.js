import mongoose from 'mongoose'

const ParticipantSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String },
	},
	{ _id: false }
)

const RegistrationSchema = new mongoose.Schema(
	{
		itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
		itemType: { type: String, enum: ['event', 'hackathon', 'workshop'], required: true },
		teamName: { type: String },
		participants: {
			type: [ParticipantSchema],
			validate: {
				validator: function (arr) {
					return arr.length >= 1 && arr.length <= 5
				},
				message: 'Participants must be between 1 and 5',
			},
			required: true,
		},
		notes: { type: String },
	},
	{ timestamps: true }
)

export default mongoose.model('Registration', RegistrationSchema)


