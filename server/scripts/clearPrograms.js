const mongoose = require('mongoose');
require('dotenv').config();

async function clearAllPrograms() {
    try {
        const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
        await mongoose.connect(DB_URI);
        console.log('Connected to MongoDB');

        const collection = mongoose.connection.db.collection('programs');
        
        // Count documents before deletion
        const countBefore = await collection.countDocuments();
        console.log(`Found ${countBefore} programs in database`);
        
        // Delete all programs
        const result = await collection.deleteMany({});
        console.log(`Deleted ${result.deletedCount} programs`);
        
        console.log('All programs cleared successfully');
        
    } catch (error) {
        console.error('Error clearing programs:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Uncomment the line below to run this script
// clearAllPrograms();
