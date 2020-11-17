<template>
    <div>
        <v-app-bar color="blue">
            <v-toolbar-items>
                <v-btn text v-for="menu in activeMenus" exact :key="menu.name" :ref="menu.ref" link :to="{name:menu.name,}" >{{menu.text}}</v-btn>
            </v-toolbar-items>
        </v-app-bar>
    </div>
</template>

<script>
import Utils from '@/config/utils.js';
export default {
    name: 'App',

    data: () => ({
        user: {},
        str: [],
        menus: [
            {ref: 'home', name: 'home', text: 'Home', extensions: '"",eagles.oc.edu,oc.edu'},
            {ref: 'about', name: 'about', text: 'About', extensions: '"",eagles.oc.edu,oc.edu'},
            {ref: 'courses', name: 'courses', text: 'Courses', extensions: 'eagles.oc.edu,oc.edu'},
            {ref: 'advisors', name: 'advisors', text: 'Advisors', extensions: 'oc.edu'},
            {ref: 'login', name: 'login', text: 'Login', extensions: '"",eagles.oc.edu,oc.edu'}
        ],
        activeMenus : []
    }),

    created () {
        this.user = Utils.getStore('user');
        if(this.user != null) {
            this.str = this.user.email;
            this.str = this.str.split("@");
            this.activeMenus = this.menus.filter(menu => menu.extensions.includes(this.str[1]));

        }
        else {
            this.activeMenus = this.menus.filter(menu => menu.extensions.includes(""));
        }
    },
    methods: {
        menuAction(route) {
            this.$router.push({ name: route })
        }
    }
}
</script>