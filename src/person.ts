export class Person {
    // 定义实例属性  需要类的的实例才能访问
    age: number = 18;
    readonly sex: string = '男' //只读无法修改

    //定义类属性   类访问
    static names: string = 'sss';
    //static readonly name: string

    sayHello() {
        console.log(this.age)
    }

}


export class Dog {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age
        console.log(this.name, this.age)
    }
}

//泛型
/*
在定义函数和类时，如果遇到类型不明确就可以使用泛型

*/
function fn<T, K>(a: T, b:K):T {
    return a
}
interface inters{
    length: number
}
//表示泛型基于接口实现
function fn1<T extends inters>(a:T):number{
    return a.length
}


class MyClass<T>{
    name: T;
    constructor(name: T) {
        this.name = name
    }
}