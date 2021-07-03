const frosting = {"capacity": 4, "durability": -2, "flavor": 0, "texture": 0, "calories": 5}
const candy = {"capacity": 0, "durability": 5, "flavor": -1, "texture": 0, "calories": 8}
const butterscotch= { "capacity": -1, "durability": 0, "flavor": 5, "texture": 0, "calories": 6}
const sugar=  {"capacity": 0, "durability": 0, "flavor": -2, "texture": 2, "calories": 1}


function calcValue(frost, cand, but, sug) {
    capacity = frost * frosting["capacity"] + cand * candy["capacity"] + but * butterscotch["capacity"] + sug * sugar["capacity"];
    if(capacity < 0){
        capacity = 0
    }
    durability = frost * frosting["durability"] + cand * candy["durability"] + but * butterscotch["durability"] + sug * sugar["durability"];
    if(durability < 0){
        durability = 0
    }
    flavor = frost * frosting["flavor"] + cand * candy["flavor"] + but * butterscotch["flavor"] + sug * sugar["flavor"];
    if(flavor < 0){
        flavor = 0
    }
    texture = frost * frosting["texture"] + cand * candy["texture"] + but * butterscotch["texture"] + sug * sugar["texture"];
    if(texture < 0){
        texture = 0
    }
    calories = frost * frosting["calories"] + cand * candy["calories"] + but * butterscotch["calories"] + sug * sugar["calories"];
    if(calories < 0){
        calories = 0
    }
    // console.log(capacity, durability, flavor, texture, calories);
    return capacity * durability * flavor * texture// * calories
}


function calorieValue(frost, cand, but, sug) {
    calories = frost * frosting["calories"] + cand * candy["calories"] + but * butterscotch["calories"] + sug * sugar["calories"];
    return calories
}

max = 0;
let value;


for (i=0; i<100; i++){
    for (j=0; j<100; j++){
        for (k=0; k<100; k++){
            for (l=0; l<100; l++){
                if (i+j+k+l == 100){
                    value = calcValue(i,j,k,l)
                    if (calorieValue(i,j,k,l) == 500){
                        if (value > max) {
                            max = value;
                            // console.log(i, j, k, l);
                        }
                    }
                }
            }
        }
    }
}

console.log(max);
