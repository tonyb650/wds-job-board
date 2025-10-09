# WDS Job Board
<a id="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://courses.webdevsimplified.com/">
    <img src="https://courses.webdevsimplified.com/content-assets/public/eyJhbGciOiJIUzI1NiJ9.eyJvYmplY3Rfa2V5IjoiY2IxbHg1eHJ4YXNvMnlocGl3cjg3cnUyamlteCIsImRvbWFpbiI6ImNvdXJzZXMud2ViZGV2c2ltcGxpZmllZC5jb20ifQ.sih852orbsVSqbH_Ks85JUnpFSN_KbXaS39KKMM_WhM" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">React Simplified - Bonus Project </h3>

  <p align="center">
    A front-end React project that serves a capstone for WDS "React Simplified" course.
    <br />
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
### Summary
This is a bonus project included with the "React Simplified" course offered by Kyle Cook (a.k.a. Web Dev Simplified). It is designed to provide a more workplace-like experience for learning compared with a typical code-along project.
### The Instructions
To see the full instructions from Kyle, navigate to OG_README.md

The instructions were given as a set of 5 repository issues on GitHub. After a brief simulated introduction from a fictional "Front End Lead" and "Back End Lead", the learner is expected to start working on the project, starting with Issue #1 

A key difference from a typical code-along is: "how things will be explained about the existing code. Instead of me laying out everything you need to know about the project I will instead treat you as if you are a brand new developer on a team working on this project. This means that the instructions for how the code works will come in the form of the team lead for the project introducing you to the code and project. This is also very important to learn as most developers are not given a full explanation of how the code works. They are given a brief overview of the project and then they need to figure out how the code works on their own."

The 5 issues to address are:
1. Navbar and Light Dark Mode
2. User Authentication
3. Create, Edit and Delete Jobs Listings
4. Integrate Stripe Payments
5. Build Public Job Listing Page

### My approach
To get the maximum learning out of this project, I followed this approach:
1) Build a small chunk of it myself until it is working
2) Once it is working, compare that section with Kyle's code from the repo
3) Refactor my work so that the overall structure stays on track with Kyle's without copying line for line
4) Repeat this until finishing a "ticket"
5) Watch the video for that "ticket" and refactor again as I go, listening to Kyle's explanations and taking focussed notes.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
[![React][React.js]][React-url]\
[![Vite][Vite.dev]][Vite-url]\
[![Stripe][Stripe.com]][Stripe-url]\
[![TailwindCSS][TailwindCSS.com]][Tailwind-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

#### Node and NPM are required.
  ```sh
  npm install npm@latest -g
  ```

#### Back End
The back end code and instructions are available here: https://github.com/WebDevSimplified/React-Simplified-Bonus-Project/tree/main/job-board/after/api

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/tonyb650/wds-job-board.git
   ```
2. Install packages with `npm`
   ```sh
   cd wds-job-board && npm install
   ```
3. Create `.env` file and populate with environment variables. See `.env.example`
4. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```
5. Run the application
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

![Public Job Listings Screen Shot][public-job-listings-screenshot]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

This was a learning project only and there will be no further development.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Tony Brierly

[![LinkedIn][linkedin-shield]][linkedin-url]

Deployed project: [tbd.com](https://tbd.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
* [Web Dev Simplified](https://courses.webdevsimplified.com/)
* [ShadCN](https://ui.shadcn.com/)
* [Best Readme Template](https://github.com/othneildrew/Best-README-Template)
* [Img Shields](https://shields.io)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[public-job-listings-screenshot]: public/public_job_listings_screenshot.png

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/tony-brierly

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Vite.dev]: https://img.shields.io/badge/Vite-35495E?style=for-the-badge&logo=vite&logoColor=8280ff
[Vite-url]: https://vite.dev/

[Stripe.com]: https://img.shields.io/badge/Stripe-20232A?style=for-the-badge&logo=stripe&logoColor=635BFF
[Stripe-url]: https://stripe.com/

[TailwindCSS.com]: https://img.shields.io/badge/tailwindcss-041f30?style=for-the-badge&logo=tailwindcss&logoColor=00bcff
[Tailwind-url]: https://tailwindcss.com
