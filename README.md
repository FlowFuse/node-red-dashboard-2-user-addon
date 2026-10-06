# FlowFuse Multiuser (Node-RED Dashboard 2.0 Plugin)

This repository contains a Node-RED Dashboard 2.0 plugin that enhances events emitted from Dashboard with user data. This plugin is designed to be used with FlowFuse, and utilises the `req.session.user` object that is made available by the FlowFuse `nr-launcher` project.

## Checking Installation

Dashboard 2.0 will list the FlowFuse plugin in the "Client Data" tab of the Dashboard Sidebar. If you do not see the plugin listed there, then the plugin is not installed correctly, and the `msg._client.user` object will not be available to you.

## Showing User Info

If you'd like to show information about the currently logged in user, you can use the following code inside a template node:

```vue
<template>
    <Teleport v-if="loaded" to="#app-bar-actions">
        <div class="user-info">
            <img :src="setup.socketio.auth.user.image" />
            <span>Hi, {{ setup.socketio.auth.user.name }}!</span>
    </Teleport>
</template>

<script>
export default {
    data () {
        return {
            loaded: false
        }
    },
    mounted() {
        // code here when the component is first loaded
        console.log('on mounted')
        console.log(this.$store.state.setup?.setup?.socketio?.auth.user)
        this.loaded = true
    }
}
</script>

<style>
    .user-info {
        display: flex; align-items: center; gap: 8px;
    }

    .user-info img {
        width:24px; height: 24px;
    }
</style>
```

## Release process

In this project, the [Release Please](https://github.com/googleapis/release-please) is used to automatically determine the next release version based on the commit messages in the codebase.

By using the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), the project adheres to a standardized format for commit messages, which `Release Please` uses to determine whether the next release should be a major, minor, or patch release.

### Components

1. The `Prepare release` GitHub Action workflow:

    * A Release Please action that analyzes commit messages to determine the type of release required (major, minor, patch) based on the Conventional Commits specification
    * Creates a pre-release pull request with the proposed version bump and changelog
    * Once merged, automatically updates the version number in `package.json` and creates a new release on GitHub with the appropriate changelog

2. The `Lint Pull Request Title` GitHub Action workflow:

    * A workflow that runs on pull request creation and uses the `amannn/action-semantic-pull-request` action to validate that pull request titles follow the Conventional Commits format
    * Together with adjusted default merge commit message, this ensures that all commits merged into the main branch adhere to the expected format, allowing Release Please to function correctly

3. The `Release Publish` GitHub Action workflow:

    * A workflow that runs when a new git tag in `v*.*.*` format is pushed and is responsible for publishing the new version of the package to the npm registry using the `JS-DevTools/npm-publish` action

### Pull Request Title Format

The Conventional Commits preset expects pull request titles to be in the following format:

```
<type>(<scope>): <subject>
```

* Type: Describes the category of the commit. Examples include:
    * `feat`: A new feature (triggers a minor version bump).
    * `fix`: A bug fix (triggers a patch version bump).
    * `perf`: A code change that improves performance (triggers a patch version bump).
    * `refactor`: A code change that neither fixes a bug nor adds a feature (does not trigger a release unless it's accompanied by a BREAKING CHANGE).
    * `docs`: Documentation-only changes (does not trigger a release).
    * `chore`: Changes to the build process or auxiliary tools and libraries (does not trigger a release).
* Scope: An optional part that provides additional context about what was changed (e.g., module, component).
* Subject: A brief description of the changes.

### Handling Breaking Changes

To indicate a breaking change, the exclamation mark `!` should be used immediately after the type/scope:

* `feat!:`
* `fix!:`
* `refactor!:`
