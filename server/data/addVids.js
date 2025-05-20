const axios = require("axios");

const videos = [
  {
    title: "Dumbbell One Arm Press",
    url: "https://drive.google.com/file/d/1in4KYaCJ51cy-ogFG0yshgXT5SDSGZYL/preview",
    description:
      "1. ยกดัมเบลขึ้นด้วยแขนข้างเดียว ให้แขนเหยียดตรง\n2. ใช้มือยึดจับ เพื่อให้มั่นคง\n3. ดึงดัมเบลขึ้นมาชิดลำตัว\n4. โดยพยายามบีบกล้ามเนื้อหลังให้ได้มากที่สุด",
    equipment: ["ดัมเบล"],
    muscles: ["หน้าแขน", "หลัง"],
  },
  {
    name: "Bent Over Rows",
    url:
      "https://drive.google.com/file/d/1uniMG91kgmaJfp8omHg5puteH3fu-WZV/preview",
    description:
      "1. โน้มตัวไปข้างหน้า 45 องศา\n2. ให้จับบาร์กว้างกว่าไหล่\n3. ดึงข้อศอกไปด้านหลัง เกร็งหลัง",
    equipment: ["บาร์เบล"],
    muscles: ["หน้าแขน", "หลัง"],
  },
  {
    title: "ท่ายืดหน้าแขน 1",
    url: "https://drive.google.com/file/d/1_rhgSnaK7BXyld4a6KCc2GxI_S-09jEU/preview",
    description: "1. ตั้งแขนให้ขนานกับลำตัว\n2. ดึงเชือกให้สูงประมาณหัวไหล่",
    equipment: ["เชือก"],
    muscles: ["หน้าแขน"],
  },
  {
    title: "ท่ายืดหัวไหล่ 1",
    url: "https://drive.google.com/file/d/1NJGe0-pTXIepOJkxQTkRbTyWtydCePbD/preview",
    description: "1. ยืดแขนให้สุด\n2. โดยใช้เชือกในการช่วยยืดกล้ามเนื้อ",
    equipment: ["เชือก"],
    muscles: ["หัวไหล่"],
  },
  {
    title: "ท่ายืดหัวไหล่ 2",
    url: "https://drive.google.com/file/d/1gWufXaplgGgVayNjXdu7dWhtp5B0w7Vq/preview",
    description: "1. ยืดแขนให้สุด\n2. โดยใช้เชือกในการช่วยยืดกล้ามเนื้อ",
    equipment: ["เชือก"],
    muscles: ["หัวไหล่"],
  },
  {
    title: "ท่ายืดหัวไหล่ 3",
    url: "https://drive.google.com/file/d/11xVMyWFst_LS9f_1_QF4SPeI-fuGPZyG/preview",
    description: "1. วางแขนให้เป็นรูปตัว L\n2. ใช้มือในการดึงเชือก",
    equipment: ["เชือก"],
    muscles: ["หัวไหล่"],
  },
  {
    title: "Alternate Dumbbell Curl",
    url: "https://drive.google.com/file/d/1hG2xr0Mv-pnviDNeZGNyVTsm_wcL24AX/preview",
    description:
      "1. ยกดัมเบลขึ้นให้ด้านจับดัมเบลขนานกับพื้น\n2. ยกให้ด้ามจับสูงประมาณหัวไหล่",
    equipment: ["ดัมเบล"],
    muscles: ["หน้าแขน"],
  },
  {
    title: "Alternating Dumbbell Bicep Curl",
    url: "https://drive.google.com/file/d/1LXdl7yJkcqf6gZA6unD2hrVFqlAaTFc6/preview",
    description:
      "1. ถือดัมเบลทั้งสองข้าง\n2. โดยที่ข้างให้ข้างใดข้างหนึ่งออกแรงยก 2-3 ครั้ง\n3. ส่วนอีกข้างหนึ่งให้ยกค้างไว้และแขนตั้งฉาก\n4. ทำเป็นนี้สลับกันจนครบเซต",
    equipment: ["ดัมเบล"],
    muscles: ["หน้าแขน"],
  },
  {
    title: "Back Extensions",
    url: "https://drive.google.com/file/d/1jrzg_kPqCjooaOX8ttmN78CCYpRHPX9W/preview",
    description:
      "1. ตั้งท่านอนคว่ำทีม้านั่ง โดยปรับแผ่นรองวางราบระดับเดียวกับหน้าขา\n2. ไขว้แขนซ้ายขวาวางบนอก\n3. พร้อมรักษาแนวหัว ไหล่ คอ ขาให้อยู่แนวระนาบเดียวกัน\n4. พร้อมเกร็งหลังส่วนล่าง\n5. ก้นและเอ็นร้อยหวายยกลำตัวขึ้น-ลง ตามจังหวะในองศาที่พอดี",
    equipment: ["เก้าอี้"],
    muscles: ["หลัง"],
  },
  {
    title: "Bent-Over Rows",
    url: "https://drive.google.com/file/d/1uniMG91kgmaJfp8omHg5puteH3fu-WZV/preview",
    description:
      "1. โน้มตัวไปข้างหน้า 45 องศา\n2. ให้จับบาร์กว้างกว่าไหล่\n3. ดึงบาร์เข้าหาหน้าท้อง\n4. ดึงข้อศอกไปด้านหลัง เกร็งหลัง",
    equipment: ["บาร์เบล"],
    muscles: ["หลัง"],
  },
  {
    title: "Chest Supported Dumbbell Row",
    url: "https://drive.google.com/file/d/1GWtiR898Ir6Dv0BQ-aimVPU5sk-hxwgc/preview",
    description:
      "1. วางม้านั่งปรับความเอียงให้ 45 องศา\n2. ถือดัมเบลไว้ในมือแต่ละข้างโดยจับในลักษณะที่เป็นกลาง\n3. จากนั้นเริ่มเคลื่อนไหวโดยดันข้อศอกไปด้านหลัง\n4. ดึงดัมเบลเข้าหาตัวจนข้อศอกอยู่กับที่\n5. แล้วค่อยๆ ลดดัมเบลลง",
    equipment: ["ดัมเบล", "เก้าอี้"],
    muscles: ["หลัง"],
  },
  {
    title: "Close Grip Press",
    url: "https://drive.google.com/file/d/1MkyvXEF3EdPq9Te7BE-ns-OeC4LJVHjP/preview",
    description:
      "1. ปรับเก้าอี้ ราบกับพื้น นำดัมเบลประกบกัน\n2. ล็อคสะบัก เชิดอก เกร็งกล้ามอกด้านใน\n3. ต้านลงช้าๆ พร้อมกับ หุบศอกแนบลำตัวไว้\n4. ดัมเบลจะต้านลงมาอยู่บริเวณ ใต้ราวนมของเรา\n5. ดึงขึ้น พร้อมกับ ดัมเบลประกบติดกัน",
    equipment: ["ดัมเบล", "เก้าอี้"],
    muscles: ["อก"],
  },
  {
    title: "Crunch",
    url: "https://drive.google.com/file/d/1-X-6uz-rWTk2YX1fceOOSePtNAsbzK-C/preview",
    description:
      "1. เกร็งหน้าท้อง ค่อยๆยกตัวขึ้น\n2. ตอนยกตัวขึ้น ให้ค้างไว้สักแปป",
    equipment: ["เสื่อ"],
    muscles: ["ท้อง"],
  },
  {
    title: "Dips",
    url: "https://drive.google.com/file/d/1vKG1dhSR0xILxGIaxlBF5N-uLUMrNh_X/preview",
    description:
      "1. วางมือทั้ง 2 ข้างบนเก้าอี้\n2. โดยปล่อยขาเหยียดและวางแขนให้กว้างลำตัวเล็กน้อย\n3. ทิ้งน้ำหนักตัวช้าๆ\n4. ก่อนใช้แขนยกตัวขึ้น",
    equipment: ["เก้าอี้"],
    muscles: ["หลังแขน"],
  },
  {
    title: "Dumbbell Bench Press",
    url: "https://drive.google.com/file/d/1M_kK3az_OfuW4uC9RV9aajPbBstvifiF/preview",
    description:
      "1. จับดัมเบลยกขึ้นในลักษณะที่แขนตึง\n2. โดยให้แขนทำมุม 60 องศากับลำตัว\n3. ยกดัมเบลขึ้นพร้อมกับสูดหายใจเข้า\n4. เอาลงพร้อมกับปล่อยลมหายใจออก",
    equipment: ["เก้าอี้", "ดัมเบล"],
    muscles: ["อก"],
  },
  {
    title: "Dumbbell Bicep Curl",
    url: "https://drive.google.com/file/d/19pwsMoqkwxHsGJcMHcSxjMGlpUjAmvXg/preview",
    description:
      "1. ถือดัมเบลไว้ด้วยมือทั้งสองข้าง\n2. โดยฝ่ามือหันเข้าหาตัว\n3. ขึ้นลงอย่างช้าๆ\n4. ไม่เหวี่ยงแขน และล็อกแขนให้อยู่กับที่",
    equipment: ["ดัมเบล"],
    muscles: ["อก"],
  },
  {
    title: "Dumbbell Concentration Curl",
    url: "https://drive.google.com/file/d/1AhpW9XfFiNwIGOCRb-G9qRAhzm4rULYc/preview",
    description:
      "1. นั่งบนม้านั่งหรือเก้าอี้ กางขาออกจากกัน\n2. วางข้อศอกด้านในของขาข้างที่จะทำการยกน้ำหนัก\n3. จับดัมเบลด้วยมือข้างใดข้างหนึ่ง\n4. ยกดัมเบลขึ้นโดยการงอข้อศอก\n5. พยายามให้ข้อศอกอยู่กับที่และไม่ขยับไปมา",
    equipment: ["เก้าอี้", "ดัมเบล"],
    muscles: ["หน้าแขน"],
  },
  {
    title: "Dumbbell Fly",
    url: "https://drive.google.com/file/d/14_E0czt_HQOCGxJMZYSdU-4e0Uel5piG/preview",
    description:
      "1. การนอนราบบนม้านั่ง พร้อมกับถือดัมเบลไว้ในแต่ละมือ\n2. ฝ่ามือควรหันเข้าหากัน และงอข้อศอกเล็กน้อย\n3. หายใจเข้าขณะที่คุณลดดัมเบลลงอย่างช้าๆ\n4. กางแขนออกเป็นวงกว้างจนข้อศอกอยู่ระดับไหล่\n5. เมื่อกางแขนจนสุดให้ค้างไว้สักครุ่",
    equipment: ["เก้าอี้", "ดัมเบล"],
    muscles: ["อก"],
  },
  {
    title: "Dumbbell Front Raise",
    url: "https://drive.google.com/file/d/1xh_TmPPgRJncWL2HnuXIY9golRAflPWU/preview",
    description:
      "1. หันฝ่ามือเข้าหาลำตัว\n2. ขึ้นมาด้านหน้าของลำตัวจนแขนเป็นเดียวกับพื้น",
    equipment: ["ดัมเบล"],
    muscles: ["หัวไหล่"],
  },
  {
    title: "Dumbbell Hammer Curl",
    url: "https://drive.google.com/file/d/1eU3mgtOPg7AsBaD-3DtQunUjwWGoX_3q/preview",
    description:
      "1. จับดัมเบลในลักษณะแนวตั้งล็อคข้อมือให้แน่นแขนแนบลำตัว\n2. ค่อยๆยกดัมเบลขึ้นและปล่อยลง",
    equipment: ["ดัมเบล"],
    muscles: ["หน้าแขน"],
  },
  {
    title: "Dumbbell Lateral Raise",
    url: "https://drive.google.com/file/d/18_BleEuk-Ef8LPRxxfLGNvWhoxOuDHRn/preview",
    description:
      "1. ถือดัมเบลไว้ข้างลำตัว ให้หันผ่ามือเข้าหาลำตัว\n2. ยกดัมเบลทั้ง 2 ข้าง ขึ้นมาด้านข้างของลำตัว\n3. จนแขนเป็นแนวเดียวกับพื้น",
    equipment: ["ดัมเบล"],
    muscles: ["หัวไหล่"],
  },
  {
    title: "Dumbbell One Arm Press",
    url: "https://drive.google.com/file/d/1in4KYaCJ51cy-ogFG0yshgXT5SDSGZYL/preview",
    description:
      "1. ยกดัมเบลขึ้นด้วยแขนข้างเดียว ให้แขนเหยียดตรง\n2. ใช้มือยึดจับ เพื่อให้มั่นคง\n3. ดึงดัมเบลขึ้นมาชิดลำตัว\n4. โดยพยายามบีบกล้ามเนื้อหลังให้มากที่สุด",
    equipment: ["ดัมเบล"],
    muscles: ["หลัง"],
  },
  {
    title: "Dumbbell Shoulder Press",
    url: "https://drive.google.com/file/d/1umlj3yWwmWY1usgIvDvce3gvLV5jGPrB/preview",
    description:
      "1. นั่งตัวตรง จับดัมเบลในแต่ละมือ\n2. ยกขึ้นมาวางที่ระดับไหล่ฝ่ามือหันออกด้านนอก\n3. หายใจเข้าลึกๆแล้วค่อยๆดันดัมเบลขึ้นเหนือศีรษะ\n4. พร้อมกับหายใจออก เมื่อแขนเหยียดตรง ให้ค้างไว้สักครู่\n5. แล้วค่อยๆ ลดดัมเบลลงสู่ตำแหน่งเดิมพร้อมกับหายใจเข้า",
    equipment: ["ดัมเบล"],
    muscles: ["หัวไหล่"],
  },
  {
    title: "Hammer Concentration Curl",
    url: "https://drive.google.com/file/d/1M_KeSj6BOBHYw2ewIz1IvCpZruLC-Zmv/preview",
    description:
      "1. นั่งบนเก้าอี้ แยกขาออกจากกัน\n2. วางข้อศอกด้านในของขาข้างที่จะทำการยกน้ำหนัก\n3. จับดัมเบลคล้ายท่า Dumbbell Concentration Curl\n4. แต่เปลี่ยนการจับเป็นแบบ Hammer\n5. ยกดัมเบลขึ้นโดยการงอข้อศอก\n6. พยายามให้ข้อศอกอยู่กับที่และไม่ขยับไปมา",
    equipment: ["ดัมเบล"],
    muscles: ["หน้าแขน"],
  },
  {
    title: "Incline Dumbbell Press",
    url: "https://drive.google.com/file/d/1hEgPBmKId7N88XTeyiFWz7FIlyCH76vn/preview",
    description:
      "1. ปรับม้านั่งเอียงขึ้น 45 องศา\n2. โดยให้แขนทำมุมประมาณ 70 องศากับลำตัว",
    equipment: ["ดัมเบล", "เก้าอี้"],
    muscles: ["อก"],
  },
  {
    title: "Kick backs",
    url: "https://drive.google.com/file/d/1GHBubJ3OxTSWsVAZqXz5w_TDVQgFLcE_/preview",
    description:
      "1. ใช้มืออีกข้างยกดัมเบลขึ้นมาข้างลำตัว\n2. ให้ข้อศอกเป็น 45 องศา\n3. ใช้แขนเหวี่ยงดัมเบลไปข้างหลังโดยเน้นออกแรงจากหลังแขน",
    equipment: ["ดัมเบล"],
    muscles: ["หลังแขน"],
  },
  {
    title: "Laying Dumbbell Tricep Extension",
    url: "https://drive.google.com/file/d/1z3tU7KdUCN6lbCJro5oB5wThW1ST8DPC/preview",
    description:
      "1. นอนหงายบนม้านั่งออกกำลังกาย\n2. จับดัมเบลด้วยมือทั้งสองข้าง\n3. ยกขึ้นเหนือหน้าอก โดยให้ฝ่ามือหันเข้าหากัน\n4. งอข้อศอกเล็กน้อยเพื่อป้องกันการล็อกข้อ",
    equipment: ["ดัมเบล", "เก้าอี้"],
    muscles: ["หลังแขน"],
  },
  {
    title: "Overhead Triceps Extension",
    url: "https://drive.google.com/file/d/1RpbixUrDzISrtXjb2uT9zNvkHq29pDHC/preview",
    description:
      "1. ยืนมือทั้ง 2 ข้างประคองหัวดัมเบลไว้ด้านหลังศีรษะ\n2. จับดัมเบลด้วยมือทั้งสองข้าง\n3. ไม่กางกว้างหรือแคบจนเกินไป",
    equipment: ["ดัมเบล", "เก้าอี้"],
    muscles: ["หลังแขน"],
  },
  {
    title: "Plank",
    url: "https://drive.google.com/file/d/16Qb52suUvcbMKbTCYFSs5kQWLZVF68jO/preview",
    description: "1. เพียงนอนคว่ำและใช้ข้อศอกดันตัวขึ้น\n2. ค้างไว้ 30 วินาที",
    equipment: ["เสื่อ"],
    muscles: ["ท้อง"],
  },
  {
    title: "Pull Up",
    url: "https://drive.google.com/file/d/1FSNNNp1HQsPsVi2kDwENrNchE7B3Pkih/preview",
    description:
      "1. ยืนใต้บาร์ จับบาร์ด้วยการจับเหนือศีรษะให้กว้างกว่าช่วงไหล่เล็กน้อย\n2. ดึงสะบักลงไปด้านหลังเมื่อเกร็งหลัง ลำตัว\n3. พร้อมรักษาแนวหัว ไหล่ คอ ขาให้อยู่แนวระนาบเดียวกัน\n4. ให้ข้อศอกอยู่แนบลำตัวและไม่แอ่นหลังส่วนล่างเกินกว่าปกติ",
    equipment: ["บาร์เบล"],
    muscles: ["หลัง"],
  },
  {
    title: "Push Up",
    url: "https://drive.google.com/file/d/1wooZiErIKTqxwrAUKH98uZWzj7pl9wFi/preview",
    description:
      "1. วางแขนให้พอดีกับหัวไหล่\n2. ดึงสะบักลงไปด้านหลังเมื่อเกร็งหลัง ลำตัว\n3. ขาเหยียดตรงเท้าชิด",
    equipment: ["เสื่อ"],
    muscles: ["อก"],
  },
  {
    title: "Reverse Crunch",
    url: "https://drive.google.com/file/d/1zq2PsVT_ibKO_srqvMU5rncZ31OLWMW_/preview",
    description: "1. เกร็งหน้าท้อง มือรองใต้ก้น",
    equipment: ["เก้าอี้"],
    muscles: ["ท้อง"],
  },
  {
    title: "Reverse Fly",
    url: "https://drive.google.com/file/d/1l3fZTjFgfjd6y5-mUgRyNKgqg-MVh9PD/preview",
    description:
      "1. ยกดัมเบลขึ้น โดยงอข้อศอกอย่างเดียว\n2. อย่าให้ศอกเคลื่อนต้องล็อกไว้ข้างลำตัว\n3. จังหวะยกขึ้นให้หายใจออก และเกร็งกล้ามเนื้อแขนไปด้วย\n4. ลดดัมเบลลงช้าๆ หายใจเข้า\n5. พร้อมโฟกัสที่การควบคุม อย่าปล่อยลงเร็วเกินไป",
    equipment: ["เก้าอี้", "ดัมเบล"],
    muscles: ["หัวไหล่"],
  },
  {
    title: "Russian Twist",
    url: "https://drive.google.com/file/d/1RGChQS65G3hgHSAep229yX8dO2VMZ8-N/preview",
    description: "1. บิดเอวไปด้านข้าง เกร็งท้อง สะโพกอยู่กับที่",
    equipment: ["เก้าอี้"],
    muscles: ["ท้อง"],
  },
  {
    title: "Seated Leg Tucks",
    url: "https://drive.google.com/file/d/1Af8huj7KJzUAXi_-zw2C7cXwpcboHKvQ/preview",
    description:
      "1. เหยียดขาออกให้สุดและเอนหลัง\n2. งอขาและดึงเข่าเข้าหาหน้าอก",
    equipment: ["เก้าอี้"],
    muscles: ["ท้อง"],
  },
  {
    title: "Squat",
    url: "https://drive.google.com/file/d/1gYkld_EBKuKKeuQBar886AlJaLdt_mTq/preview",
    description:
      "1. ย่อเข่าลง โดยขณะที่ย่อเข่าต้องไม่ให้หัวเข่าเลยปลายเท้า\n2. ย่อลงให้ได้ 90 องศา",
    equipment: ["-"],
    muscles: ["ขา"],
  },
  {
    title: "Tricep Extension",
    url: "https://drive.google.com/file/d/1hqX6rVzxIRWOhmY3N-enYu7KPwlLE0B4/preview",
    description:
      "1. จับดัมเบลด้วยมือข้างใดข้างหนึ่ง\n2. ยกน้ำหนักขึ้นเหนือศีรษะ แขนเหยียดตรง\n3. ค่อยๆ ลดน้ำหนักลงมาด้านหลังศีรษะ โดยงอข้อศอก\n4. เมื่อรู้สึกถึงการยืดของกล้ามเนื้อ Tricep\n5. ให้ยกน้ำหนักกลับขึ้นไปเหนือศีรษะอีกครั้ง",
    equipment: ["ดัมเบล"],
    muscles: ["หลังแขน"],
  },
  {
    title: "Upright Row",
    url: "https://drive.google.com/file/d/1HbMyQjjcQI76rcKDvk4OeyB3ZZvkrZng/preview",
    description:
      "1. ยืนตัวตรง เท้าห่างกันประมาณความกว้างของไหล่หลังตรง\n2. จับดัมเบลด้วยท่าคว่ำมือ มือห่างกันประมาณความกว้างของไหล่\n3. ยกดัมเบลขึ้นในแนวตรงชิดลำตัว\n4. โดยให้ข้อศอกชี้ออกด้านข้าง\n5. ยกดัมเบลจนถึงระดับเหนือหน้าอกเล็กน้อย",
    equipment: ["ดัมเบล"],
    muscles: ["หัวไหล่"],
  },
];

// Post each video to the API
async function uploadVideos() {
  for (const video of videos) {
    try {
      const res = await axios.post("http://localhost:5000/api/video/", video);
      console.log(`Added: ${video.title}`);
    } catch (err) {
      console.error(
        `Failed to add: ${video.title},`,
        err.response?.data || err.message
      );
    }
  }
}

// Call the function
uploadVideos();
