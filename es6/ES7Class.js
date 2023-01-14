class Search {
    //静态属性
    //ES6规范
    // static num() {
    //     return 10;
    // }
    //ES7规范
    static num = 10;

    //私有属性
    constructor() {
        this.keyValue = '';
    }
    //装饰器
    // @readOnly
    //私有属性
    url = 'urlA-';
    //原型属性
    getCount() {
        console.log('发送请求');
    }
}

var oS = new Search();