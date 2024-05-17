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