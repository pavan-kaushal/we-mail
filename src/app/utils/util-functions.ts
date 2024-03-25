
export const setEventClass = (name: string) => {
    let i = 0;
    name = name.trim()
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    while(!name[i].match(/[a-zA-Z]/)){
        i++;
        if(i==name.length-1){
            return 1;
        }
    }
    return `CC_${(alphabets.indexOf(name[i]))%3+1}`
}

export const emailPattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" 