class PostOffice{

    constructor(){
        this.letterQueue = new Queue();
        setInterval(async () => {
            try{
                await this.sendLetter();
            }catch(error) {
                console.log(error);
            }
        }, 5000);
    }

    async queueLetter(letter){
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
               resolve(this.letterQueue.enqueue(letter));
               console.log('Pismo uspesno dodato u queue!');
            }, 3000)
        });
    }

    async sendLetter(){
        if (this.letterQueue.isEmpty()){
           throw new Error('Queue is currently empty!');
        } else {
            let obecanje = new Promise((resolve, reject) => {
                setTimeout(() =>{
                    let letter = this.letterQueue.dequeue();
                    Math.random() < 0.1
                        ? letter.reciever.recieve(letter)
                        : reject(new Error('Letter was not sent!'))
                } , 3000)
            })
            
        }
    }
}

class Customer{

    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    recieve(letter){
            console.log('Od: ' + letter.sender.firstName + ' ' + letter.sender.lastName + '  Sadrzaj: ' + letter.content);
    }
}

class Letter{

    constructor(sender, reciever, content){
        this.sender = sender;
        this.reciever = reciever;
        this.content = content;
    }

}

class Queue{

    constructor(){
        this.queue = [];
    }

    enqueue(element){
        this.queue = [...this.queue, element];
    }

    dequeue(){
        return this.queue.shift();
    }

    front(){
        this.queue[0];
    }

    isEmpty(){
        return (this.queue.length === 0);
    }
}

var posta = new PostOffice();
var saljac = new Customer('Zoran', 'Jovic');
var primac = new Customer('Lale', 'Rodic');
var kizoSalje = new Letter(saljac, primac, 'Djes lale nisam te vido 100 godina!');
var laleUzvraca = new Letter(primac, saljac, 'Eve me des ti?!');
posta.queueLetter(kizoSalje);
posta.queueLetter(laleUzvraca);