!function () {
    let view = document.querySelector('section.message');

    let model = {
        initAV: function () {
            console.log(1)
            var APP_ID = 'w3uxzEnSEsFqxgNcYgdnkWAU-MdYXbMMI'
            var APP_KEY = '5IEkYert5bWRhfdHYUWXcyAi'
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        //get data
        fetch: function () {
            var query = new AV.Query('Message');
            return query.find() //promise
        },
        //save data
        save: function (username, phone, email, content) {
            var Message = AV.Object.extend('Message');
            var msg = new Message();
            msg.set('username', username);
            msg.set('phone', phone);
            msg.set('email', email);
            msg.set('content', content);
            return msg.save() //promise
        }
    }

    let controller = {
        view: null,
        model: null,
        messageList: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            this.messageList = document.querySelector('#messageList')
            this.form = document.querySelector('#postMessageForm')
            this.model.initAV()
            this.loadMessages()
            this.bindEvents()
        },

        loadMessages:function () {
            /* var query = new AV.Query('Message');
            query.find() */
            this.model.fetch().then((messages) => {
                let array = messages.map((item) => { return item.attributes })
                array.forEach((item) => {
                    let li = document.createElement('li');
                    li.innerText = `${item.username}: ${item.content} `;
                    this.messageList.prepend(li)
                })
            },
                (err) => { alert('submit fail~! please try again...') })
            // .then(()=>{},(err)=>{console.log(err)});

        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.form
            let username = myForm.querySelector('input[name=username]').value;
            let phone = myForm.querySelector('input[name=phone]').value;
            let email = myForm.querySelector('input[name=email]').value;
            let content = myForm.querySelector('input[name = content]').value;
            this.model.save(username, phone, email, content).then(function (obj) {
                console.log('save successful~!')
                // window.location.reload()
                let li = document.createElement('li');
                li.innerText = `${obj.attributes.username}: ${obj.attributes.content} `;
                let messageList = document.querySelector('#messageList');
                messageList.prepend(li)
                // this.myForm.querySelector('input[name=username]').value ='';
                // this.myForm.querySelector('input[name=phone]').value ='';
                // this.myForm.querySelector('input[name=email]').value ='';
                myForm.querySelector('input[name = content]').value = '';
            })
        }

    };



    controller.init(view, model)









}.call();


