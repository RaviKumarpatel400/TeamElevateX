import Item from '../models/Item.js'

export const createItem = async (req, res) => {
	try {
		const { type, title, description, date, location, imageUrl, isPublished } = req.body
		if (!type || !title || !description || !date || !location) {
			return res.status(400).json({ message: 'Missing required fields' })
		}
		const item = await Item.create({ type, title, description, date, location, imageUrl, isPublished })
		return res.status(201).json(item)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

export const listItems = async (req, res) => {
	try {
		const { type } = req.query
		const query = {}
		if (type) query.type = type
		const items = await Item.find(query).sort({ date: 1 })
		return res.json(items)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

export const getItem = async (req, res) => {
	try {
		const item = await Item.findById(req.params.id)
		if (!item) return res.status(404).json({ message: 'Not found' })
		return res.json(item)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

export const updateItem = async (req, res) => {
	try {
		const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
		if (!item) return res.status(404).json({ message: 'Not found' })
		return res.json(item)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

export const deleteItem = async (req, res) => {
	try {
		const item = await Item.findByIdAndDelete(req.params.id)
		if (!item) return res.status(404).json({ message: 'Not found' })
		return res.json({ success: true })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}


