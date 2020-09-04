const app = new Vue({
    el: '#app',
    data: {
        title: 'Nestjs Websockets Chat',
        name: '',
        text: '',
        messages: [],
        socket: null
    },
    methods: {
        sendMessage() {
            if (this.validateInput()) {
                const message = {
                    name: this.name,
                    text: this.text
                }
                this.socket.emit('msgToServer', message)
                this.text = ''
            }
        },
        receivedMessage(message) {
            this.messages.push(message)
        },
        validateInput() {
            return this.name.length > 0 && this.text.length > 0
        }
    },
    created() {
        let { origin } = window.location;
        this.socket = io(`${origin}`, {
            query: 'token=abc'
        });
        this.socket.on('msgToClient', (message) => {
            this.receivedMessage(message)
        })
        this.socket.on('msgToClient2', (message) => {
            console.log('msgToClient2', message);
        })
    }
})