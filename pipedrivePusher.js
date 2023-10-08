const axios = require('axios');

const PIPEDRIVE_API_KEY = process.env.PIPEDRIVE_API_KEY;
const PIPEDRIVE_PERSONS_URL = 'https://api.pipedrive.com/v1/persons';

async function pushToPipedrive(processedData) {
    const results = {
        updatedCount: 0,
        errors: []
    };

    for (let contact of processedData) {
        try {
            const response = await axios.post(PIPEDRIVE_PERSONS_URL, {
                name: `${contact.firstname} ${contact.lastname}`,
                email: contact.email
            }, {
                params: { api_token: PIPEDRIVE_API_KEY }
            });

            // Check if Pipedrive responded with a successful status
            if (response.status === 201) {
                results.updatedCount++;
            } else {
                results.errors.push({
                    contact: contact.email,
                    error: `Failed to update. Status code: ${response.status}`
                });
            }
        } catch (error) {
            results.errors.push({
                contact: contact.email,
                error: error.message
            });
        }
    }

    return results;
}

module.exports = { pushToPipedrive };
