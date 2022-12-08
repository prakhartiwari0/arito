
<p align="center"><img width="350px" src="https://media.giphy.com/media/Q87YAYsdptMDJR4r68/giphy.gif"></p>

# Contributing Guidelines
If you're reading this, you're probably creating a Pull Request or planning to do so and that's great!

In order to keep that process as pleasant as possible for all parties and to maintain a nice repository, please follow the steps below.

**This project is actively looking for contributors!**

Arito is a begginer-friendly project, purely made using HTML, CSS & JavaScript.

I'm happy to welcome all meaningful contributions from anyone. Any contributions are accepted, from fixing grammatical mistakes to implementing complex scripts.
Thank you for helping out and remember, no contribution is too small.

## Before Contributing
Welcome to [Arito](https://github.com/prakhartiwari0/Arito). Before sending your pull requests, make sure that you read the whole guidelines.
If you have any doubt on the contributing guide, feel free to [contact the owner](https://www.heyprakhar.xyz/links/).<br>

**If an issue is already assigned, ask the assigned person before you start working on it.**


# Making a code contribution
Arito currently uses a "fork and pull" model for collaborative software development.

From the [GitHub Help Page of Using Pull Requests:](https://help.github.com/articles/using-pull-requests/)

"The fork & pull model lets anyone fork an existing repository and push changes to their personal fork without requiring access be granted to the source repository. The changes must then be pulled into the source repository by the project maintainer. This model reduces the amount of friction for new contributors and is popular with open source projects because it allows people to work independently without upfront coordination."

## Getting started
* Make sure you have a [GitHub account](https://github.com/signup/free).
* [Create an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue) in our issues tracker (if you are creating an issue, provide complete details of it), assuming one does not already exist.
* Fork the Arito project on GitHub.  For general instructions on forking a GitHub project, see [Forking a Repo](https://help.github.com/articles/fork-a-repo/) and [Syncing a fork](https://help.github.com/articles/syncing-a-fork/).
* Familiarize yourself with the project.

## Contributing Code Changes via a Pull Request
Once you have forked the repo, you need to create your code contributions within a new branch of your forked repo.  For general background on creating and managing branches within GitHub, see:  [Git Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging).
Following are the steps to guide you:

**Step 0:** Clone the forked repo and cd into it
```
https://github.com/<Your username>/Arito.git
cd Arito/
```

**Step 1:** To begin, create a new branch, give a good [branch name](https://codingsight.com/git-branching-naming-convention-best-practices/).You usually create a branch like so:
```
git checkout master
git checkout -b [name_of_your_new_branch]
```

**Step 2:** Now make your changes and then stage your files for commit. 
```
git add [File name]    --> To stage one particular files 
or
git add .              --> To stage all the modified files
```


**Step 3:** Commit all the changes. The commit message should be meaningful, short and to the point. [How to write good commit message.](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/)
```
git commit -m "Write a meaningfull, small commit message"
```

**Step 4:** Now push the changes for review
```
git push origin <name_of_your_new_branch>
```

**Step 5:** After you push your code, github would detect the new branch and an option would be there to create a pull request. 

**Step 6:** The last step is to give a detailed description and short title in your pull request.
* Dont forget to [link your PR with the issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) using specific keywords.
* Provide a screen shot if necessary.

You successfully made a pull request 🥳.

## Getting your changes reviewed
<p>
Once you've submitted your pull request, you want other members of the development community to review whether integrating your change will cause problems for any users or the maintainability of the software. If you know someone who might notice mistakes then mention them in the comments.</p>
<p>
Reviewers may request you to rephrase or adjust things before they allow the changes to be integrated.  If they do, commit the amendments as new, separate changes, to allow the reviewers to see what changed since they last read your code.</p>

## Pull Request Reviewers Guide
If someone requests your review on a pull request, read the title and description and assign any other collaborators who would want to know about the proposed change. If the reporter is interested then assign it to them.

Decide whether you think that your input is needed, and that the PR should wait for your further review before being merged. If not, un-assign yourself as a reviewer and leave a comment.

Happy hacking...!