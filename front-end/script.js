document.getElementById("syncButton").addEventListener("click", function() {

    fetch('/api/hello')
.then(response => response.json())
.then(data => console.log(data));


    fetch("http://localhost:3000/sync", {
        method: "GET"
        
    }).then(response => {
        if (response.ok) {
            return response.json();

        } else {
            // Log the response for more info
            console.error("Response status:", response.status);
            console.error("Response status text:", response.statusText);
            return response.text().then(text => {
                throw new Error(`Failed to sync. Server responded with ${response.status}: ${text}`);
            });
        }
    }).then(data => {
        console.log(data);  // <-- Add this line
    
    
        // ... (rest of the code)
          // Handle and display the count of contacts fetched and updated
        const resultElement = document.getElementById("result");
        resultElement.textContent = `Hubspot Fetched: ${data.hubspotFetched}, Pipedrive Updated: ${data.pipedriveUpdated}`;

        // Display the list of updated contacts
        const contactsList = document.getElementById("contactsList");
        contactsList.innerHTML = ""; // Clear the current list
        if (data.updatedContacts && Array.isArray(data.updatedContacts)) {
            data.updatedContacts.forEach(contact => {
                const contactData = contact.data;
                
                let emailAddress = "No email";
                if (contactData.email && contactData.email.length > 0) {
                    // Using the first email for simplicity. If you need to get a specific type, modify accordingly.
                    emailAddress = contactData.email[0].value;
                }
        
                const li = document.createElement("li");
                li.textContent = `${contactData.name} - ${emailAddress}`;
                contactsList.appendChild(li);
            });       
        } else {
            const li = document.createElement("li");
            li.textContent = "No contacts were updated!";
            contactsList.appendChild(li);
        }
        
      
    }).catch(error => {
        console.error("Error:", error);
        alert(error.message);
    });
});

