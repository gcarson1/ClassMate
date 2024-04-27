# ClassMate 
By Team RateMyClass (Ryan Peruski, Jake Marlow, Gabe Carson, Chris White)

Final Presentation file can be found [here](https://docs.google.com/presentation/d/1KhkC0MU50GCO5wIaq_6z97T-NfnuFoOuOByaxhJb6n0/edit#slide=id.p).

## Introduction

Our project is a web application that allows students to rate and review their classes. This website takes inspiration from RateMyProfessor, but we made it for specific classes instead of professors. Since professors can teach multiple classes, each of varying difficulty, we made it so that students can rate the class instead of the professor. This will allow students to see what classes are like before they take them, and it provides both reviews from students as well as an average difficulty level, allowing students to make more informed decisions about their classes. Thus, students will have a better experience in their classes, as they know what they are about to get into. We have done the most development towards adding data for UTK, but we have functionality for other schools as well.

## Customer Value

We provide the value of information about classes to students. This way, with this knowledge, students can better prepare for their classes or decide if taking the class is worth it. We hope to provide what RateMyProfessor has failed to provide, as there will now be specific classes. We will know if the project is successful by the number of users and reviews on the website. We also hope to see a lot of feedback from students in order to improve the student experience.

Our users will be students who want information about what a specific class will provide and how difficult the material is, which they can obtain through viewing the class page on our site which provides a 1-5 difficulty rating, 1-5 enrichment rating, and student comments on the class itself.

Other users, including school faculty, can use the site to obtain information about what students think about the curriculum of the class and how the content was used later in their school career and future careers.

## Technology

We used a React framework for a frontend and a Node.js and MSSQL backend. We ended up using MSSQL to communicate with a Microsoft Azure Database, and we had to use Firebase for a user setup, as there were many security functions built into Firebase. We did not end up using Python for data analysis nor the Docker container as much as expected. We ended up just using SQL and JS for any analysis we did, and we only used the Docker container to make sure that we could get our project to work on one machine to use universally. We ended up deploying the website using Vercel, which was different than what we initially started with. 

In the proposal, the main issue we forsaw involved making the website dynamic, user-friendly, and secure, as we can have users edit and add data to the website. This is still a big issue we ended up having, and to fix this, we needed to do extensive testing to ensure that users only have a limited range of what they can put in (such as a use of dropdowns, character limits, and parameterized SQL queries).

(Which technologies worked and which technologies didn't work? I would talk about Heroku, Azure VM services, MySQL, etc. here)

(What tests have we run? Results?)

## Team

We ended up having two members, Ryan Peruski and Gabe Carson, handle the backend and the database, while the other two members, Jake Marlow and Chris White, dealt with the frontend, design, and UX. Over time, team members strayed from contributing equally, and two of the four members ended up leading the group more.

Jake spearheaded the larger frontend projects, such as implementing the middlewear and finalizing website design. Meanwhile Chris handled other frontend tasks, such as the mobile port of the website and class average bar graphs.

(Expand on this more. )

## Project management

Overall, we feel that we have completed all of our goals from this project.

(Expand on this more. Maybe talk about what we thought we would get done vs. what actually got done, although I think we did more than what we initially expected. Some of this can maybe roll over into the reflection section)

## Reflection

-- Sprint 1: For sprint one, our goal was to get some kind of remote database set up and connect that database to the node js backend. All four members ended up helping with this, but the backend developers did research into backend and database management while the frontend developers researched getting basic components set up. We did successfully create the database and do research, but this sprint was far from a "minimum viable system". However, after this sprint, the roadblock of using the database was now gone.

-- Sprint 2: For sprint two, the backend filled the database with all of the tables as well as some basic test data, and they also create necessary add and delete functions for the database. The frontend started with a simple search bar for universities and basic login/signup functionality with Firebase's automatic cookie setups. Unfortunately, this was still not a minimum viable product, but it was getting closer.

-- Sprint 3: For sprint three, teammates filled the database with real reviews. The backend created some necessary query functions and cleaned out the database structure while the frontend created the class search bar, class pages, and a minimal review form. Furthermore, the frontend connected firebase to the Azure database the backend had already made. Finally, the "minimum viable system" has been completed.

-- Sprint 4: The fourth sprint was all about preparing to deploy the website. This is the sprint where we did all the testing for security threats. The backend cleaned up the functions by parameterizing them, making them immune to SQL injection attacks. Also, the frontend fixed the review form to choose only from specific dropdowns, so they could not add "junk" to the database. If a user wants to add a new class, professor, or university, there will be a form to submit that we will curate manually. The frontend was also successfully deployed during this time.

-- Sprint 5: The fifth sprint added some bar graphs to the site, showing the average difficulty and utility values to the class page.

-- Future Sprints: For future sprints, we would want to have the curation for class, professor, and university add forms to be automatic. Furthermore, we would want to make an email verification tool, so that we could check for invalid emails.

We believe this project ended up being a complete success. Although we took almost the entire semester getting to a "Minimum Viable System" as defined in the initial proposal, that was because we did not rush to get the minimum done. Instead, we spent more time in building up a foundation for a bigger and clearer web app, and we believe that this paid off in the long run.

(Expand on this more. Talk about each sprint and what all got done vs what we wanted to get done)

While discussing hosting options, given the assignment, we chose that we would handle it during the last stretch of the project if we had extra time assuming it would not be too complex. I wouldn't say we underestimated the work that we would have to contribute to host a dynamic web app, but I do believe if it was something that we needed, we learned that it is the best option to get that set up in the beginning stages of a project. This is because, with different hosting services that we had access to on a university student's budget (free), it would usually make it easier to host using a certain file structure/architecture or the service is solely for static apps on top of other problems like IP and DNS. Another problem with having to host as an afterthought was that the app was built to run locally using localhost therefore everywhere in the source code that the localhost URL or port was mentioned there would need to be additional logic added to test whether the project is running locally or on our domain and replace the address almost last minute. These issues made it uncertain whether hosting the complete web app would be possible by the deadline.
