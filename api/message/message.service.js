const dbService = require('../../services/db.service')

module.exports = {
    get,
    add
}

async function add(message) {
    const collection = await dbService.getCollection('message')
    try {
        await collection.insertOne(message);
        return message;
    } catch (err) {
        console.log(`ERROR: can not add message`)
        throw err;
    }
}

async function get(filterBy) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('message')
    try {
        const messages = await collection.find(criteria).toArray();
        return messages
    } catch (err) {
        console.log('ERROR: can not get messages')
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.message) {
        criteria.userEmail = { $regex: filterBy.message, $options: "$i" } // $i - not case sensetive
    }
    return criteria;
}




