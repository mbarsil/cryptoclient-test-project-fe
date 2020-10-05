# TechnestTestFrontend

## Acknowledgements
For this project, the following graphic resources have been used:
* Bitcoin icon made by <a href="https://www.flaticon.com/authors/bqlqn" title="bqlqn">bqlqn</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>.

## Directory structure

### FE
The project structure follows the one established by the Angular CLI. However the project structure is organized by 
functional/feature modules so it would scale easily. This means that all the resources related to the feature
are contained in a directory and a module is defined for that purpose.

The general purpose services like the ```data-provider.service``` are in their own directory ```services```.
On the other hand feature specific ones are within their modules, in this case, ```accounts```.

### BE
Same happens for all the resources in the backend, generated with the **Nest.js** CLI. The module ```accounts``` was also created
with all its resources inside.

## Design decisions

### FE

* When clicking on a row to go to the account detail, a message is sent to the server to get information
about transactions of that account only. The flow for this in the server is handled reactively, so in case 
an account is updated, a new message is pushed to the client side with the transactions of that account. This channel
is closed when the user navigates away from the detail view.
* Initially, to make sure that the url navigation works, a REST endpoint is also used to get the detailed account information, since
the browser reloads when you directly type a detail view url _(accounts/1)_ and there's no store data in memory.
* The main module in the FE is ```Accounts```.
* From the UI perspective, here's a few elements to note:
  * Angular Material has been used.
  * Bootstrap was added just as an example of how the usage would be in a larger project, making use
  of the spacing and sizing files, that allow rapidly lay out the UI and deal with the most mundane
  taks for spacing, distributing elements with Flexbox...

### BE
* The accounts are updated by adding new transactions to them.
* Due to the requirements, a non-relational data structure has been chosen since it fits the system better,
storing the transactions in the same account object in a document-like fashion.
* Rxjs has been used in the BE to implement this reactive approach.
* The main module in the FE is ```Accounts```.
* momentjs and uniquid have been used for generating dates and unique id's by the requirements.
* 

## Code style
The project has been built following the principles below:
* The Angular style guide, which among others, include these style rules (implemented through TSLint). Being aware
that ESLint already have parsers, TSLint was chosen since the desired rules were all included in the custom
file added to the project, created by the author:
  * Class properties placement depending on visibility.
  * Getters and setters placement.
  * Class methods placement depending on visibility.
  * Spacing (new lines) between assigments and other expressions/statements, `const` declarations...
  * Spacing in curly brackets, objects...
  * Usage of multi-line destructuring and imports...
  * ...

* The Angularjs commit convention. Please check the commit history for specific samples.: *type(scope): subject*.
* Husky has been used to implement Git Hooks to check the code style before pushing to the repository.  


## Known gaps and issues
* The breadcrumbs navigation has not been implemented.
* Due to the nature of how the accounts are updated, by adding new transactions, I was not sure of when the
transactions were supposed to flash. The transactions are done once and the only thing that changes is the
Bitcoin rate, so it made no sense to do it. If anything, the account total dollar balance. However the code
reusability is well reflected even without this use case.


## Pending improvements
* Better error handling.
* Internationalization.
* Loading indicators.
* ...


## Running the app
Download both repositories. Assuming that you have all tools installed (Angular CLI and Nest.js CLI).

### BE\
* Inside the project's directory, run ```npm i```.
* Run ```npm run start:dev```.

### FE
* Inside the folder run ```npm i```.
* Run ```npm start```.


