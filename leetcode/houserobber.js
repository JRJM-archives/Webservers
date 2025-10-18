const houses = [1, 3, 5, 7]


// robbing houses (indexes) that are one apart from each other and finding the max
// sub problem: basically houses[i] + houses[i+2], incrementing i until it reaches houses.length,
//              then finding the maximum value of all the results stored in an array (cache) (memoization)
// rules:
//     1) the houses array has to contain more than 2 values 
//     2) must add the next entry after the neighbor of houses[i]
//     3) results must be contained in cache to be called later (returned)

function robHouses(houses) {
    const memo = new Map()
    
    const robRecurs = (i) => {
        if(i < 0) return 0
        if(memo.has(i)) return memo.get(i)
        
        const result = Math.max(
            robRecurs(i - 1),
            houses[i] + robRecurs(i - 2)
        )

        memo.set(i, result)
        return result
    }

    return robRecurs(houses.length - 1)
    
}

let max = robHouses(houses)

console.log(`Max value robbed: ${max}`)