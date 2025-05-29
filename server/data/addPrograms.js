const mongoose = require('mongoose');
const Program = require('../models/programSchema');
require('dotenv').config();

const samplePrograms = [
  {
    id: 1,
    name: "โปรแกรมออกกำลังกายใน 1 อาทิตย์",
    videoUrl: "https://drive.google.com/file/d/1U7vJJu-JsjaD0t_NBo-wdsz1Zeb-X-oZ/preview",
    description: [
      "1. โน้มตัวไปข้างหน้า 45 องศา",
      "2. ให้จับบาร์กว้างกว่าไหล่",
      "3. ดึงข้อศอกไปด้านหลัง เกร็งหลัง",
    ],
    equipment: [" บาร์เบล","ดัมเบล","เชือก","เก้าอี้"],
    muscles: ["ทุกส่วนของร่างกาย"],
    difficulty: "Beginner",
    duration: "1 อาทิตย์",
    workoutsPerWeek: 3,
    exercises: [
      {
        name: "Bent-over Row",
        sets: 3,
        reps: "8-12",
        rest: "60 วินาทีí"
      },
      {
        name: "Push-ups",
        sets: 3,
        reps: "10-15",
        rest: "45 วินาที"
      }
    ]
  },
  {
    id: 2,
    name: "โปรแกรมเสริมสร้างกล้ามเนื้อ",
    videoUrl: "https://drive.google.com/file/d/1U7vJJu-JsjaD0t_NBo-wdsz1Zeb-X-oZ/preview",
    description: [
      "1. โปรแกรมสำหรับการเสริมสร้างกล้ามเนื้อ",
      "2. เหมาะสำหรับผู้เริ่มต้น",
      "3. ใช้อุปกรณ์เบื้องต้น",
    ],
    equipment: ["ดัมเบล","แผ่นน้ำหนัก","เสื่อโยคะ"],
    muscles: ["แขน","ขา","หลัง"],
    difficulty: "Intermediate",
    duration: "4 สัปดาห์",
    workoutsPerWeek: 4,
    exercises: [
      {
        name: "Bicep Curls",
        sets: 4,
        reps: "10-12",
        rest: "60 วินาที"
      },
      {
        name: "Squats",
        sets: 4,
        reps: "12-15",
        rest: "90 วินาที"
      }
    ]
  }
];

const seedPrograms = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing programs
    await Program.deleteMany({});
    console.log('Cleared existing programs');
    
    // Insert sample programs
    await Program.insertMany(samplePrograms);
    console.log('Sample programs added successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding programs:', error);
    process.exit(1);
  }
};

seedPrograms();
