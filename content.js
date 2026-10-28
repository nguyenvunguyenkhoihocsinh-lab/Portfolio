window.PORTFOLIO = {

  /* ---------- Site-wide information ---------- */
  site: {
    name: "Nguyen Vu Nguyen Khoi",
    nickname: "Cube-tie Guy",
    tagline: "Driven by curiosity, grounded in reality.",
    intro: "I'm a student interested in computer science, artificial intelligence, and the way people think. I enjoy exploring questions, building projects, and finding patterns in unexpected places.",
    email: "nguyenvunguyenkhoi.hocsinh@gmail.com",
    links: [
      { label: "GitHub", url: "" },     // e.g. "https://github.com/your-username"
      { label: "LinkedIn", url: "" }
    ]
  },

  /* ---------- The six cube faces / pages ----------
     `face` is the position on the cube; `color` is the sticker colour.
     Keep the six faces unique. Opposite faces (as on a real cube):
     front/back, left/right, top/bottom. */
  sections: [
    { id: "about",        file: "about.html",        num: "01", title: "About Me",              short: "About",        color: "red",    face: "front",  blurb: "Who I am and what drives me." },
    { id: "education",    file: "education.html",    num: "02", title: "Education",             short: "Education",    color: "blue",   face: "right",  blurb: "Schools, subjects and coursework." },
    { id: "projects",     file: "projects.html",     num: "03", title: "Projects",              short: "Projects",     color: "yellow", face: "top",    blurb: "Things I have built, studied or explored." },
    { id: "achievements", file: "achievements.html", num: "04", title: "Achievements",          short: "Achievements", color: "green",  face: "left",   blurb: "Awards, competitions and personal milestones." },
    { id: "activities",   file: "activities.html",   num: "05", title: "Activities & Interests", short: "Activities",  color: "orange", face: "back",   blurb: "Life beyond the classroom." },
    { id: "goals",        file: "goals.html",        num: "06", title: "Future Goals",          short: "Future Goals", color: "white",  face: "bottom", blurb: "Where I want to go academically." }
  ],

  /* ---------- Page content ----------
     Block types: text, split, facts, chips, timeline, projects, groups,
     entries, interests, list. See the examples below. */
  pages: {

    about: {
      intro: "A curious mind, a growing collection of questions, and a few too many Rubik's cubes.",
      blocks: [
        {
          type: "split",
          title: "Profile",
          paragraphs: [
            "I'm a high school student from Vietnam interested in computer science, artificial intelligence, and the ways technology shapes our lives. What fascinates me isn't just how systems work, but how they interact with people. I've become particularly curious about why misleading information spreads online and why people sometimes believe claims that seem questionable at first glance.",
            "Outside the world of code, I enjoy solving Rubik's cubes, spotting patterns, and exploring ideas that don't always fit neatly into one subject. I like the process of figuring things out: testing an approach, questioning an assumption, and trying again when something doesn't work. I also appreciate a good joke, even if my own occasionally needs more debugging than my code."
          ],
          image: { src: "https://i.postimg.cc/nr5hWmGy/1792866560226-139158395809992614-48972867510521317-9b1982824f302128ebe4b1ef94ea2403.jpg", alt: "", portrait: true }
        },
        {
          type: "facts",
          title: "At a glance",
          items: [
            ["Based in", "Hanoi, Vietnam"],
            ["School", "Hanoi-Amsterdam High School for the Gifted"],
            ["Academic focus", "Computer Science"],
            ["Contact", "nguyenvunguyenkhoi.hocsinh@gmail.com"]
          ]
        },
        {
          type: "text",
          title: "What I value",
          paragraphs: [
            "I value curiosity over assumptions, progress over perfection, and technology that puts people first. Whether I'm questioning an idea, solving a puzzle, or building a project, I believe the best solutions come from looking beyond the obvious and understanding the people behind the problem."
          ]
        }
      ]
    },

    education: {
      intro: "Not just what I learned, but how I learned to question, explore, and connect ideas.",
      blocks: [
        {
          type: "timeline",
          title: "Academic journey",
          items: [
            {
              meta: "2024-2027",
              title: "Hanoi-Amsterdam High School for the Gifted",
              subtitle: "High School · Vietnam",
              body: "Building a foundation in computer science while exploring ideas beyond the classroom.",
              
            },
            {
              meta: "Learning Beyond the Classroom",
              title: "Self-directed exploration",
              subtitle: "[PROGRAMME OR GRADE LEVEL]",
              body: "Exploring computer science, artificial intelligence, and the ways technology shapes human decisions.",
              points: []
            }
          ]
        },
        {
          type: "chips",
          title: "Areas of exploration",
          groups: [
            { label: "Technology", items: ["Computer science", "Artificial intelligence", "Web development"] },
            { label: "Technology", items: ["Human behaviour", "Misinformation"] }
          ]
        },
        {
          type: "entries",
          title: "Milestones & qualifications",
          items: [
            { meta: "2026", title: "SAT — 1520" },
            { meta: "2026", title: "Ielts — 7.5" }
          ]
        }
      ]
    },

    projects: {
      intro: "[PAGE INTRODUCTION] A short paragraph about the kinds of projects you like to work on.",
      blocks: [
        {
          type: "projects",
          title: "Selected projects",
          items: [
            {
              title: "VN-KomPass",
              year: "2026",
              role: "Co-developer",
              summary: "An AI-powered travel assistant designed to help users explore Vietnam through personalized itineraries, destination discovery, and conversational guidance.",
          
              images: [ { src: "https://i.postimg.cc/5t6P2Nh1/Anh-chup-man-hinh-2026-10-28-180205.png", alt: "" } ],
              links: { github: "", demo: "" }
            },
            {
              title: "Hybrid AI Models for Crypto Asset Trading and Risk Control",
              year: "2026",
              role: "CO-AUTHOR",
              summary: "Exploring the integration of deep learning and reinforcement learning for cryptocurrency trading and risk management under volatile market conditions.",
              
              links: {paper: "https://ikprress.org/index.php/JOBARI/article/view/10251", github: "", demo: "" }
            }
          ]
        }
      ]
    },

    achievements: {
  intro: "From computational thinking to AI and mathematics, these achievements reflect my curiosity and drive to solve unfamiliar problems.",
  blocks: [
    {
      type: "groups",
      title: "Recognition",
      groups: [
        {
          label: "Awards",
          items: [
            {
              meta: "2026",
              title: "Potential Excellence Award",
              subtitle: "Tekmonk Coding Olympiad 2026",
              body: "Recognized for my potential in applying AI and web development to solve practical problems through technology.",
              images: [
    {
      src: "https://i.postimg.cc/4dhBzfQc/Anh-chup-man-hinh-2026-10-28-183428.png",
      alt: "Potential Excellence Award at Tekmonk Coding Olympiad 2026"
    }
  ]
            },
            {
              meta: "2025",
              title: "Silver Award",
              subtitle: "Online International Math Challenge (IMC)",
              body: "Recognized for mathematical reasoning and problem-solving in an international mathematics competition."
            }
          ]
        },
        {
          label: "Computational Thinking",
          items: [
            {
              meta: "2025",
              title: "High Distinction",
              subtitle: "Vietnam Computational Thinking Challenge (Bebras)",
              body: "Demonstrated logical reasoning and computational thinking through challenges involving computational concepts.",
                            images: [
    {
      src: "https://scontent.fhan4-2.fna.fbcdn.net/v/t39.30808-6/658844467_1649490703201287_7895562932104529169_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=s2048x1365&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFn1chkhpG0Y9RoBR5YwLn9eupS3PAOnE966lLc8A6cT_w4BYBIEL_V44qzSmPBFf1HDZw3mv6SFYhTK8DCfl8Y&_nc_ohc=P-Doi9ZyV6UQ7kNvwHkm-4t&_nc_oc=AdotuBIoJk_FDOuaHc_7sovvji0L_QM-IVDr9QONU_rIJTByDkuM1FKGYZVwaK6CGjXNbG9gq5AK66TpmzWUNWHW&_nc_zt=23&_nc_ht=scontent.fhan4-2.fna&_nc_gid=eDpb8y7BENKhGzVBPSRb1Q&_nc_ss=7b2a8&oh=00_AQSjpZZ8JYGkJ_924tZqX0qHOVjotLp4lppXizqaLVIGZA&oe=6AE79A99",
      alt: "Potential Excellence Award at Tekmonk Coding Olympiad 2026"
    }
  ]
            }
          ]
        }
      ]
    },
    {
      type: "text",
      title: "What connects them",
      paragraphs: [
        "These experiences reflect my interest in approaching unfamiliar problems from different angles, whether through mathematical reasoning, computational thinking, or emerging technology. Each has encouraged me to look beyond familiar methods, recognize patterns, and explore new ways to solve problems."
      ]
    }
  ]
},

  
activities: {
  intro: "Beyond the classroom, I enjoy bringing people together through chess, sharing technology with younger students, and finding small ways to make everyday experiences more engaging. These activities have taught me to think ahead, communicate clearly, and take responsibility for things that happen behind the scenes.",
  blocks: [
    {
      type: "entries",
      title: "Activities",
      items: [
        {
          meta: "[2024 – 2025]",
          title: "Ams Chess Academy (ACA)",
          subtitle: "Chess Tournament Operations & Match Arbitration",
          body: "Supported the Hanoi Summer Chess Championship, Chess Tour, and Hanoi Chess Tournament by coordinating venue setup, managing equipment and participant check-ins, assisting parents and attendees, and arbitrating matches. Working across different venues taught me to stay organized, respond to unexpected situations, and help competitions run smoothly as part of a team.",
          tags: ["Chess", "Event Operations", "Teamwork"],
          images: [
            {
              src:"https://i.postimg.cc/T2Zk0DKr/1793190656998-139158395809992614-48972867510521317-64cb0ee31be35f946e47168359164130.jpg",
              caption: ""
            }
          ]
        },
        {
          meta: "[2025 – 2026]",
          title: "AzureAms Programming Club (AAPC)",
          subtitle: "Programming Education & Communications",
          body: "Contributed to the club's outreach by writing and managing Facebook promotional posts, developing content ideas to engage prospective members, and preparing programming lesson materials for middle school students. I enjoyed making technical concepts more approachable, whether through a lesson plan or a post that encouraged someone to explore coding.",
          tags: ["Programming", "Teaching", "Communication"],
          images: [
            {
              src:"https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/768990787_122256662966136057_1018667786782110875_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=s2048x1365&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEtHb1Kt3SVmKgTORzCjVNk_ds5PI0g2dr92zk8jSDZ2i3D4Pk9mMozwvKOWw6qlAVflsdszVMOXim4zcdSR4Rg&_nc_ohc=msZeMyXeVaIQ7kNvwFRqOx4&_nc_oc=Adru2LNJ9pmKItSKr4vQqofiY24zHgXf-Leu-lTGPOWZ1eKzyRYBIvyqP1hrgSPPV8qG00NV4LsLCi4ZUn8hRrxz&_nc_zt=23&_nc_ht=scontent.fhan4-1.fna&_nc_gid=qNQEnR8l8lUCVKb8F9o2MA&_nc_ss=7b2a8&oh=00_AQQW1zLEEPTFH0pB21m1sh9iUuXrqBFlzcdhf1gvB1XWKA&oe=6AE7A251",
              caption: ""
            }
          ]
        },
        {
          meta: "2026",
          title: "Hospital Meal Distribution",
          subtitle: "Volunteer",
          body: "Participated in distributing meals to people at a hospital. The experience gave me an opportunity to contribute through a simple, practical act of service and reminded me that small gestures can matter in people's everyday lives.",
          tags: ["Community Service", "Volunteering"],
          images: [
            {
              src:"https://i.postimg.cc/wBp8Gr3h/1793191186920-139158395809992614-48972867510521317-597c95a4836e69e230c0cf3fcdff2837.jpg",
              caption: ""
            }
          ]
        }
      ]
    },
    {
      type: "interests",
      title: "Interests",
      items: [
        {
          name: "Chess",
          note: "I enjoy looking several moves ahead, weighing possibilities, and discovering how one small decision can change an entire game."
        },
        {
          name: "Rubik's Cube",
          note: "Solving a cube is a satisfying mix of pattern recognition, efficient algorithms, and the challenge of turning a seemingly chaotic scramble into order."
        },
        {
          name: "Dad Jokes",
          note: "I like finding unexpected connections between words and ideas. A good joke is a tiny puzzle: the best part is the moment everything clicks."
        }
      ]
    }
  ]
},



goals: {
  intro: "I want to study computer science not only to build intelligent systems, but also to understand how people interact with them. In the future, I hope to create technology that helps people navigate information more thoughtfully, make better decisions, and see beyond what a screen presents.",
  blocks: [
    {
      type: "text",
      title: "Academic direction",
      paragraphs: [
        "I plan to study Computer Science, exploring artificial intelligence, data science, and human-computer interaction. I am especially interested in why people trust certain information, how misleading content shapes their decisions, and whether AI can help people evaluate claims without replacing their own judgment. I want to understand both how intelligent systems work and how they affect the people who use them."
      ]
    },
    {
      type: "timeline",
      title: "Roadmap",
      items: [
        {
          meta: "Next 12 months",
          title: "Build a stronger foundation",
          subtitle: "",
          body: "Strengthen my programming, mathematics, and statistical reasoning while developing projects that connect AI with real-world problems. I also hope to keep learning through research, collaboration, and feedback from people who use what I build.",
          points: []
        },
        {
          meta: "During university",
          title: "Explore AI and human behavior",
          subtitle: "",
          body: "Study machine learning, data science, and human-computer interaction; join research or interdisciplinary projects; and experiment with ways to make AI systems more transparent, useful, and aware of their limitations.",
          points: []
        },
        {
          meta: "Long term",
          title: "Build technology people can trust",
          subtitle: "",
          body: "Develop human-centered AI tools that help people assess online information, recognize uncertainty, and make informed decisions. I hope to contribute to technology that does more than produce answers: it helps people understand why those answers deserve—or do not deserve—their trust.",
          points: []
        }
      ]
    },
    {
      type: "chips",
      title: "Fields I want to explore",
      groups: [
        {
          label: "",
          items: [
            "Artificial Intelligence",
            "Data Science",
            "Human-Computer Interaction"
          ]
        }
      ]
    },
    {
      type: "list",
      title: "What I am looking for",
      items: [
        "Research opportunities where I can explore AI, misinformation, and human decision-making.",
        "Interdisciplinary communities that connect computer science with psychology, communication, and social impact.",
        "Opportunities to build, test, and improve technology collaboratively with real users."
      ]
    }
  ]
},

  }
};
