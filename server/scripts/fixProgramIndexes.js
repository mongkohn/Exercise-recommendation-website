const mongoose = require('mongoose');
require('dotenv').config();

async function fixProgramIndexes() {
    try {
        // Connect to MongoDB
        const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
        await mongoose.connect(DB_URI);
        console.log('Connected to MongoDB');

        // Get the programs collection
        const collection = mongoose.connection.db.collection('programs');
        
        // List all indexes
        console.log('Current indexes:');
        const indexes = await collection.indexes();
        console.log(JSON.stringify(indexes, null, 2));
        
        // Check if there's an 'id_1' index and drop it if it exists
        try {
            await collection.dropIndex('id_1');
            console.log('Successfully dropped id_1 index');
        } catch (error) {
            if (error.code === 27) {
                console.log('id_1 index does not exist');
            } else {
                console.log('Error dropping index:', error.message);
            }
        }
        
        // Remove any documents that have 'id' field set to null
        const result = await collection.updateMany(
            { id: null },
            { $unset: { id: "" } }
        );
        console.log(`Removed 'id' field from ${result.modifiedCount} documents`);
        
        // Remove any documents that have 'id' field (completely)
        const result2 = await collection.updateMany(
            { id: { $exists: true } },
            { $unset: { id: "" } }
        );
        console.log(`Removed 'id' field from ${result2.modifiedCount} additional documents`);
        
        console.log('Index fix completed successfully');
        
    } catch (error) {
        console.error('Error fixing indexes:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the script
fixProgramIndexes();
