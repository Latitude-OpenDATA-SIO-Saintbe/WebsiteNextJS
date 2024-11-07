# WebsiteNextJS

[![CodeQL](https://github.com/Latitude-OpenDATA-SIO-Saintbe/WebsiteNextJS/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/Latitude-OpenDATA-SIO-Saintbe/WebsiteNextJS/actions/workflows/github-code-scanning/codeql)
[![Docker Compose PR Validation](https://github.com/Latitude-OpenDATA-SIO-Saintbe/WebsiteNextJS/actions/workflows/run-tests.yml/badge.svg)](https://github.com/Latitude-OpenDATA-SIO-Saintbe/WebsiteNextJS/actions/workflows/run-tests.yml)
[![Snyk Security](https://github.com/Latitude-OpenDATA-SIO-Saintbe/WebsiteNextJS/actions/workflows/snyk-security.yml/badge.svg)](https://github.com/Latitude-OpenDATA-SIO-Saintbe/WebsiteNextJS/actions/workflows/snyk-security.yml)

## DEV environnement

1. Open the Project in GitHub Codespaces

    Go to the GitHub repository.
    Click on the "Code" button and select "Open with Codespaces".
    Wait for the Codespace to initialize. Once it's up and running, you will be inside the VS Code environment inside GitHub Codespaces.

2. Launch setup script

```bash
bash infra/setup.sh
```

Run the tests using the following command:

```bash
npm run test
```

The test results will be displayed in the terminal.

To launch the framework in dev Mode:

```bash
npm run dev
```

    Stopping Docker

When you're done working with the container, you can stop it with:

```baash
docker-compose down
```

This will stop and remove the container and also deleted all data from db.
