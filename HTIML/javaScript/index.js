// for (let i = 0; i < 128; i++) {
//     document.write(i + "  <span styly='backgroud: lightgreen'>" + String.fromCharCode(i) + '</span><br/>')
// }

// var \u5389\u5bb3 = 1

// console.log(厉害);

// InputElement
//     WhiteSpace
//         <TAB>
//         <VT>
//         <FF>
//         <ZWNBSP>
//         <USP>
//     LineTerminator
//     Comment
//     Token
//         Identifier 
//         keywords
//         Template
//         PrivateIdentifier
//         Punctuator
//         NumericLiteral
//         Literal
            //  Number
            //  String
            //  Boolean
            //  Symbol
            //  null
            //  undefined
            //  Object


Expressions
    Member // Renference 类型（delete assign）
        a.b
        a[b]
        super.b
        super['b']
        new.target
        new Foo()
    new
        new Foo
    Call
        foo()
        super()
        foo()['b']
        foo().b
    Left Handside & Right Handside

    Update 
        a++
        a--
        ++a
        --a
    Unary
        delete a.b
        void foo()
        typeof a
        + a
        - a
        ~ a
        ! a
        await a




function cls1(s){
    console.log(s);
}

function cls2(s){
    console.log("2", s);
    return cls1;
}

new new cls2("good") // 2 good