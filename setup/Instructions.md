# Instructions

## Setup

1. Download the Docker extension for VSCode (and Docker obviously). This will allow you to run the code in a container.
2. IMPORTANT: Also download the Dev Container extension for VSCode. This will allow you to have that plus button.
3. Click on the Docker tab on the left side of the screen.
4. Click the "+" under containers and select "New Dev Container"
5. Select "Azure Function (Node.js)" from the list of options.
6. Trust people
7. Let it run
8. Enjoy your new environment! - Here, you can clone the repo, push, commit, etc. within the repo. It is just like running WSL or SSH in VSCode.
9. Make sure you have docker running whilst in the dev container
10. In case y'all have not done this, here is a list of commands I ran in my terminal to setup

```bash
git clone https://github.com/cs340-24/RateMyClass.git
cd RateMyClass/
git config --global user.email "yhg461@vols.utk.edu" #replace with your info anytime you see my email (obviously)
git config --global user.name "Silverasdf"
ssh-keygen -t ed25519 -C "yhg461@vols.utk.edu" 
cat /home/node/.ssh/id_ed25519.pub #Or wherever the file said it would be -- important to print the public key
#Copy this up to the email and then go to GitHub -> settings -> ssh and gpg keys -> new ssh key then paste the key in the box
```

## Port stuff

1. Luckily, the front end does not have to worry about this, but from the backend, your need to do some port forwarding.
