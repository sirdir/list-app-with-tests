# Prerequisites

installed nodejs - https://nodejs.org/en current LTS is v20.17.0, but 18 will do as well

# Setup project

Just run this two instructions

`npm install` - install all dependencies

`npx playwright install --with-deps chromium` - install browser(s) needed by playwright and insure that mandatory system dependencies are installed as well. Will take a while to download browser binaries.

# HOW TO USE

Ideally you just need only one command to run tests:

```bash
npm run test
```

Failed test run will trigger report automatically.

But for sucesefull build you have to do it manually:

```bash
npm run report
```

## SIDE NOTES

Tests are located in `./tests/List.spec.ts`

Not a fan to leave comments/notes in code, code should be clean, but I have noted where specific steps are starting by commenting + some explanations

Apart from checking the expected values in html, tests are as well doing visual comparisons of current screenshots vs refreference screenshots located at `./tests/List.spec.ts-snapshots/` folder.
More info can be found at official docs https://playwright.dev/docs/test-snapshots

### Faile build:

Give it a try at lease for the feel of screenshot comparison.

To see failed build:

1. due to screenshot mismatch, you change text inside `./tests/fixtures/note.txt`
2. due to text mistmatch, you can experiment with `toHaveText('changeme')` by for example changing it to `toHaveText('changeme'.toUpperCase())`

By default tests are always running in headed mode, done it for the sace of test assignment visibility.

### update reference screenshots

Existing refreference screenshots can change, due to source code changes, so they as well can be updated. Usually for that purposes on CI there are separate conditional step, where person who run the test is responsible to generate new refference snapshots.

But here is the command to do it locally:

```bash
npm run test-update
```

### Pageobject pattern

Although we have only one page - thje main page (login is skipped as a step), but I have added pageobject patter because I do see that it provide more structure to the code and it becomes more readable. Page(s) are located at `./tests/pages/` folder. For more info please visit official docs https://playwright.dev/docs/pom

### How running test works under the hood.

By running `npm run test` playwright firstly will start webserver for our local reactjs app on port 3000 and after that tests will be run agains this app.

You can start app separatelly to explore it with command:

```bash
npm run start
```
