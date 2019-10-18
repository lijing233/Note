const Promise = require('./promise')

// console.log('1');
// new Promise((resolve, reject) => {
//     console.log('2');
//     resolve(1)
// }).then(
//     value => {
//         console.log('4');
//         console.log('value :', value);
//     },
//     reason => {
//         console.log('reason :', reason);
//     }
// )
// console.log('3');


new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000);
}).then(
    value => {
        return 'hehe' + value
    },
    reason => {
        console.log('reason :', reason);
    }
)
.then(
    value => {
        console.log('value11 :', value);
    },
    reason => {
        console.log('reason11 :', reason);
    }
)