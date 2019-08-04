!function () {
    // console.log(AV)
    // var asd = 'wocao'
    var view = document.querySelector('section.message');
    var controller = {
      view:null,
      messageList:null,
      init:(view)=>{
          console.log(AV)
          this.view = view
          this.messageList =  document.querySelector('#messageList')
          this.form = document.querySelector('#postMessageForm')
          this.initAV()
          console.log(AV)
          this.loadMessages()
          this.bindEvents()
        },
        initAV:function(){
          console.log(1)
          var APP_ID = 'w3uxzEnSEsFqxgNcYgdnkWAU-MdYXbMMI'
          var APP_KEY = '5IEkYert5bWRhfdHYUWXcyAi'
          AV.init({appId: APP_ID,appKey: APP_KEY })
        },
        loadMessages:()=>{
            var query = new AV.Query('Message');
            query.find()
                .then((messages)=> {
                // console.log(1)
                        let array = messages.map((item)=>{return item.attributes})
                        array.forEach((item)=>{
                            let li = document.createElement('li');
                            li.innerText = `${item.username}: ${item.content} `;
                            this.messageList.prepend(li)
                        })
                    },
                    (err)=>{alert('submit fail~! please try again...')})
            // .then(()=>{},(err)=>{console.log(err)});

        },
        bindEvents:()=>{
            this.form.addEventListener('submit',function (e) {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: ()=>{
            let myForm = this.form
            let username = myForm.querySelector('input[name=username]').value;
            let phone = myForm.querySelector('input[name=phone]').value;
            let email = myForm.querySelector('input[name=email]').value;
            let content = myForm.querySelector('input[name = content]').value;
            var  Message = AV.Object.extend('Message');
            var msg = new Message();
            msg.set('username',username);
            msg.set('phone',phone);
            msg.set('email',email);
            msg.set('content',content);
            msg.save().then(function (obj) {
                console.log('save successful~!')
                // window.location.reload()
                let li = document.createElement('li');
                li.innerText = `${obj.attributes.username}: ${obj.attributes.content} `;
                let messageList = document.querySelector('#messageList');
                messageList.prepend(li)
                // this.myForm.querySelector('input[name=username]').value ='';
                // this.myForm.querySelector('input[name=phone]').value ='';
                // this.myForm.querySelector('input[name=email]').value ='';
                myForm.querySelector('input[name = content]').value ='';
            })
        }

    };


    controller.init(view)









}.call();


