# Automated Frontend Workflow

In a world where robots have not yet taken our place, we still have to deal with repetitive tasks. We are constantly trying to find the easiest and laziest way to accomplish something, some people call it efficiency. By letting the machine do the tedious part, it could give us more time to work or spend on interesting stuff.

In software development, there are also repetitive tasks that require manual intervention to complete the entire development phase. It's not just coding, there are other steps such as code/performance analysis, testing, build, and deployment, to name a few, and they can become a dull process, especially when you have to trigger them or do them manually.

The tooling used as part of the front-end development process ensures everything is working or is done as expected. Common examples are git, ESLint (linter), jest (testing), and cypress (integration/e2e).

>If you are interested in learning about these tools you can check my other article about [Testing in JavaScript](https://dev.to/helmuthdu/spaceships-and-testing-in-javascript-5b3h)

In this article, you will learn how to use popular front-end tooling and how to integrate and automate them within your workflow.

## Git hooks

Git has a way to fire off custom scripts when certain actions occur, such as `commit` and `push`. There is a [variety of hooks available](https://git-scm.com/docs/githooks), but you can start with these:

- `commit-msg`: Check the commit message format or spelling errors.
- `pre-commit`: Check for errors and enforce project coding standards.
- `pre-push`: Run tests to ensure working software

You can [create them manually](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks), or use [lefthook](https://github.com/evilmartians/lefthook) to simplify the work.

### Lefthook

[Lefthook](https://github.com/evilmartians/lefthook) is a fast and powerful Git hooks manager for Node.js and any other type of project written in Go.

To install [lefthook](https://github.com/evilmartians/lefthook), open the terminal in your project:

```sh
npm install -D lefthook
```

After installing, it will generate a `lefthook.yml` file which can be customized.

For the example project, do some checks and validations before committing the code, all tasks should run in parallel, and use [prettier](http://prettier.io), [eslint](http://eslint.org) or [stylelint](https://stylelint.io) to check, format and fix any file which will be committed and check and run any test related with [vitest](http://vitest.dev) depending on the filetype.

- For `.html`, `.json`, and `.yml` files, reformat with [prettier](http://prettier.io)
- For `.css` and `.scss` files, check the styles with [stylelint](https://stylelint.io) and [prettier](http://prettier.io) after.
- For `.js` and `.ts` files, excluding tests, run [eslint](http://eslint.org) and check related tests with [vitest](http://vitest.dev) after.
- For `.spec.js` and `.spec.ts` tests files run [eslint](http://eslint.org) and the tests with [vitest](http://vitest.dev) after.

This would be the result:


```yaml
commit-msg:
  commands:
    validate:
      run: >
        npx git-conventional-commits commit-msg-hook {1}

pre-commit:
  parallel: true
  commands:
    lint:assets:
      glob: '*.{html,json,yml}'
      run: npx prettier --write {staged_files}
    lint:styles:
      glob: '*.{css,scss}'
      run: >
        npx stylelint --fix {staged_files} &&
        npx prettier --write {staged_files}
    lint:scripts:
      glob: '*[!.{spec,test}].{[tj]s,[tj]sx}'
      run: >
        npx eslint --fix {staged_files} && 
        npx vitest related {staged_files} --passWithNoTests --run --environment jsdom
    test:unit:
      glob: '*.{spec,test}.{[tj]s,[tj]sx}'
      run: >
        npx eslint --fix {staged_files} &&
        npx vitest {staged_files} --run --environment jsdom
```

## GitHub Actions

### Linters

### Testing

### Docs

### Deploy

## Conclusion
