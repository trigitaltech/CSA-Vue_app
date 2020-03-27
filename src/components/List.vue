<template>
    <v-card>
        <v-toolbar dark>
            <v-btn icon dark @click="$emit('close')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ planName }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="mt-6 ml-3" style="width: 250px">
                <v-text-field
                    label="Search"
                    v-model="search"
                    append-icon="search"
                />
            </div>
        </v-toolbar>
        <v-card-text class="channel-container">
            <template v-for="(channel, idx) in channels">
                <div
                    v-if="!search || search && channel.channelName.includes(search.toUpperCase())"
                    class="d-flex channel-wrap"
                    :key="idx"
                >
                    <div class="channel d-flex">
                        <div class="channel-image">
                            <img :src="staticServer + '/' + safe(channel.imageLink)" />
                        </div>
                        <div class="d-flex">
                            <div class="name">
                                {{ channel.channelName }}
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            staticServer: 'http://203.192.229.164:8081',
            search: '',
        }
    },
    props: {
        channels: Array,
        planName: String
    },
    methods: {
        safe(name) {
            return (name !== 'NA' && name !== null && name !== undefined) ? name : 'channel_logo.png' 
        }
    }
}
</script>

<style>
    .channel-container {
        display: flex;
        flex-wrap: wrap;
        height: 350px;
    }
    .channel-image img{
        height: auto;
        width: 50px;
    }
    .channel-wrap {
        width: 200px;
        margin: '10 auto 10 auto';
        align-items: center;
        justify-content: center;
        margin: 20px 0 0 0;
    }
    .channel {
        width: 600px;
    }
    .channel div:nth-child(2) {
        margin-left: 20px;
    }
    .channel .name {
        margin-top: 5px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
    }
</style>