import mongoose from 'mongoose'

const ApplicationSchema = new mongoose.Schema(
	{
		type: { type: String, enum: ['member', 'lead'], required: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		github: { type: String },
		linkedin: { type: String },
		role: { type: String },
		experience: { type: String },
		skills: { type: String },
		interests: { type: String },
		availability: { type: String },
		leadershipExperience: { type: String },
		technicalSkills: { type: String },
		mentoringExperience: { type: String },
		projectIdeas: { type: String },
		timeCommitment: { type: String },
		motivation: { type: String },
		status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
	},
	{ timestamps: true }
)

export default mongoose.model('Application', ApplicationSchema)


