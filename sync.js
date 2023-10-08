const { fetchHubspotContacts } = require('./hubspot');  // Adjust the path if necessary
const { pushToPipedrive } = require('./pipedrivePusher');  // Assuming the Pipedrive logic is in a file named 'pipedrivepusher.js'

async function syncHubspotToPipedrive() {
    const hubspotData = await fetchHubspotContacts();

    // Ensure that the response contains the results array
    if (!hubspotData || !Array.isArray(hubspotData.results)) {
        throw new Error('Invalid data received from HubSpot');
    }

    // Convert HubSpot contacts to Pipedrive persons format
    const pipedriveData = hubspotData.results.map(contact => {
        // Extract properties from the HubSpot contact
        const firstname = contact.properties.firstname || contact.properties.email;
        const lastname = contact.properties.lastname || ''; // Assuming you have a lastname property
        const email = contact.properties.email;

        // Log the properties for debugging purposes
        console.log(contact.properties);

        // Validate the name attribute
        if (!firstname && !email) {
            throw new Error('Both firstname and email are missing for a contact.');
        }

        return {
            firstname: firstname,
            lastname: lastname,
            email: email
        };
    });

    const results = await pushToPipedrive(pipedriveData);
    console.log(`Successfully updated ${results.updatedCount} contacts.`);
    console.log(`Errors encountered: ${results.errors.length}`);
    results.errors.forEach(error => console.error(`Email: ${error.contact}, Error: ${error.error}`));
}

module.exports = {
    syncHubspotToPipedrive
};
