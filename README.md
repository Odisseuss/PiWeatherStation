# Raspberry Pi Weather Station Software

## How to work on this repo:

Fork the repo on your profile and create a branch for what you are going to work on.
After you finish, create a pull request and after what you did is checked i will merge it in the repo.

## Best practice rules:

#### Make sure to give meaningful comments to you commits and meaningful names to your branches

#### Name your branches as follows:

For features put "feature_branchname".
For fixes or bugfixes put "fix_branchname".

If the branch name has multiple words separate them with "-"

### Miscellaneous rules:

##### When installing packages with npm:

If the package you install is required to run the project, add the --save flag to the npm install command like this:

```
npm install package_name --save
```

In this case **DO NOT INSTALL IT GLOBALLY** (by using `npm install -g package_name`)

If the package is not required by the app, but just by you in order to develop the app (meaning it's a "dev-dependency") do it like this:

```
npm install package_name --save-dev
```
