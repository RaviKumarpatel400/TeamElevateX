import Registration from '../models/Registration.js'
import Item from '../models/Item.js'

export const createRegistration = async (req, res) => {
	try {
		const { itemId, participants, teamName, notes } = req.body
		if (!itemId || !participants || !Array.isArray(participants)) {
			return res.status(400).json({ message: 'itemId and participants required' })
		}
		const item = await Item.findById(itemId)
		if (!item) return res.status(404).json({ message: 'Item not found' })
		const reg = await Registration.create({
			itemId,
			itemType: item.type,
			participants,
			teamName,
			notes,
		})
		return res.status(201).json(reg)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

export const listRegistrations = async (req, res) => {
	try {
		const { itemId } = req.query
		const query = itemId ? { itemId } : {}
		const regs = await Registration.find(query).sort({ createdAt: -1 }).populate('itemId')
		return res.json(regs)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

export const exportRegistrationsCsv = async (req, res) => {
	try {
		const { itemId } = req.query
		const query = itemId ? { itemId } : {}
		const regs = await Registration.find(query).sort({ createdAt: -1 }).populate('itemId')
		const rows = [
			['RegistrationID', 'ItemID', 'ItemTitle', 'ItemType', 'TeamName', 'ParticipantName', 'ParticipantEmail', 'ParticipantPhone', 'CreatedAt'],
		]
		for (const reg of regs) {
			for (const p of reg.participants) {
				rows.push([
					reg._id.toString(),
					reg.itemId?._id?.toString() || '',
					reg.itemId?.title || '',
					reg.itemType,
					reg.teamName || '',
					p.name,
					p.email,
					p.phone || '',
					reg.createdAt.toISOString(),
				].map((v) => String(v).replace(/"/g, '""')))
			}
		}
		const csv = rows.map((r) => r.map((v) => `"${v}"`).join(',')).join('\n')
		res.setHeader('Content-Type', 'text/csv')
		res.setHeader('Content-Disposition', 'attachment; filename="registrations.csv"')
		return res.send(csv)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}


