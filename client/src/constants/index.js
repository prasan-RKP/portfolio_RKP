const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];



const counterItems = [
  { value: 1, suffix: "+", label: "Years of Learning" },
  { value: 2, suffix: "+", label: "Personal Projects" },
  { value: 1, suffix: "+", label: "Team Projects" },
  { value: 100, suffix: "%", label: "Commitment to Growth" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Good Quality Work",
    desc: "I always try to do my best and make sure everything looks and works great.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Easy to Talk To",
    desc: "I keep you updated and explain things clearly so you always know what's going on.",
  },
  {
    imgPath: "/images/time.png",
    title: "Finish On Time",
    desc: "I complete the work when I say I will, without rushing or missing important things.",
  },
];

const techStackImgs = [
  {
    name: "mongoDB",
    imgPath: "/mern/MongoDB.png",
  },
  {
    name: "ExpressJS",
    imgPath: "/mern/Express.png",
  },
  {
    name: "React",
    imgPath: "/mern/React.png",
  },
  {
    name: "nodeJS",
    imgPath: "/mern/Nodejs.png",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    // "/models/react_logo-transformed.glb"
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review:
      "I used Render to host and manage my portfolio project. I set up automatic deployments so that every time I updated the code, the latest version went live without doing anything manually. This helped me save time, avoid mistakes, and keep my site always up-to-date and running smoothly.",
    imgPath: "/exp/render.png",
    logoPath: "/exp/logo1.png",
    title: "Frontend Developer",
    date: "January 2023 - Present",
    hoverColor: "rgba(30, 144, 255, 0.3)", // Slight bluish color
    responsibilities: [
      "Deployed my portfolio project on Render, a hosting platform.",
      "Set up automatic deployment so changes go live after pushing code to GitHub.",
      "Kept the site updated and running smoothly without manual work.",
      "Learned how to handle deployment, environment variables, and performance monitoring.",
    ],
  },

  {
    review:
      "I used Express.js to build the backend of my project. It helped me create routes and APIs to send and receive data between the frontend and the database. I focused on writing clean, simple code that made my app work smoothly and reliably.",
    imgPath: "/exp/e2.png",
    logoPath: "/exp/logo3.png",
    title: "Backend Developer",
    date: "June 2020 - December 2023",
    hoverColor: "linear-gradient(to right, #ccc, #fff)", // Grey + white
    responsibilities: [
      "Built backend routes and RESTful APIs using Express.js for handling user and data requests.",
      "Connected the frontend with MongoDB through secure and organized API endpoints.",
      "Handled form submissions, user actions, and other data operations with proper error handling.",
      "Focused on clean and readable code to make future changes and debugging easier.",
    ],
  },
  {
    review:
      "I built a full-stack project using the MERN stack (MongoDB, Express.js, React, Node.js). I handled everything from designing the frontend to setting up the backend and connecting it to a database. This project helped me learn how all parts of a web app work together smoothly.",
    imgPath: "/exp/mern.png",
    logoPath: "/exp/logo5.png",
    title: "Full Stack Developer",
    date: "March 2019 - May 2020",
    hoverColor: "rgba(50, 205, 50, 0.3)", // Slight greenish color
    responsibilities: [
      "Created a responsive frontend using React for both mobile and desktop users.",
      "Built backend APIs using Express.js and Node.js to handle data and user actions.",
      "Connected the backend with MongoDB to store and manage data.",
      "Improved app speed and fixed bugs by testing and cleaning up the code regularly.",
    ],
  },
  {
    review:
      "I focused on building the frontend of my project using React.js. I created clean and responsive components that worked well on both desktop and mobile. This helped me improve the look and feel of the app while also making it faster and easier to use.",
    imgPath: "/exp/react2.png",
    logoPath: "/exp/logo4n.png",
    title: "React Developer",
    date: "March 2019 - May 2020",
    hoverColor: "rgb(48 125 228 / 30%)", // Slightly pink color
    responsibilities: [
      "Built user interfaces using React.js with reusable and well-structured components.",
      "Made the design responsive to ensure smooth experience on both mobile and desktop screens.",
      "Used state and props to manage data and control how components behaved.",
      "Connected the frontend to backend APIs and handled loading and displaying data.",
    ],
  },
];

//rgb(48 125 228 / 30%)
//rgba(255, 105, 180, 0.3)

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
    link: "#",
  },
  {
    name: "fb",
    imgPath: "/images/git3.png",
    link: "https://github.com/prasan-RKP",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
    link: "#",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    link: "https://www.linkedin.com/in/prasan-kumar-05a623345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
