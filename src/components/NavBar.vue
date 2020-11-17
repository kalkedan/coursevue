<template>
    <div>
        <v-app-bar color="blue">
            <v-toolbar-title ref="toolbar-title">OC Course Plan</v-toolbar-title>
            <v-spacer></v-spacer>
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
        title: "",
        menus: [
            {ref: 'home', name: 'home', text: 'Home', extensions: '"None",eagles.oc.edu,oc.edu'},
            {ref: 'about', name: 'about', text: 'About', extensions: '"None",eagles.oc.edu,oc.edu'},
            {ref: 'courses', name: 'courses', text: 'Courses', extensions: 'eagles.oc.edu,oc.edu'},
            {ref: 'advisors', name: 'advisors', text: 'Advisors', extensions: 'oc.edu'},
            {ref: 'students', name: 'students', text: 'Students', extensions: 'oc.edu'},
            {ref: 'student', name: 'student', text: 'Student Info', extensions: 'eagles.oc.edu'},
            {ref: 'StudentCourses', name: 'StudentCourses', text: 'Course Plan', extensions: 'eagles.oc.edu'},
            {ref: 'login', name: 'login', text: 'Login', extensions: '"None",eagles.oc.edu,oc.edu'},
            {ref : 'logout', name : "logout", text: 'Logout', extensions : 'eagles.oc.edu,oc.edu'}
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
            this.activeMenus = this.menus.filter(menu => menu.extensions.includes("None"));
        }
    },
    methods: {
        menuAction(route) {
            this.$router.push({ name: route })
        }
    }
}
</script>