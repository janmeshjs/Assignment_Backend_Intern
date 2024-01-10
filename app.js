const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');
const app = express();
const port = 3000;

const sequelize = new Sequelize(config.development);
const Contact = require('./models/contact')(sequelize, DataTypes);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Zamazon Contact Web Service!');
});

//Using POST method to hit the endpoint
app.post('/identify', async (req, res) => {
    try {
        const { email, phoneNumber } = req.body;

        // Find an existing contact with the given email and phoneNumber
        const existingprimarycontact = await Contact.findOne({
            where: {
                [Sequelize.Op.and]: [{ email }, { phoneNumber }], //returns true if both email AND phoneNumber are equal
            },
        });

        if (existingprimarycontact) {
            // Check if the existing contact is a primary or secondary contact
            if (existingprimarycontact.linkPrecedence === 'primary') {
                // If primary, point LinkedId to the id of the existing contact
                const associatedContacts = await Contact.findAll({
                    where: { linkedId: existingprimarycontact.id },
                });

                //calling responsePayload function to return the response payload
                const response = responsePayload(existingprimarycontact, associatedContacts);
                res.status(200).json(response);

            } else if (existingprimarycontact.linkPrecedence === 'secondary') {
                // If secondary, point LinkedId to the LinkedId of the existing contact
                const associatedContacts = await Contact.findAll({
                    where: { linkedId: existingprimarycontact.linkedId },
                });

                const response = responsePayload(existingprimarycontact, associatedContacts);
                res.status(200).json(response);
            }
        } else {
            // Check if there is an existing contact with the given email OR phoneNumber
            const existingContact = await Contact.findOne({
                where: {
                    [Sequelize.Op.or]: [{ email }, { phoneNumber }],
                },
            });

            if (existingContact && existingContact.linkPrecedence === 'secondary') {
                // Create a new secondary contact linked to the existing secondary contact
                const secSecondaryContact = await Contact.create({
                    email,
                    phoneNumber,
                    linkPrecedence: 'secondary',
                    linkedId: existingContact.linkedId,
                });

                res.status(200).json(secSecondaryContact);
            } else if (existingContact && existingContact.linkPrecedence === 'primary') {
                // Create a new secondary contact linked to the existing primary contact
                const newSecondaryContact = await Contact.create({
                    email,
                    phoneNumber,
                    linkPrecedence: 'secondary',
                    linkedId: existingContact.id,
                });

                res.status(200).json(newSecondaryContact);
            } else {
                // Create a new primary contact if no existing contacts are found
                const newContact = await Contact.create({
                    email,
                    phoneNumber,
                    linkPrecedence: 'primary',
                });

                res.status(200).json(newContact);
            }
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: 'An unexpected error occurred.' });
    }
});

    // Delete all records from the Contact table
    // ONLY FOR TESTING purposes
app.post('/deletecontact', async (req, res) => {
    try {
        await Contact.destroy({
            where: {}, 
            truncate: true, 
            restartIdentity: true, // Reset the auto-increment counter
            cascade: true,
        });

        res.status(200).json({ message: 'All contacts deleted successfully.' });
    } catch (error) {
        console.error('An error occurred while deleting contacts:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: 'An unexpected error occurred.' });
    }
});
    

// Function to construct the response payload
function responsePayload(existContact, newcontact) {
    const emails = [existContact.email, ...newcontact.map(c => c.email)];
    const phoneNumbers = [existContact.phoneNumber, ...newcontact.map(c => c.phoneNumber)];

    const secondaryContactIds = newcontact.map(c => c.id);

    const responsePayload = {
        primaryContactId: existContact.linkedId || existContact.id,
        emails: Array.from(new Set(emails)),
        phoneNumbers: Array.from(new Set(phoneNumbers)),
        secondaryContactIds,
    };

    return responsePayload;
}

// Start the server
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}
module.exports = app;
