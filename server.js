import "dotenv/config"; 
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --------------------------------------------------------
// 1. Zaha Cultural Center Knowledge Base (Structured Data)
// --------------------------------------------------------

const zahaKnowledgeBase = {
  "center_info": {
    "name": "Zaha Cultural Center - Khalda",
    "target_age_group": "7 - 16 years old",
    "common_goal": "Refining children's talents, developing skills, and engaging in local and international events.",
    "registration_note": "Academies (Music and Performing Arts) are free. Other teams may require nominal fees.",
    "activities_overview": "Weekly training (artistic, sports, cultural), theater performances, festivals, local/international competitions.",
    "location_participation": "Local (Jerash Festival, Fuheis Festival, City Days) and International (Antalya, Egypt)."
  },
  "common_questions_and_answers": [
    {
      "q_en": "What teams are part of Zaha Cultural Center?",
      "a_en": "Zaha Center includes many teams: Dabke, Ballet, Zumba, Mix Dance, Taekwondo, Theater, Radio, Journalism, Photography, Drawing, Programming, Design, and the Music Academy teams (Guitar, Oud, Violin, Piano, Organ, Drum Jam, Choir).",
      "q_ar": "ما هي الفرق الموجودة في مركز زها الثقافي؟",
      "a_ar": "يضم مركز زها الثقافي فرقًا متعددة مثل: الدبكة، الباليه، الزومبا، المكس دانس، التايكوندو، المسرح، الإذاعة، الصحافة والإعلام، التصوير الفوتوغرافي، الرسم، البرمجة، التصميم، وفرق الأكاديمية الموسيقية (الجيتار، العود، الكمان، البيانو، الأورغ، الدرم جام، والكورال)."
    },
    {
      "q_en": "What is the difference between the academies and normal teams?",
      "a_en": "Academies (like Music and Performing Arts) offer free yearly education for children aged 7–16 with regular training. Normal teams focus more on specific performance training and event participation, and may require a symbolic fee.",
      "q_ar": "ما الفرق بين الأكاديميات والفرق العادية؟",
      "a_ar": "الأكاديميات (مثل الموسيقى والفنون الأدائية) تتيح التعليم بالمجان على مدار السنة للأطفال من 7 إلى 16 سنة. أما الفرق العادية فتركز على التدريب للمشاركات والفعاليات، وقد تتطلب رسومًا رمزية."
    },
    {
      "q_en": "Is joining free or paid?",
      "a_en": "Academy programs (Music, Ballet, Zumba) are free. Other specific activities may have symbolic registration fees.",
      "q_ar": "هل الاشتراك مجاني أم مدفوع؟",
      "a_ar": "الأكاديميات مثل الموسيقى والفنون الأدائية تقدم التعليم بالمجان، بينما بعض الفرق الأخرى قد تتطلب اشتراكًا رمزيًا."
    },
    {
      "q_en": "Does the center participate in local or international events?",
      "a_en": "Yes, both. Teams participate locally (Jerash, Fuheis, Abdali) and internationally (Antalya, Egypt).",
      "q_ar": "هل المركز يشارك في فعاليات داخلية أم خارجية؟",
      "a_ar": "نعم، كلاهما. تشارك الفرق محلياً في مهرجانات مثل جرش والفحيص، ودولياً في أماكن مثل أنطاليا ومصر."
    },
    {
      "q_en": "Who are the trainers?",
      "a_en": "We have expert trainers including Razan Daibes (Dabke), Nancy Atteyat (Ballet/Choir), Dalia Aqrouq (Zumba), Abdullah Shomali (Taekwondo), Yousef Al-Bari (Theater/Radio), and many others listed in our teams section.",
      "q_ar": "من هم المدربون في المركز؟",
      "a_ar": "لدينا نخبة من المدربين منهم رزان دعيس (دبكة)، نانسي عطيات (باليه وكورال)، داليا عقروق (زومبا)، عبدالله شمالي (تايكوندو)، يوسف البري (مسرح وإذاعة) وغيرهم."
    }
  ],
  "teams": [
    // --- Performing Arts ---
    {
      "category": "Performing Arts",
      "name": "Dabke Team",
      "established": 2009,
      "participations": "10+ Local, 3 International",
      "trainer": "Razan Daibes",
      "goals": "Teaching Jordanian folk dances, developing artistic creativity."
    },
    {
      "category": "Performing Arts",
      "name": "Ballet Team",
      "established": 2018,
      "participations": "8+",
      "trainer": "Nancy Atteyat / Nashe' Operations",
      "goals": "Part of Performing Arts Academy. Free education. Improves physical grace."
    },
    {
      "category": "Performing Arts",
      "name": "Zumba Team",
      "established": 2018,
      "participations": "8",
      "trainer": "Dalia Aqrouq",
      "goals": "Part of Performing Arts Academy. Enhances physical fitness."
    },
    {
      "category": "Performing Arts",
      "name": "Mix Dance Team",
      "established": 2018,
      "participations": "9",
      "trainer": "Dalia Aqrouq",
      "goals": "Part of Performing Arts Academy. Enhances creative and physical abilities."
    },
    {
      "category": "Performing Arts",
      "name": "Theater Team",
      "established": 2014,
      "participations": "25+",
      "trainer": "Yousef Al-Bari and Mohammad Jamal",
      "goals": "Teaching theater basics, writing, directing, and boosting self-confidence."
    },
    {
      "category": "Media",
      "name": "Radio Team",
      "established": 2014,
      "participations": "18",
      "trainer": "Mohammad Jamal Amro and Yousef Al-Bari",
      "goals": "Teaching radio hosting, reporting, and proper language skills."
    },
    // --- Martial Arts ---
    {
      "category": "Sports",
      "name": "Taekwondo Team",
      "established": 2015,
      "participations": "Local participations (count unspecified)",
      "trainer": "Abdullah Shomali",
      "goals": "Korean martial art. Develops physical and mental capabilities."
    },
    // --- Music (Young Musicians Academy) ---
    {
      "category": "Music",
      "name": "Guitar Team",
      "established": 2017,
      "participations": "2",
      "trainer": "Imad Qaqish",
      "goals": "Part of Young Musicians Academy. Skill acquisition."
    },
    {
      "category": "Music",
      "name": "Piano Team",
      "established": 2014,
      "participations": "1",
      "trainer": "Ahmad Al-Assaf",
      "goals": "Part of Young Musicians Academy. Skill acquisition."
    },
    {
      "category": "Music",
      "name": "Violin Team",
      "established": 2014,
      "participations": "Unspecified",
      "trainer": "Ahmad Al-Assaf",
      "goals": "Part of Young Musicians Academy. Skill acquisition."
    },
    {
      "category": "Music",
      "name": "Oud Team",
      "established": 2014,
      "participations": "1",
      "trainer": "Hussein",
      "goals": "Part of Young Musicians Academy. Skill acquisition."
    },
    {
      "category": "Music",
      "name": "Organ Team",
      "established": 2014,
      "participations": "Unspecified",
      "trainer": "Hussein",
      "goals": "Part of Young Musicians Academy. Skill acquisition."
    },
    {
      "category": "Music",
      "name": "Drum Jam Team",
      "established": 2014,
      "participations": "26",
      "trainer": "Bashar Khreis",
      "goals": "Learning Eastern and Western rhythms on drums."
    },
    {
      "category": "Music",
      "name": "Choir Team",
      "established": 2017,
      "participations": "8",
      "trainer": "Nancy Atteyat",
      "goals": "Part of Young Musicians Academy. Vocal skills acquisition."
    },
    // --- Visual Arts & Media ---
    {
      "category": "Visual Arts",
      "name": "Photography Team",
      "established": 2008,
      "participations": "15",
      "trainer": "Leon Kaflian",
      "goals": "Introducing photography styles, developing artistic sense. Competitions: Shoman, Jerash."
    },
    {
      "category": "Visual Arts",
      "name": "Drawing Team",
      "established": 2020,
      "participations": "3",
      "trainer": "Yasmine",
      "goals": "Expression of feelings, mental and psychological development."
    },
    {
      "category": "Media",
      "name": "Journalism Team",
      "established": 2010,
      "participations": "2",
      "trainer": "Yasmine",
      "goals": "Writing articles and participating in competitions."
    },
    // --- Tech ---
    {
      "category": "Technology",
      "name": "Programming Team",
      "established": 2021,
      "participations": "1-3 (New team)",
      "trainer": "Mays Alkalel",
      "goals": "Developing mental skills in coding and logic."
    },
    {
      "category": "Technology",
      "name": "Design Team",
      "established": 2021,
      "participations": "1-3 (New team)",
      "trainer": "Mays Alkalel",
      "goals": "Developing mental skills in digital design."
    }
  ]
};

// --------------------------------------------------------
// 2. System Instructions (Persona & Language Rules)
// --------------------------------------------------------

const systemInstructionText = `
You are **Zaha's Intelligence**, the official AI assistant for the **Zaha Cultural Center - Khalda**.

**YOUR CORE DIRECTIVES:**

1.  **LANGUAGE ADAPTABILITY (CRITICAL):** * If the user speaks **Arabic**, you reply in **Arabic**.
    * If the user speaks **English**, you reply in **English**.
    * Switch automatically based on the user's last message.
    * Your main Language is **Arabic**; default to Arabic if unsure.
2.  **SOURCE OF TRUTH:**
    * Use the attached JSON Knowledge Base. It contains a "teams" section and a "common_questions_and_answers" section.
    * **Important:** If a user asks a question that matches one of the "common_questions_and_answers" in the JSON, prioritize using that specific answer.
    * Do not invent facts. If data is missing, say "Information not available."

3.  **PERSONA:**
    * You are helpful, welcoming, and professional.
    * If a user asks "What can I ask you?" or "Help", suggest questions from the "common_questions_and_answers" list (e.g., "You can ask me about the teams, the age limit, or who the trainers are.").

4.  **KEY FACTS:**
    * Target Age: 7 - 16 years.
    * Academies (Music & Performing Arts) are Free.
    * Goal: Refining talents and participation in festivals (Jerash, Fuheis, etc.).

--- START OF KNOWLEDGE BASE ---
${JSON.stringify(zahaKnowledgeBase)}
--- END OF KNOWLEDGE BASE ---
`;

// --------------------------------------------------------
// 3. Server Setup
// --------------------------------------------------------

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --------------------------------------------------------
// 4. API Handler
// --------------------------------------------------------

app.post("/api/gemini", async (req, res) => {
  try {
    const { contents, config, safetySettings } = req.body;

    console.log("🟦 Incoming request to Zaha's Intelligence...");

    // Configure the model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", 
      safetySettings,
      systemInstruction: systemInstructionText,
    });

    // Generate content
    const result = await model.generateContent({
      contents: contents,
      generationConfig: config,
    });

    const responseText = result.response.text();
    console.log("🟩 Response generated successfully.");

    res.json({
      candidates: [
        {
          content: {
            parts: [
              { text: responseText }
            ]
          }
        }
      ]
    });

  } catch (error) {
    console.error("❌ Backend error details:", error);

    let statusCode = 500;
    if (error.message.includes("429")) statusCode = 429;
    else if (error.message.includes("400")) statusCode = 400;

    res.status(statusCode).json({
      error: error.message,
      details: `Error communicating with Gemini API. Status: ${statusCode}.`
    });
  }
});

app.listen(3000, () => console.log("🚀 Zaha Intelligence Server running on port 3000"));