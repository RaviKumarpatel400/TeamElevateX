import Application from '../models/Application.js'

export const createApplication = async (req, res) => {
	try {
		const data = req.body
		if (!data.type || !data.name || !data.email) {
			return res.status(400).json({ message: 'type, name, and email are required' })
		}
		const app = await Application.create(data)
		return res.status(201).json(app)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

export const listApplications = async (req, res) => {
	try {
		const { status, type } = req.query
		const query = {}
		if (status) query.status = status
		if (type) query.type = type
		const apps = await Application.find(query).sort({ createdAt: -1 })
		return res.json(apps)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

export const updateApplicationStatus = async (req, res) => {
	try {
		const { status } = req.body
		if (!['pending', 'accepted', 'rejected'].includes(status)) {
			return res.status(400).json({ message: 'Invalid status' })
		}
		const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true })
		if (!app) return res.status(404).json({ message: 'Not found' })
		return res.json(app)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}


