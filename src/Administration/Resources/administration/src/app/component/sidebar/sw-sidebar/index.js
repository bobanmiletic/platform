import { Component } from 'src/core/shopware';
import template from './sw-sidebar.html.twig';
import './sw-sidebar.less';

Component.register('sw-sidebar', {
    template,

    data() {
        return {
            items: []
        };
    },

    computed: {
        sections() {
            const sections = {};
            this.items.forEach((item) => {
                if (!sections[item.position]) {
                    sections[item.position] = [];
                }
                sections[item.position].push(item);
            });

            return sections;
        }
    },

    methods: {
        _isItemRegistered(itemToCheck) {
            const index = this.items.findIndex((item) => {
                return item === itemToCheck;
            });
            return index > -1;
        },

        registerSidebarItem(item) {
            if (this._isItemRegistered(item)) {
                return;
            }

            this.items.push(item);

            this.$on('sw-sidebar-button-clicked', item.sidebarButtonClick);
            item.$on('sw-sidebar-item-toggle-active', this.setItemActive);
        },

        setItemActive(clickedItem) {
            this.$emit('sw-sidebar-button-clicked', clickedItem);
        }
    }
});
