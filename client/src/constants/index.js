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

// const counterItems = [
//   { value: 2, suffix: "+", label: "Years of Experience" },
//   { value: 10, suffix: "+", label: "Satisfied Clients" },
//   { value: 5, suffix: "+", label: "Completed Projects" },
//   { value: 88, suffix: "%", label: "Client Retention Rate" },
// ];

const counterItems = [
  { value: 1, suffix: "+", label: "Years of Learning" },
  { value: 2, suffix: "+", label: "Personal Projects" },
  { value: 1, suffix: "+", label: "Team Projects" },
  { value: 100, suffix: "%", label: "Commitment to Growth" }
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
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
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
      "Prasan’s understanding of deployment pipelines was a huge asset when we migrated to Render. He set up efficient CI/CD workflows that made our deployments smooth and reliable. What used to take hours and manual steps became automated and predictable. His work gave the team confidence to ship faster without worrying about downtime.",
    imgPath: "/exp/render.png",
    logoPath: "/exp/logo1.png",
    title: "Frontend Developer",
    date: "January 2023 - Present",
    hoverColor: "rgba(30, 144, 255, 0.3)", // Slight bluish color
    responsibilities: [
      "Set up and managed deployment pipelines on Render to ensure smooth and reliable releases.",
      "Configured automated builds and continuous deployment to reduce manual steps and errors.",
      "Monitored application performance and uptime after deployment, quickly addressing any issues.",
      "Collaborated with the development team to streamline the release process and improve delivery speed.",
    ],
  },
  {
    review:
      "Prasan’s work with Express.js was instrumental in building robust and scalable backend APIs. He consistently approached complex problems with a practical mindset, delivering clean and efficient code that made integration seamless.",
    imgPath: "/exp/e2.png",
    logoPath: "/exp/logo3.png",
    title: "Backend Developer", // Changed from Full Stack to Backend Developer
    date: "June 2020 - December 2023",
    hoverColor: "linear-gradient(to right, #ccc, #fff)", // Grey + white
    responsibilities: [
      "Designed and implemented scalable RESTful APIs using Express.js to support web and mobile applications.",
      "Collaborated with frontend teams to ensure smooth data integration and efficient communication between client and server.",
      "Maintained and optimized server-side logic for performance and security.",
      "Participated in code reviews and contributed to improving backend architecture and best practices.",
    ],
  },
  {
    review:
      "Prasan’s full-stack expertise using the MERN stack enabled the delivery of high-quality, efficient mobile and backend solutions. His work enhanced both the user experience and backend reliability, helping the product achieve its goals.",
    imgPath: "/exp/mern.png",
    logoPath: "/exp/logo5.png",
    title: "Full Stack Developer",
    date: "March 2019 - May 2020",
    hoverColor: "rgba(50, 205, 50, 0.3)", // Slight greenish color
    responsibilities: [
      "Developed responsive web applications using React, ensuring a seamless user experience across both mobile and desktop devices, and integrated them with backend APIs built on Node.js and Express.",
      "Designed and maintained backend services and APIs with MongoDB, Express, and Node.js for scalability and reliability.",
      "Optimized app and server performance through thorough testing and code refinement.",
      "Collaborated with product and design teams to implement new features based on user feedback.",
    ],
  },
  {
  review:
    "Prasan consistently delivered high-quality, efficient React components that greatly improved our web application’s performance and usability. His attention to detail and collaborative approach helped align the frontend with our product goals.",
  imgPath: "/exp/react2.png",
  logoPath: "/exp/logo4.png",
  title: "React Developer",
  date: "March 2019 - May 2020",
  hoverColor: "rgba(255, 105, 180, 0.3)", // Slightly pink color
  responsibilities: [
    "Developed interactive and responsive user interfaces using React.js, improving usability across devices.",
    "Collaborated with UI/UX designers to implement pixel-perfect designs and enhance user flow.",
    "Optimized component rendering and performance through smart state management and lazy loading.",
    "Worked closely with backend developers to ensure seamless API integration and data handling.",
  ],
}

];

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
    link: "#"
  },
  {
    name: "fb",
    imgPath: "/images/git3.png",
    link: "https://github.com/prasan-RKP"
  },
  {
    name: "x",
    imgPath: "/images/x.png",
    link: "#"
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    link:"https://www.linkedin.com/in/prasan-kumar-05a623345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
