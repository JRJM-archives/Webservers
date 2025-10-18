let add
let storage = []
let stairs = []

// fibonacci adder function

function addRecurs(int) {
    if(int in storage) {
        //console.log(storage)
        return storage[int]
    }

    if(int <= 2) {
        add = 1
        return add
    } else {
        add = addRecurs(int-1) + addRecurs(int-2)
        storage[int] = add
        
        return add
    }

}

// number of ways to climb stairs is always fib(number+1)

function climbStairs(int) {
    return stairs[int] = addRecurs(int+1)
}

console.log(addRecurs(6))

console.log(climbStairs(4))